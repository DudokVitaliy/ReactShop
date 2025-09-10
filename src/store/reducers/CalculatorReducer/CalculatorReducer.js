const initialState = {
  displayValue: "0",
  prevValue: null,
  operator: null,
  waitingForNewValue: false
};

const CalculatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_DIGIT":
      if (state.waitingForNewValue) {
        return { ...state, displayValue: action.payload, waitingForNewValue: false };
      }
      return {
        ...state,
        displayValue:
          state.displayValue === "0" ? action.payload : state.displayValue + action.payload,
      };

    case "INPUT_DOT":
      if (!state.displayValue.includes(".")) {
        return { ...state, displayValue: state.displayValue + "." };
      }
      return state;

    case "CLEAR":
      return initialState;

    case "TOGGLE_SIGN":
      return {
        ...state,
        displayValue:
          state.displayValue.charAt(0) === "-"
            ? state.displayValue.slice(1)
            : "-" + state.displayValue,
      };

    case "SET_OPERATOR":
      if (state.operator && !state.waitingForNewValue) {
        let result = eval(`${state.prevValue} ${state.operator} ${state.displayValue}`);
        return {
          ...state,
          displayValue: String(result),
          prevValue: parseFloat(result),
          operator: action.payload,
          waitingForNewValue: true,
        };
      }
      return {
        ...state,
        prevValue: parseFloat(state.displayValue),
        operator: action.payload,
        waitingForNewValue: true,
      };

    case "CALCULATE":
      if (state.operator && state.prevValue !== null) {
        let result;
        const current = parseFloat(state.displayValue);
        switch (state.operator) {
          case "+":
            result = state.prevValue + current;
            break;
          case "-":
            result = state.prevValue - current;
            break;
          case "*":
            result = state.prevValue * current;
            break;
          case "/":
            result = current === 0 ? "Error" : state.prevValue / current;
            break;
          default:
            return state;
        }
        return {
          ...state,
          displayValue: String(result),
          prevValue: null,
          operator: null,
        };
      }
      return state;

    case "SQUARE":
      return { ...state, displayValue: String(Math.pow(parseFloat(state.displayValue), 2)) };

    case "SQRT":
      return { ...state, displayValue: String(Math.sqrt(parseFloat(state.displayValue))) };

    case "INVERSE":
      const val = parseFloat(state.displayValue);
      return { ...state, displayValue: val === 0 ? "Error" : String(1 / val) };

    default:
      return state;
  }
};

export default CalculatorReducer
