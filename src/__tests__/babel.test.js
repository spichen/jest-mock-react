import plugin from "../babel";
import { transform } from "@babel/core";

it("Creates mock single react component", () => {
  const source = `
  import React from 'react';
  import { render } from '@testing-library/react';
  import App from './App';
  import InnerComp from './InnerComp';
  
  mockComponents(InnerComp)
  
  test('Mock inner component', () => {
    const { getByText, debug } = render(App);
    debug();
  });
  
  `;

  expect(transform(source, { presets: ["react-app"], plugins: [plugin], filename: "/test.jsx" }).code).toMatchSnapshot();
});

it("Creates mock for multiple react component", () => {
    const source = `
    import React from 'react';
    import { render } from '@testing-library/react';
    import App from './App';
    import InnerComp from './InnerComp';
    import InnerComp2 from './InnerComp2';
    
    mockComponents(InnerComp, InnerComp2)
    
    test('Mock inner components', () => {
      const { getByText, debug } = render(App);
      debug();
    });
    
    `;

    expect(transform(source, { presets: ["react-app"], plugins: [plugin], filename: "/test.jsx" }).code).toMatchSnapshot();
});

it("Creates mock for react component named imports", () => {
    const source = `
    import React from 'react';
    import { render } from '@testing-library/react';
    import App from './App';
    import { InnerComp } from './InnerComp';
    
    mockComponents(InnerComp)
    
    test('Mock inner components', () => {
      const { getByText, debug } = render(App);
      debug();
    });
    
    `;

    expect(transform(source, { presets: ["react-app"], plugins: [plugin], filename: "/test.jsx" }).code).toMatchSnapshot();
});