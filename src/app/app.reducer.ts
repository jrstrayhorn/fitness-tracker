import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  ui: fromUi.State;
}

export const reducers: ActionReducerMap<State>;
