import React, { useState, useEffect } from 'react'
import { useAuth } from '../store/auth'
import Boxpinned from '../components/Boxpinned'

function Bookmarks() {
  const [user, Setuser] = useState({})

  const { AuthorizationToken } = useAuth()

  const pinnedPost = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/post/pinned", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken
        }
      })

      if (response.ok) {
        const data = await response.json()
        Setuser(data)
      } else {
        console.log("Error while fetching user data")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  useEffect(() => {
    pinnedPost()
  }, [])

  // Rendering pinned posts
  return (
    <>
   
      <div className='flex h-screen mt-24 w-[100%] justify-center gap-8 flex-wrap mb-36'>
        {user.pinnedPosts && user.pinnedPosts.length > 0 ? (
          user.pinnedPosts.map((post, index) => (
            <Boxpinned key={index} posts={post}  />
          ))
        ) : (
          <div className='w-[500px] h-[400px]'>
            <img className='' src="/nopost.png" alt="" />
          <p className="text-center bg-black text-white text-4xl">You don't pinned Any posts </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Bookmarks
