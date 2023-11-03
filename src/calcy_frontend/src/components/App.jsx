import React, { useState } from "react";
import { calcy_backend } from "../../../declarations/calcy_backend";

function App() {
  const [curr, setCurr] = useState("");
  const [prev, setPrev] = useState("");
  const [operand, setOperand] = useState("");

  const numHandler = (e) => {
    if (curr.includes(".") && e.target.value === ".") return;
    curr ? setCurr((prev) => prev + e.target.value) : setCurr(e.target.value);
  };

  const clearHandler = async () => {
    await calcy_backend.clearAll();
    setCurr("");
    setPrev("");
    setOperand("");
  };
  const clearLastHandler = () => {
    if (operand) return;
    let res = curr.slice(0, -1);
    setCurr(res);
  };

  const operandHandler = (e) => {
    setOperand(e.target.value);
    if (curr === "") return;
    if (prev !== "") calculate();
    else {
      setPrev(curr);
      setCurr("");
    }
  };
  const calculate = async () => {
    let cal, val1, val2;
    switch (operand) {
      case "+":
        val1 = Number(prev);
        val2 = Number(curr);
        cal = String(await calcy_backend.add(val1, val2));
        break;

      case "-":
        val1 = Number(prev);
        val2 = Number(curr);
        cal = String(await calcy_backend.subtract(val1, val2));
        break;

      case "*":
        val1 = Number(prev);
        val2 = Number(curr);
        cal = String(await calcy_backend.multiply(val1, val2));
        break;

      case "/":
        val1 = Number(prev);
        val2 = Number(curr);
        cal = String(await calcy_backend.divison(val1, val2));
        break;
      default:
        return;
    }
    console.log("cal", cal);

    setPrev(cal);
    setCurr("");
  };

  let numArray = [];
  for (let i = 0; i <= 9; i++) {
    numArray.push(i);
  }
  numArray.push(".");

  const operandsss = ["+", "-", "*", "/"];

  return (
    <div className="App">
      <h1>calculator</h1>
      <div className="screen">
        <span>{prev}</span>
        <span>{operand}</span>
        <span>{curr}</span>
      </div>
      {operandsss.map((opr, index) => (
        <button
          key={index}
          value={opr}
          className="button opr"
          onClick={operandHandler}
        >
          {opr}
        </button>
      ))}
      {numArray.map((num, index) => (
        <button key={index} value={num} className="button" onClick={numHandler}>
          {num}
        </button>
      ))}
      <input
        type="button"
        value="X"
        className="button btn2"
        onClick={clearLastHandler}
      />
      <input
        type="button"
        value="AC"
        className="button btn"
        onClick={clearHandler}
      />
      <input
        type="button"
        value="="
        className="button button1"
        onClick={calculate}
      />
    </div>
  );
}

export default App;
