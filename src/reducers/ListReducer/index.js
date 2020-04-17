import { combineReducers } from "redux";

// Reducers
import barangaysReducer from "./barangaysReducer";
import homeOwnershipsReducer from "./homeOwnershipsReducer";
import civilStatusesReducer from "./civilStatusesReducer";
import idTypesReducer from "./idTypesReducer";
import jobTitlesReducer from "./jobTitlesReducer";
import nationalitiesReducer from "./nationalitiesReducer";
import fundSourcesReducer from "./fundSourcesReducer";

// Types
import { FETCH_LISTS, FETCH_LISTS_ERROR, FETCH_LISTS_SUCCESS } from "../../actions/types";

const initialState = {
  isFetching: false
}

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LISTS:
      return {
        isFetching: true
      }
    
    case FETCH_LISTS_ERROR:
      return {
        isFetching: false
      }
    
    case FETCH_LISTS_SUCCESS:
      return {
        isFetching: false
      }
  
    default:
      return state;
  }
}


export default combineReducers({
  meta: ListReducer,
  barangays: barangaysReducer,
  homeOwnerships: homeOwnershipsReducer,
  civilStatuses: civilStatusesReducer,
  idTypes: idTypesReducer,
  jobTitles: jobTitlesReducer,
  nationalities: nationalitiesReducer,
  fundSources: fundSourcesReducer,
})