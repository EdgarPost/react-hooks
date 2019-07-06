import React, { useEffect, useLayoutEffect, useContext } from "react";
import PropTypes from "prop-types";

/**
 * This will use the correct use(Layout)Effect depending on SSR or browser
 * without errors or warnings.
 */
const useIsomorphicEffect = process.browser ? useLayoutEffect : useEffect;

/**
 * This context holds shared (callback) refs and helper functions to create and reset refs.
 *
 * `refs` is a key/value pair which holds the ref name (key)
 * and the ref callback (https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)
 *
 * `createRef` is a function that is exposed in the hook's usage. You can use this to create
 * a ref just as you would use `useRef` but now it is stored in a shared context. You can
 * create as many refs as you like.
 *
 * `removeRef` is a function that removes refs from the `refs` object as soon as the
 * component that created it unmounts (in the `useLayoutEffect` cleanup). This is done
 * automatically under the hookd  and is not exposed in the hook's usage.
 */
export const RefContext = React.createContext({
  refs: null,
  createRef: () => {},
  removeRef: () => {}
});

/**
 * This is the public hook that can be used by other components.
 *
 * To create a (named) ref, simply do this:
 * ```
 *  const { createRef } = useSharedRef();
 *  const ref = createRef('myRef');
 *
 * <Component ref={ref} />
 * ```
 *
 * To use the ref in another component, you can use
 * ```
 *  const { refs } = useSharedRef();
 *  const ref = refs.myRef;
 * ```
 *
 * The ref does not contain a `current` key, it is either the current value of the ref
 * or it is undefined (not set in the `refs` object in the context).
 */
const useSharedRef = () => {
  const { createRef: baseCreateRef, removeRef, ...rest } = useContext(
    RefContext
  );

  /*
   * This `refKey` is used to track if the current component created a ref so we
   * can clean up when the component unmounts.
   * We hijack the original `createRef` function so we can store the `refKey` and then
   * return the original function which actually stores the ref callback in our context.
   */
  let refKey;
  const createRef = name => {
    refKey = name;
    return baseCreateRef(name);
  };

  // Cleanup!
  useIsomorphicEffect(() => () => refKey && removeRef(refKey));

  // Return our hijacked `createRef` and the remaining object.
  return {
    ...rest,
    createRef
  };
};

/**
 * Wrap this Provider somewhere around your app component.
 */
export const RefContextProvider = ({ children }) => {
  // Contains all active ref callbacks.
  const refs = Object.create(null);

  // Sets a ref callback with a key.
  const createRef = name => ref => {
    refs[name] = ref;
    return ref;
  };

  // Remove a ref callback based on the key.
  const removeRef = name => delete refs[name];

  const value = {
    refs,
    createRef,
    removeRef
  };

  return React.createElement(
    RefContext.Provider,
    {
      value
    },
    children
  );
};

RefContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default useSharedRef;
