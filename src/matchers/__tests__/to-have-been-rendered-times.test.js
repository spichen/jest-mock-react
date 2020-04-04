import React from "react";
import TestRenderer from "react-test-renderer";
import "../../extend-expect";
import { MockedComponent } from "./helpers";

beforeEach(jest.clearAllMocks);

test(".toHaveBeenRenderedTimes", () => {
  TestRenderer.create(
    <div>
      <MockedComponent />
      <MockedComponent />
    </div>
  );

  expect(MockedComponent).toHaveBeenRenderedTimes(2);
});

test(".toHaveBeenRenderedTimes throw error on assertion fail", () => {
  TestRenderer.create(
    <div>
      <MockedComponent />
      <MockedComponent />
    </div>
  );

  expect(() =>
    expect(MockedComponent).toHaveBeenRenderedTimes(8)
  ).toThrowError();
});

test(".toHaveBeenRenderedTimes throw error on invalid expected value", () => {
  TestRenderer.create(
    <div>
      <MockedComponent />
      <MockedComponent />
    </div>
  );

  expect(() =>
    expect(MockedComponent).toHaveBeenRenderedTimes("invalid-input")
  ).toThrowError();
});
