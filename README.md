# Jest Mock React

![Travis (.org)](https://img.shields.io/travis/thesalah/jest-mock-react)
![npm](https://img.shields.io/npm/v/jest-mock-react)
![GitHub](https://img.shields.io/github/license/thesalah/jest-mock-react)

Don't like shallow rendering and want to mock specific child components for your component tests? Jest Mock React helps you to easily mock components and assert on the rendered component using jest expect extensions.

## Installation

1. Install the module as one of your project's `devDependencies`:

```
npm install --save-dev jest-mock-react
```

2. Add plugin `jest-mock-react/babel` to your babel configuration. Either in `.babelrc`, `.babelrc.js`, `babel.config.js` or `package.json`

```
  "babel": {
    "plugins": [
      "jest-mock-react/babel"
    ]
  },
```

2. Add `jest-mock-react/extend-expect.js` to your jest configuration. Either in `jest.config.js` or `package.json`

```
  "jest": {
    "setupFilesAfterEnv": [
      "jest-mock-react/extend-expect.js"
    ]
  },
```

## Usage

1. Use `mockComponents` function to mock react components. You do not need to import this function in your test file. You can pass all your components to be mocked as argument.

```
import { render } from '@testing-library/react';
import App from './App';
import InnerComp from './InnerComp';
import { InnerComp2 } from './InnerComp2';

mockComponents(InnerComp, InnerComp2);

test('should render App', () => {
  ...
})
```

2. Use custom matchers described below to assert on the component mocked.

### Custom matchers

 #### 1. toHaveBeenRendered ####
```
import { render } from '@testing-library/react';
import App from './App';
import InnerComp from './InnerComp';
import { InnerComp2 } from './InnerComp2';

mockComponents(InnerComp, InnerComp2);

test('should render App', () => {
  render(<App />)
  expect(InnerComp).toHaveBeenRendered()
})
```

 #### 2. toHaveBeenRenderedTimes ####
```
import { render } from '@testing-library/react';
import App from './App';
import InnerComp from './InnerComp';
import { InnerComp2 } from './InnerComp2';

mockComponents(InnerComp, InnerComp2);

test('should render App', () => {
  render(<App />)
  expect(InnerComp).toHaveBeenRenderedTimes(2)
})
```

 #### 3. toHaveBeenRenderedWithProps ####
```
import { render } from '@testing-library/react';
import App from './App';
import InnerComp from './InnerComp';
import { InnerComp2 } from './InnerComp2';

mockComponents(InnerComp, InnerComp2);

test('should render App', () => {
  render(<App />)
  expect(InnerComp).toHaveBeenRenderedWithProps({
    prop1: 'value1',
    prop2: 'value2',
  })
})
```

 #### 4. toHaveBeenRenderedWithProp ####
```
import { render } from '@testing-library/react';
import App from './App';
import InnerComp from './InnerComp';
import { InnerComp2 } from './InnerComp2';

mockComponents(InnerComp, InnerComp2);

test('should render App', () => {
  render(<App />)
  expect(InnerComp).toHaveBeenRenderedWithProps('prop1')
  expect(InnerComp2).toHaveBeenRenderedWithProps('prop1', 'value1')
})
```


## LICENSE

MIT
