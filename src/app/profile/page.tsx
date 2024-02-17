"use client"
import {useEffect, useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
 

function Profile() {

  const router = useRouter()
  const [user, setUser] = useState(null)
  

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success(response.data.message)
      router.push('/login')
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  useEffect(()=> {
     (async()=> {
      try {
        const response = await axios.get('/api/users/me')
        if(response.data.success) {
            toast.success(response.data.message)
            setUser(response.data.data.user)
        }
      } catch (error:any) {
        toast.error(error.message)
      }
      

     })()
  },[])

  return (
    <div>
      <h1 className='text-center text-lg mt-5 text-black'>Profile</h1>
      <ul className='flex flex-col justify-center items-center my-3'>
        <li>{user?.username}</li>
        <li>{user?.email}</li>
      </ul>
      <button onClick={onLogout} className='px-4 py-1 bg-green-500 rounded-md block mx-auto mt-2 text-white'>Logout</button>
    </div>
  );
}

export default Profile;
