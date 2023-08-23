"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Profile from "@components/Profile"

const OtherProfile = () => {
  const paramsId = useSearchParams('id');
  const UserId=paramsId.get('id');
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/profile/${UserId}`);
      const data = await response.json();
      setPosts(data);
    }
    if (paramsId) fetchPosts();
    console.log(posts)
  }, [paramsId])
  return (
    <Profile desc="Welcome to profile page" data={posts}
    />
  )
}

export default OtherProfile


