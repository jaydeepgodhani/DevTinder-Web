import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import Footer from './Footer'
import Navbar from './Navbar'

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);
  const fetchUser = async() => {
    try{
      const res = await axios.get(BASE_URL + '/profile/view', {withCredentials: true});
      dispatch(addUser(res.data.user));
    } catch(e) {
      if(e.status === 401) navigate('/login');
      console.log(e);
    }
  }

  useEffect(()=> {
    if(!userData) fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body