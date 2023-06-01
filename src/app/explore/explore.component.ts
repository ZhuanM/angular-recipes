import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../shared/models/app-state.interface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent extends BaseComponent {
  constructor(private store: Store<AppState>) { 
    super();
  }
}
