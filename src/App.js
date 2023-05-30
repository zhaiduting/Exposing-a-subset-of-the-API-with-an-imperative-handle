import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current.style.color = ["green", "red", "blue", "pink"][
        Math.floor(Math.random() * 4)
      ];
      realInputRef.current.focus();
    }
  }));
  const jsx = (
    <input {...props} ref={realInputRef} value="Click it several times!" />
  );
  return jsx;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
