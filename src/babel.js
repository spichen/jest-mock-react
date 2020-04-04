export default function plugin({ types: t }) {
  const isMockComponentCallExpession = (node) => {
    if (!t.isIdentifier(node.callee) && !t.isMemberExpression(node.callee)) {
      return false;
    }

    return node.callee.name === "mockComponents";
  };

  const buildJestMockForComponent = (name, source, importType) => {
    const mockFn = t.memberExpression(
      t.callExpression(
        t.memberExpression(t.identifier("jest"), t.identifier("fn")),
        [t.arrowFunctionExpression([], t.stringLiteral(name))]
      ),
      t.identifier(`mockName("${name}")`)
    );

    const mockExpression =
      importType === "default"
        ? mockFn
        : t.objectExpression([t.objectProperty(t.identifier(name), mockFn)]);

    return t.expressionStatement(
      t.callExpression(
        t.memberExpression(t.identifier("jest"), t.identifier("mock")),
        [t.stringLiteral(source), t.arrowFunctionExpression([], mockExpression)]
      )
    );
  };

  return {
    pre() {
      this.importIdentifiers = new Map();
      this.existingJestMocks = [];
      this.mocks = [];
    },
    post() {
      if (!this.program) {
        return;
      }
      if (this.mocks.length === 0 || this.importIdentifiers.size === 0) {
        return;
      }
      this.mocks.forEach(({ name, path }) => {
        if (!this.existingJestMocks.includes(path)) {
          const importType = this.importIdentifiers.get(path)[0].type;
          this.program.node.body.unshift(
            buildJestMockForComponent(name, path, importType)
          );
        }
      });
    },
    visitor: {
      Program(path) {
        this.program = path;
      },
      ImportDeclaration(path) {
        const specifiers = path.node.specifiers;
        const moduleIdentifiers =
          this.importIdentifiers.get(path.node.source.value) || [];
        for (const s of specifiers) {
          if (t.isImportDefaultSpecifier(s)) {
            moduleIdentifiers.push({
              name: s.local.name,
              type: "default",
            });
          } else if (t.isImportNamespaceSpecifier(s)) {
            moduleIdentifiers.push({
              name: s.local.name,
              type: "namespace",
            });
          } else if (t.isImportSpecifier(s)) {
            if (s.imported.name === "default") {
              moduleIdentifiers.push({ name: s.local.name, type: "default" });
            } else {
              moduleIdentifiers.push({ name: s.local.name, type: "import" });
            }
          }
        }
        if (specifiers.length > 0) {
          this.importIdentifiers.set(path.node.source.value, moduleIdentifiers);
        }
      },
      CallExpression(path) {
        const node = path.node;
        const mockIdentifier = isMockComponentCallExpession(node);
        if (mockIdentifier) {
          const args = node.arguments;
          for (const arg of args) {
            for (const [modulePath, importsFromModule] of this
              .importIdentifiers) {
              if (importsFromModule.find((a) => a.name === arg.name)) {
                this.mocks.push({
                  name: arg.name,
                  path: modulePath,
                });
              }
            }
          }
          path.remove();
        }
      },
    },
  };
}
