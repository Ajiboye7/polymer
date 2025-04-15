import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: { value: 113000.00 },
  reducers: {
    deductAmount: (state, action) => {
      state.value -= action.payload;
    },
    resetBalance: (state) => {
      state.value = 113000.00;
    },
  },
});

export const { deductAmount, resetBalance } = balanceSlice.actions;
export default balanceSlice.reducer;