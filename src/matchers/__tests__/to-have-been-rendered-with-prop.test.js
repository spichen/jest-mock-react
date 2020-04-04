import React from "react";
import TestRenderer from "react-test-renderer";
import "../../extend-expect";
import { MockedComponent } from "./helpers";

beforeEach(jest.clearAllMocks);

test(".toHaveBeenRenderedWithProp with prop key", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1='value1' />
    </div>
  );

  expect(MockedComponent).toHaveBeenRenderedWithProp('prop1');
});

test(".toHaveBeenRenderedWithProp with value", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1='value1' />
    </div>
  );

  expect(MockedComponent).toHaveBeenRenderedWithProp('prop1', 'value1');
});

test(".toHaveBeenRenderedWithProp fails if prop not found", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1='value1'/>
    </div>
  );

  expect(() =>
    expect(MockedComponent).toHaveBeenRenderedWithProp('prop2')
  ).toThrowError();
});

test(".toHaveBeenRenderedWithProp fails if prop value mismatched", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1='value1'/>
    </div>
  );

  expect(() =>
    expect(MockedComponent).toHaveBeenRenderedWithProp('prop1', 'value2')
  ).toThrowError();
});