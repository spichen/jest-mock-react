import { matcherHint, printExpected, printReceived, stringify } from "jest-matcher-utils";
import { validateMock } from "./utils";

export const toHaveBeenRenderedWithProp = (
  received,
  expectedPropKey,
  expectedPropValue
) => {
  validateMock(received, toHaveBeenRenderedWithProp);

  const receivedPropKey = received.mock.calls.find(
    (call) => !!call[0][expectedPropKey]
  );

  if(!receivedPropKey) {
    return {
      message: () =>
        [
          matcherHint(
            toHaveBeenRenderedWithProp.name,
            received.getMockName(),
            `${stringify(expectedPropKey)}, ${stringify(expectedPropValue)}`
          ),
          "",
          `Expected prop ${printExpected(expectedPropKey)} not found.`,
        ].join("\n"),
      pass: false,
    };
  }

  if(expectedPropValue) {
    const receivedPropValue = receivedPropKey[0][expectedPropKey]
    return {
      message: () =>
        [
          matcherHint(
            toHaveBeenRenderedWithProp.name,
            received.getMockName(),
            `${stringify(expectedPropKey)}, ${stringify(expectedPropValue)}`
          ),
          "",
          `Expected prop ${printExpected(expectedPropKey)} to have value: ${printExpected(expectedPropValue)}`,
          `Received value: ${printReceived(receivedPropValue)}`,
        ].join("\n"),
      pass: receivedPropValue === expectedPropValue,
    };
  } else {
    return {
      pass: true
    }
  }
};
