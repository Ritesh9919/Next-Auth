"use client"

import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'

function Profile() {

  const router = useRouter()

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout')
      toast.success(response.data.message)
      router.push('/login')
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  return (
    <div>
      <h1 className='text-center text-lg mt-5'>Profile</h1>
      <button onClick={onLogout} className='px-4 py-1 bg-green-500 rounded-md block mx-auto mt-2 text-white'>Logout</button>
    </div>
  );
}

export default Profile;
