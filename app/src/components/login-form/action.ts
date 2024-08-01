import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Config } from "../config";

export async function Login(user: any, navigate: ReturnType<typeof useNavigate>) {
  try {
    const res = await axios.post(Config.apiPath + '/user/signin', user)
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      if (res.data.user.role === 'ADMIN') {
        navigate('/dashboard')
      } else if (res.data.user.role === 'GUEST') {
      navigate('/home')
      } else {
        navigate('/signin')
      }
    } else {
      throw new Error('Invalid login')
    }
    
  } catch (error) {
    console.log(error);
  }
}