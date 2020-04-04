import React from "react";
import TestRenderer from "react-test-renderer";
import "../../extend-expect";
import { MockedComponent } from "./helpers";

beforeEach(jest.clearAllMocks);

test(".toHaveBeenRendered", () => {
  TestRenderer.create(
    <div>
      <MockedComponent />
    </div>
  );

  expect(MockedComponent).toHaveBeenRendered();
});

test(".toHaveBeenRendered throw error", () => {
  TestRenderer.create(<div></div>);

  expect(() => expect(MockedComponent).toHaveBeenRendered()).toThrowError()
});
