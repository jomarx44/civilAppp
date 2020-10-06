import { FINGERPRINT_COMPATIBLE, FINGERPRINT_ENROLLED } from "../actions";

const initState = {
  fingerprint: {
    isCompatible: null,
    isEnrolled: null,
  },
};

export const application = (state = initState, action) => {
  switch (action.type) {
    case FINGERPRINT_COMPATIBLE:
      return {
        ...state,
        isCompatible: action.payload.isCompatible,
      };
    case FINGERPRINT_ENROLLED:
      return {
        ...state,
        isEnrolled: action.payload.isEnrolled,
      };
    default:
      return state;
  }
};

export default application;
