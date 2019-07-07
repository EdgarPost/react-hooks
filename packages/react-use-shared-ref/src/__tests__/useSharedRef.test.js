import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import useSharedRef, { RefContextProvider } from "../useSharedRef";

const createWrapper = () => props =>
  React.createElement(RefContextProvider, props);

describe("useSharedRef", () => {
  it("should be defined", () => {
    expect(useSharedRef).toBeDefined();
  });

  it("should start with an empty ref list", () => {
    const { result } = renderHook(() => useSharedRef(), {
      wrapper: createWrapper()
    });

    expect(Object.values(result.current.refs)).toHaveLength(0);
  });

  it("should create refs", () => {
    const { result } = renderHook(() => useSharedRef(), {
      wrapper: createWrapper()
    });

    const refCallback1 = () => {};
    const refCallback2 = () => {};
    const refCallback3 = () => {};
    act(() => {
      result.current.createRef("myRef1")(refCallback1);
    });
    act(() => {
      result.current.createRef("myRef2")(refCallback2);
    });
    act(() => {
      result.current.createRef("myRef3")(refCallback3);
    });

    expect(result.current.refs).toHaveProperty("myRef1", refCallback1);
    expect(result.current.refs).toHaveProperty("myRef2", refCallback2);
    expect(result.current.refs).toHaveProperty("myRef3", refCallback3);
  });

  it("should remove a ref", () => {
    const { result, unmount } = renderHook(() => useSharedRef(), {
      wrapper: createWrapper()
    });

    act(() => {
      result.current.createRef("myRef")(() => {});
    });

    expect(result.current.refs).toHaveProperty("myRef");
    act(() => {
      unmount();
    });
    expect(result.current.refs).not.toHaveProperty("myRef");
  });
});
