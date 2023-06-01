import { createReducer, on, Action } from '@ngrx/store';
// import * as ExploreActions from './explore.actions';

export interface State {

}

export const initialState: State = {

}

const _exploreReducer = createReducer(
  initialState,

  // on(
  //   ExploreActions.getSchoolSuccess,
  //   (state, action) => ({
  //     ...state,
  //     schoolName: action.name,
  //     schoolAddress: action.schoolAddress
  //   })
  // ),
);

export function exploreReducer(state: State, action: Action) {
  return _exploreReducer(state, action);
}
