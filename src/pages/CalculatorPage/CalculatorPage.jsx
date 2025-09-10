import { useSelector, useDispatch } from "react-redux";

function CalculatorPage() {
  const display = useSelector((state) => state.calculator.displayValue);
  const dispatch = useDispatch();

  const btnStyle = {
    padding: "18px",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    background: "#ffffffff",
    cursor: "pointer",
    transition: "0.2s",
  };

  const opBtnStyle = {
    ...btnStyle,
    background: "#4CAF50",
    color: "white",
    fontWeight: "bold",
  };

  const equalBtnStyle = {
    ...btnStyle,
    gridColumn: "span 4",
    background: "#2196F3",
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
  };

  return (
    <div
      style={{
        width: "300px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "20px",
        background: " #786effff",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "10px", color: "#333" }}>Калькулятор</h2>

      <div
        style={{
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "15px",
          fontSize: "28px",
          textAlign: "right",
          background: "#fff",
          boxShadow: "inset 3px 3px 6px #b5b5b5, inset -3px -3px 6px #fff",
          minHeight: "50px",
          overflowX: "auto",
        }}
      >
        {display}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "CLEAR" })}>C</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "TOGGLE_SIGN" })}>+/-</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "INVERSE" })}>1/x</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "SET_OPERATOR", payload: "/" })}>÷</button>

        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "7" })}>7</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "8" })}>8</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "9" })}>9</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "SET_OPERATOR", payload: "*" })}>×</button>

        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "4" })}>4</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "5" })}>5</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "6" })}>6</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "SET_OPERATOR", payload: "-" })}>−</button>

        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "1" })}>1</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "2" })}>2</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "3" })}>3</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "SET_OPERATOR", payload: "+" })}>+</button>

        <button style={opBtnStyle} onClick={() => dispatch({ type: "SQUARE" })}>x²</button>
        <button style={opBtnStyle} onClick={() => dispatch({ type: "SQRT" })}>√</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DIGIT", payload: "0" })}>0</button>
        <button style={btnStyle} onClick={() => dispatch({ type: "INPUT_DOT" })}>.</button>

        <button style={equalBtnStyle} onClick={() => dispatch({ type: "CALCULATE" })}>=</button>
      </div>
    </div>
  );
}

export default CalculatorPage;
