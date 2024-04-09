import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CompanyState = {
  companyItems: BookingItem[] ;
};

const initialState: CompanyState = {
  companyItems: [], 
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const existingBookingIndex = state.companyItems.findIndex(
        (booking) => booking._id === action.payload._id
      );

      if (existingBookingIndex !== -1) {
        state.companyItems[existingBookingIndex] = action.payload;
      } else {
        state.companyItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      const remainingItems = state.companyItems.filter(
        (obj) => obj._id !== action.payload
      );
      state.companyItems = remainingItems;
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
