import { matcherHint } from "jest-matcher-utils";

class InvalidMockError extends Error {
    constructor(mockFn, matcherFn, expectedValue) {
        super()
        
        this.message = [
            matcherHint(matcherFn.name, mockFn.name, expectedValue),
            '',
            'Cannot spy on actual component. Use mocked component instead.'
        ].join('\n');
    }
}

const validateMock = (received, matcherName, expectedValue = '') => {
    if(!received._isMockFunction) {
        throw new InvalidMockError(received, matcherName, expectedValue);
    }
}

export { validateMock };
