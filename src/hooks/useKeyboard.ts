/* eslint-disable react-hooks/refs */

import { useRef } from "react";
import { useEvent } from "react-use"; // or just use native if you prefer

const useKeyboard = () => {
  const keysRef = useRef(new Set<string>());

  useEvent("keydown", (e: KeyboardEvent) => {
    keysRef.current.add(e.key.toLowerCase());
  });

  useEvent("keyup", (e: KeyboardEvent) => {
    keysRef.current.delete(e.key.toLowerCase());
  });

  return keysRef.current;
};

export default useKeyboard;
