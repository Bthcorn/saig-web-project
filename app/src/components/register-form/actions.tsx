import { useNavigate } from "react-router-dom";
import { Config } from "../config";
import axios from "axios";
import { handleResponse } from "../toast";

export async function Logout(navigate: ReturnType<typeof useNavigate>) {
  localStorage.removeItem("token");
  navigate("/");
}

export async function Register(
  user: any,
  navigate: ReturnType<typeof useNavigate>,
) {
  try {
    const res = await axios.post(Config.apiPath + "/user/create", user);

    if (res.data.token && res.status === 200) {
      localStorage.setItem("token", res.data.token);
      navigate("/home");
      return true;
    } else {
      handleResponse(res.statusText, res.data.message, "destructive");
    }
  } catch (error) {
    console.log(error);
    // navigate("/");
  }
}
