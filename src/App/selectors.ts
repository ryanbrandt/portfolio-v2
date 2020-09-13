import { RootState } from "../store/rootReducer";

export const getContentLoading = (state: RootState) => state.app.contentLoading;
