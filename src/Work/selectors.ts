import { RootState } from "../store/rootReducer";

export const getWorkList = (state: RootState) => state.work.list;
