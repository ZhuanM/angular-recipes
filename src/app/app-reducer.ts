import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './shared/models/app-state.interface';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromHeader from './header/store/header.reducer';
import * as fromLoader from './shared/loader/store/loader.reducer';
import * as fromHome from './home/store/home.reducer';
import * as fromExplore from './explore/store/explore.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  header: fromHeader.headerReducer,
  loader: fromLoader.loaderReducer,
  home: fromHome.homeReducer,
  explore: fromExplore.exploreReducer,
};
