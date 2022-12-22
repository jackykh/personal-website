import { useRef, useCallback, useEffect } from "react";

const useEnterToFetch = (callbackFn: () => void) => {
  const isKeyHandled = useRef<boolean>(false);

  const enterKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Enter") return;
      callbackFn();
      isKeyHandled.current = true;
    },
    [callbackFn]
  );

  const enterKeyUpHandler = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    isKeyHandled.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", enterKeyDownHandler);
    document.addEventListener("keyup", enterKeyUpHandler);

    return () => {
      document.removeEventListener("keydown", enterKeyDownHandler);
      document.removeEventListener("keyup", enterKeyUpHandler);
    };
  }, [enterKeyUpHandler, enterKeyDownHandler]);
};

export default useEnterToFetch;
