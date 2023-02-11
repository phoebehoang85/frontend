const initialPoolState = {
  newPool: "none",
};

const poolsReducer = (state = initialPoolState, action) => {
  switch (action.type) {
    case "newPool":
      return {
        newPool: state.newPool
      };

    default: // need this for default case
      return state
  }
};

export default poolsReducer;
