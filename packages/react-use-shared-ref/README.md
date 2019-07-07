# useSharedRef
![Scrutinizer build (GitHub/Bitbucket)](https://img.shields.io/scrutinizer/build/g/edgarpost/react-hooks.svg)
![Scrutinizer coverage (GitHub/BitBucket)](https://img.shields.io/scrutinizer/coverage/g/edgarpost/react-hooks.svg)
![Scrutinizer code quality (GitHub/Bitbucket)](https://img.shields.io/scrutinizer/quality/g/edgarpost/react-hooks.svg)

## Introduction

With this hook you can use `refs` across components without prop drilling. They're stored in a React context instance.

## Usage

First wrap your `<App />` inside the `RefContextProvider`:

```jsx
import { RefContextProvider } from 'react-use-shared-ref';

ReactDOM.render(
  <RefContextProvider>
    <App />
  </RefContextProvider>,
  document.getElementById('root')
);

```

To create a (named) ref, you can use the `createRef` function that is exposed from the hook. You can then pass this function as a ref to any component.

```jsx
import useSharedRef from 'react-use-shared-ref';

const Component = () => {
  const { createRef } = useSharedRef();
  const ref = createRef('myRef');

  return <ChildComponent ref={ref} />;
}
```

To use the ref in another component, you can use the `refs` list.

```jsx
import useSharedRef from 'react-use-shared-ref';

const SomeOtherComponent = () => {
  const { refs } = useSharedRef();
  const { myRef } = refs; // Ref to `ChildComponent`
}
```

The ref does not have a `current` key as opposed to regular `refs`, it is either the current value of the ref
or it is `undefined` (not set in the `refs` object in the context).