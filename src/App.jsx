import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  // useState hooks
  // first we increase and decrease the length of the password, that's why we use useState and set the length of 8 initially
  const [length, setLength] = useState(8);
  // if you want to add number in your passwords to more secure, that is possible using checkbox for flexibility, initially we set the false
  const [numberAllowed, setNumberAllowed] = useState(false);
  // same like number if we want to add some special char we are doing this using checkbox, initially that is false, if we want to true you can do that.
  const [charAllowed, setCharAllowed] = useState(false);
  // we can create this useState to set the password in input box, initially it's empty, we generate the password using reloading functionality
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallBack hook
  // here we generate password using useCallback, using useCallback we optimize the function or components
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    // console.log(pass);
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // copyPasswordToClipboard Method
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // if we want to perform side effect in data like in this case we have to perform length of the pass, number allowed or not, character allowed or not, there are different effects we are done here so we use useEffect hook.
  // useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    // main container
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prevVal) => !prevVal);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prevVal) => !prevVal);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
