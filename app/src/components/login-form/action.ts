import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Config } from "../config";
import { handleResponse } from "../toast";
import { decodeJwt } from "jose";

export async function Login(user: any, navigate: ReturnType<typeof useNavigate>) {
  try {
    const res = await axios.post(Config.apiPath + '/user/signin', user)

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      if (res.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true })
        handleResponse('Welcome', 'Welcome Admin: ' + res.data.user.name, "default")
      } else if (res.data.user.role === 'GUEST') {
        navigate('/home', { replace: true })
        handleResponse('Welcome', 'Welcome Guest: ' + res.data.user.name, "default")
      } else {
        navigate('/')
      }
    } else {
      navigate('/')
    }
  } catch (error) {
    console.log(error);
    handleResponse('Unauthorized', 'You are not authorized to access this page', 'destructive')
    navigate('/')
  }
}

export async function Logout(navigate: ReturnType<typeof useNavigate>) {
  localStorage.removeItem('token')
  localStorage.removeItem('room')
  localStorage.removeItem('boardgame')
  navigate('/')
}

export async function Register(user: any, navigate: ReturnType<typeof useNavigate>) {
  try {
    const res = await axios.post(Config.apiPath + '/user/create', user)

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      navigate('/home')
    } else {
      navigate('/')
    }
  } catch (error) {
    console.log(error);
    navigate('/')
  }
}

export async function checkAuth(navigate: ReturnType<typeof useNavigate>) {
  const token = localStorage.getItem('token')
  if (!token) {
    navigate('/')
  }
}

export async function checkAdmin(navigate: ReturnType<typeof useNavigate>) {
  const token = localStorage.getItem('token')
  if (token) {
    const decode = decodeJwt(token)
    console.log(decode);
  }

  if (!token) {
    navigate('/')
    handleResponse('Unauthorized', 'You are not authorized to access this page', 'destructive')
  }
  try {
    const res = await axios.get(Config.apiPath + '/user/admin/check', {
      headers: {
        'Authorization': token
      }
    })
    // console.log(res.data);

    if (res.data.message !== 'Authorized') {
      navigate('/')
      handleResponse('Unauthorized', 'You are not authorized to access this page', 'destructive')
    }
  } catch (error) {
    console.log(error);
    navigate('/signin')
    handleResponse('Unauthorized', 'You are not authorized to access this page', 'destructive')
  }
}

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
}

export async function getUserInfo(): Promise<User> {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.get("http://localhost:3001/user/info", {
      headers: {
        'Authorization': token
      }
    })
    return res.data
  } catch (error) {
    console.log(error);
    return {
      id: '',
      username: '',
      email: '',
      role: ''
    }
  }
}