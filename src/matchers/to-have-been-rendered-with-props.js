import { matcherHint, printReceived, printExpected, stringify, diff } from "jest-matcher-utils";
import { validateMock } from "./utils";
import { isEqual } from "lodash";

export const toHaveBeenRenderedWithProps = (received, expectedProps) => {
  validateMock(received, toHaveBeenRenderedWithProps);

  const receivedProps = received.mock.calls[0][0];
  const pass = isEqual(receivedProps, expectedProps);

  return {
    message: () =>
      [
        matcherHint(toHaveBeenRenderedWithProps.name, received.getMockName(), stringify(expectedProps)),
        "",
        `Expected Props: ${printExpected(expectedProps)}`,
        `Received Props: ${printReceived(receivedProps)}`,
        diff(expectedProps, receivedProps)
      ].join("\n"),
    pass,
  };
};
