//initialise the AppState
export interface AppState {
    data: any[];
    loading: boolean;
    error: any;
  }
  //first call with empty data for default state
export const initialState: AppState = {
    data: [],
    loading: false,
    error: null
  };
  