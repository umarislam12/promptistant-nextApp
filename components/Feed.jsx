'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import { useRouter } from "next/navigation"
const PromptCardList = ({ data, handleTagClick,handleProfileClick }) => {
  return (
    <div className="mt-16 prompt_layout">

      {data.map((post) => (

        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick} />

      ))}
    </div>
  )
}
const Feed = () => {
  const router=useRouter();
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([]);
  
  const filterPrompt=(searchText)=>{
    const regex=new RegExp(searchText,"i");
    return posts.filter((item)=>
    regex.test(item.creator.username) ||
    regex.test(item.tag) ||
    regex.test(item.prompt)
    )
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    setSearchTimeout(setTimeout(()=>{
      const searchResult=filterPrompt(e.target.value)
      setSearchedResults(searchResult)
      console.log(searchResult)
    },500))
    
  }
  // const handleEntertext = () => {
   
  //   if (e.key === 'Enter') {
  //     console.log(searchText)
  //   }
   
  // }
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
    
  }
  useEffect(() => {
   
    fetchPosts();


  }, [])

const handleTagClick=(tagName)=>{
  setSearchText(tagName);
  const searchResult=filterPrompt(tagName);
  setSearchedResults(searchResult);
}
const handleProfileClick=(param)=>{
  router.push(`/profile/user?id=${param}`)
}
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" className="search_input peer"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          
          required
        />
      </form>
     {searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick } handleProfileClick={handleProfileClick}/> :
     <PromptCardList data={posts} handleTagClick={handleTagClick } handleProfileClick={handleProfileClick}/> } 
    </section>
  )
}

export default Feed