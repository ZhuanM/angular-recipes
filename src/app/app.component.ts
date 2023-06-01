import { Component, HostListener, ViewChild } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, Subscription, filter, first, takeUntil } from 'rxjs';
import { BaseComponent } from './shared/base.component';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { User } from './shared/models/user.interface';
import * as HeaderSelectors from './header/store/header.selectors';
import * as AuthSelectors from './auth/store/auth.selectors';
import * as HeaderActions from './header/store/header.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  private subscription = new Subscription();

  // SIDENAV
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  readonly sidenavOpened$: Observable<boolean> = this.store.pipe(select(HeaderSelectors.sidenavOpened), takeUntil(this.destroyed$));
  // readonly user$: Observable<User> = this.store.pipe(select(AuthSelectors.user), takeUntil(this.destroyed$));

  public sideNavItems: Array<any>;

  // URLs
  private homeURL: boolean = false;
  private loginURL: boolean = false;
  private registerURL: boolean = false;
  private exploreURL: boolean = false;
  private favoritesURL: boolean = false;

  private role: string | null;

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    // Browser back button pressed
    this.updateSidenavItems();
  }
  constructor(
    private observer: BreakpointObserver,
    private store: Store,
    private router: Router,
    private location: Location,
    private actionsSubject$: ActionsSubject,
  ) {
    super();

    this.updateSidenavItems();

    // this.user$.pipe(takeUntil(this.destroyed$)).subscribe(user => {
    //   this.role = localStorage.getItem('role');
    //   this.updateSidenavItems();
    // });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Auth Component] Logout Success'))
    .subscribe(() => {
      this.role = localStorage.getItem('role');
      this.updateSidenavItems();
    }));
  }

  // THIS FUNCTION EXISTS BECAUSE this.location.path() doesn't return correct url when logging in and doesn't update accordingly the header and sidenav
  public toHome() {
    if (this.role == null) {
      this.homeURL = true;
      this.loginURL = false;
      this.registerURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "login",
          text: "Login",
          clicked: this.loginURL
        },
        {
          icon: "soup_kitchen",
          text: "Register",
          clicked: this.registerURL
        },
      ];
    } else if (this.role == "PATIENT") {
      this.homeURL = true;
      this.exploreURL = false;
      this.favoritesURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "soup_kitchen",
          text: "Explore",
          clicked: this.exploreURL,
        },
        {
          icon: "favorite",
          text: "Favorites",
          clicked: this.favoritesURL,
        }
      ];
    }
  }

  public updateSidenavItems() {
    if (this.role == null) {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.loginURL = false;
        this.registerURL = false;
      } else if (this.location.path() == "/login") {
        this.loginURL = true;
        this.homeURL = false;
        this.registerURL = false;
      } else if (this.location.path() == "/register") {
        this.registerURL = true;
        this.homeURL = false;
        this.loginURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "login",
          text: "Login",
          clicked: this.loginURL
        },
        {
          icon: "soup_kitchen",
          text: "Register",
          clicked: this.registerURL
        },
      ];
    } else if (this.role == "PATIENT") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.exploreURL = false;
        this.favoritesURL = false;
      } else if (this.location.path() == "/explore") {
        this.exploreURL = true;
        this.homeURL = false;
        this.favoritesURL = false;
      } else if (this.location.path() == "/favorites") {
        this.favoritesURL = true;
        this.homeURL = false;
        this.exploreURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "soup_kitchen",
          text: "Explore",
          clicked: this.exploreURL,
        },
        {
          icon: "favorite",
          text: "Favorites",
          clicked: this.favoritesURL,
        }
      ];
    }
  }

  public itemClicked(index: number) {
    for (let item of this.sideNavItems) {
      if (item.clicked) {
        item.clicked = false
      }
    }

    this.sideNavItems[index].clicked = true;

    if (this.role == null) {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Login":
          if (this.location.path() == "/login") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['login']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Register":
          if (this.location.path() == "/register") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['register']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "PATIENT") {
      switch (this.sideNavItems[index].text) {
        case "Home":
          if (this.location.path() == "/home") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['home']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Explore":
          if (this.location.path() == "/explore") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['explore']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Favorites":
          if (this.location.path() == "/favorites") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['favorites']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    }
  }

  ngAfterViewInit() {
    this.sidenavObserve();
  }

  // SIDENAV FUNCTIONS
  private openSidenav() {
    this.store.dispatch(HeaderActions.showSidenav());
  }

  private closeSidenav() {
    this.store.dispatch(HeaderActions.hideSidenav());
  }

  public toggleSidenav() {
    this.sidenavOpened$.pipe(first()).subscribe(open => {
      if (open) {
        return this.closeSidenav();
      }

      this.openSidenav();
    });
  }

  private sidenavObserve() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (this.sidenav) {
        // THE TIMEOUT FIXES "ExpressionChangedAfterItHasBeenCheckedError"
        setTimeout(() => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.closeSidenav();
          } else {
            this.sidenav.mode = 'side';
            this.openSidenav();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
