import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Config } from "../config";

export async function Login(user: any, navigate: ReturnType<typeof useNavigate>) {
  try {
    const res = await axios.post(Config.apiPath + '/user/signin', user)

    if (res.data.token) {
      localStorage.setItem('token', res.data.token)
      if (res.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard')
      } else if (res.data.user.role === 'GUEST') {
        navigate('/home')
      } else {
        // navigate('/')
        redirect('/')
      }
    } else {
      // navigate('/')
      redirect('/')
    }
  } catch (error) {
    console.log(error);
    navigate('/')
  }
}

export async function Logout(navigate: ReturnType<typeof useNavigate>) {
  localStorage.removeItem('token')
  navigate('/')
}

export async function Register(user: any, navigate: ReturnType<typeof useNavigate>) {
  try {
    const res = await axios.post(Config.apiPath + '/user/signup', user)

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
  if (!token) {
    navigate('/')
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
    }
  } catch (error) {
    console.log(error);
    navigate('/')
  }
}