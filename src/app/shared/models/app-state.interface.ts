import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromLoader from '../../shared/loader/store/loader.reducer';
import * as fromHeader from '../../header/store/header.reducer';
import * as fromHome from '../../home/store/home.reducer';
import * as fromExplore from '../../explore/store/explore.reducer';
import * as fromFavorites from '../../favorites/store/favorites.reducer';

export interface AppState {
  auth: fromAuth.State,
  loader: fromLoader.State
  header: fromHeader.State,
  home: fromHome.State,
  explore: fromExplore.State,
  favorites: fromFavorites.State,
};