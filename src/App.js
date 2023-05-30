import { forwardRef, useRef, useImperativeHandle } from "react";

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  
  // 将 <input> 节点赋给 realInputRef.current
  const jsx = (
    <input {...props} ref={realInputRef} value="Click it several times!" />
  );
  
  // 执行函数 useImperativeHandle(ref, callback) 
  // 执行的结果：将 callback() 返回的自定义对象 {focus: function focus(){...}} 赋给了 ref.current
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current.style.color = ["green", "red", "blue", "pink"][
        Math.floor(Math.random() * 4)
      ];
      realInputRef.current.focus();
    }
  }));
  
  // 当父组件调用 ref.current.focus() 方法时，
  // 实际调用的是自定义对象 {focus(){..}} 的 focus() 方法
  // 在 focus(){..} 方法内部对 realInputRef.current 进行了相关操作 
  // 操作 realInputRef.current 其实就是操作 DOM 节点 <input>
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
