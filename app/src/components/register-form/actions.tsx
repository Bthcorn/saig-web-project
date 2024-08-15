import { useNavigate } from "react-router-dom";
import { Config } from "../config";
import axios from "axios";

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

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/home");
      return true;
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    navigate("/");
  }
}
