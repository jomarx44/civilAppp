import { CREATE_USER } from "../actions";

const initState = {
  createdList: {},
  createdListByIds: [],
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case CREATE_USER:
      console.log(action.payload.user.id)
      return {
        ...state,
        createdList: {
          ...state.createdList,
          [action.payload.user.id]: action.payload.user,
        },
        createdListByIds: [...state.createdListByIds, action.payload.user.id],
      };
    default:
      return state;
  }
};

export default user;
