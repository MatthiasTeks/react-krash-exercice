import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  isWookiee: boolean;
}

const initialState: LanguageState = {
  isWookiee: false,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.isWookiee = !state.isWookiee;
    },
    setLanguage: (state, action: PayloadAction<boolean>) => {
      state.isWookiee = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;

export default languageSlice.reducer;