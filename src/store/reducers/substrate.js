
const initialState = {
  selectedAccount: "",
  extensionName: "",
  api: null,
};

const substrateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "extensionName":
      return {
        extensionName: state.extensionName
      };
    case "setExtensionName":
      return {
        ...state,
        extensionName: action.payload
      };
    case "selectedAccount":
      return {
        selectedAccount: state.selectedAccount
      };
    case "setSelectedAccount":
      return {
        ...state,
        selectedAccount: action.payload
      };
    case "setAPI":
      return {
        ...state,
        api: action.payload
      };
    case "API":
      return {
        api: state.api
      };
    default: // need this for default case
      return state
  }
};


export default substrateReducer;
