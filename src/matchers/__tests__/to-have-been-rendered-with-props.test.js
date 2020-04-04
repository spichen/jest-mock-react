import React from "react";
import TestRenderer from "react-test-renderer";
import "../../extend-expect";
import { MockedComponent } from "./helpers";

beforeEach(jest.clearAllMocks);

test(".toHaveBeenRenderedWithProps", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1="value1" prop2="value2" />
    </div>
  );

  expect(MockedComponent).toHaveBeenRenderedWithProps({
    prop1: "value1",
    prop2: "value2",
  });
});

test(".toHaveBeenRenderedWithProps fails on mismatch props", () => {
  TestRenderer.create(
    <div>
      <MockedComponent prop1="value1" prop2="value2" />
    </div>
  );

  expect(() =>
    expect(MockedComponent).toHaveBeenRenderedWithProps({
      prop1: "value1",
      prop3: "value3",
    })
  ).toThrowError();
});
