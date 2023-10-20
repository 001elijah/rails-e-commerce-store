import { useCallback, useEffect } from "react";
import { KEY_EVENT_TYPE, KEY_NAME_ESC } from "./constants";

export function useEscapeKey(handleCloseCallback) {
  const handleEscKey = useCallback(
    (e) => {
      if (e.key === KEY_NAME_ESC) {
        handleCloseCallback();
      }
    },
    [handleCloseCallback],
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}
