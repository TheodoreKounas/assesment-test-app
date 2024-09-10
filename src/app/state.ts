
export interface AppState {
    data: any[];
    loading: boolean;
    error: any;
  }
  
export const initialState: AppState = {
    data: [],
    loading: false,
    error: null
  };
  