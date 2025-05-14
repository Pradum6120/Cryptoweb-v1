import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllposts } from '../store/UserSlice'


function Shopping() {

  const dispatch = useDispatch()

useEffect(() => {
  dispatch(setAllposts())
},[dispatch])


  return (
    <div className=' h-screen text-white mb-96' >
      <h1>shooping</h1>
    </div>
  )
}

export default Shopping
