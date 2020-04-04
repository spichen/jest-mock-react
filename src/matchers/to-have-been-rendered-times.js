import { matcherHint, printReceived, printExpected, ensureExpectedIsNumber } from "jest-matcher-utils";
import { validateMock } from "./utils";

export const toHaveBeenRenderedTimes = (received, expectedTimes) => {
  validateMock(received, toHaveBeenRenderedTimes);
  ensureExpectedIsNumber(expectedTimes, toHaveBeenRenderedTimes.name)

  const receivedTimes = received.mock.calls.length;
  const pass = receivedTimes === expectedTimes;

  return {
    message: () => {
      return [
        matcherHint(
          toHaveBeenRenderedTimes.name,
          received.getMockName(),
          expectedTimes
        ),
        "",
        `Expected component to have been rendered ${printExpected(
          expectedTimes
        )} time(s), but rendered ${printReceived(receivedTimes)} time(s).`,
      ].join("\n");
    },
    pass,
  };
};
