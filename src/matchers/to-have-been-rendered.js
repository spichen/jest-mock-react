import { matcherHint } from "jest-matcher-utils";
import { validateMock } from "./utils";

export const toHaveBeenRendered = (received) => {
  validateMock(received, toHaveBeenRendered);

  const pass = received.mock.calls.length > 0;

  return {
    message: () => {
      return [
        matcherHint(toHaveBeenRendered.name, received.getMockName(), ""),
        "",
        `Expected component to have been rendered, but not found`,
      ].join("\n");
    },
    pass,
  };
};
