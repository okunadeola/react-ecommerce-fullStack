import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import {
  addCustomerSuccess,
  updateCustomerSuccess,
  deleteCustomerSuccess,
  getCustomerSuccess,
  callStart,
  callFailure
} from './customersRedux'

// auth
export const login = async (dispatch, user, history) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    history.push('/')
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const loggedOut = async (dispatch) => {
  await dispatch(logout())
}




// product calls
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`, product)
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};




// customer calls
export const getCustomers = async (dispatch) => {
  dispatch(callStart());
  try {
    const res = await userRequest.get("/user");
    dispatch(getCustomerSuccess(res.data));
  } catch (err) {
    dispatch(callFailure());
  }
};

export const deletecustomer = async (id, dispatch) => {
  dispatch(callStart());
  try {
    const res = await userRequest.delete(`/user/${id}`);
    dispatch(deleteCustomerSuccess(id));
  } catch (err) {
    dispatch(callFailure());
  }
};

export const updateCustomer = async (id, customer, dispatch) => {
  dispatch(callStart());
  try {
    const res = await userRequest.put(`/user/${id}`, customer)
    dispatch(updateCustomerSuccess({ id, customer }));
  } catch (err) {
    dispatch(callFailure());
  }
};
export const addCustomer = async (customer, dispatch) => {
  dispatch(callStart());
  try {
    const res = await userRequest.post(`/user`, customer);
    dispatch(addCustomerSuccess(res.data));
  } catch (err) {
    dispatch(callFailure());
  }
};