import { createSlice } from "@reduxjs/toolkit";

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    callStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers = action.payload;
    },
    callFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.splice(
        state.customers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    //UPDATE
    updateCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers[
        state.customers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.customer;
    },
    //ADD
    addCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.customers.push(action.payload);
    }
  },
});

export const {
  addCustomerSuccess,
  updateCustomerSuccess,
  deleteCustomerSuccess,
  getCustomerSuccess,
  callStart,
  callFailure
} = customerSlice.actions;

export default customerSlice.reducer;