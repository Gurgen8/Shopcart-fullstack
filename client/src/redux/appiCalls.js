import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicUrl } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  console.log(user)
  try {
    const res = await publicUrl.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};