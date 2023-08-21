
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
const Nav = () => {
  const{data:session}=useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown]=useState(false)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      //setting the state
      setProviders(response)
    }
    
    setUpProviders();
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo1.svg" width={80} height={80} alt='logo' className='object-contain' />
        <p className="logo_text">Promptistant</p>
      </Link>
      
      {/* desktop navigation */}
      <div className="sm:flex hidden">

        {session?.user ?
          (<div className='flex gap-3 md:gap-5'>
           
            <Link href="/create-prompt" className='black_btn'>Create Prompt</Link>
            <button type="button" className='outline_btn' onClick={signOut}> Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full' />
            </Link>
          </div>)
          : (
            <>
             {providers && Object.values(providers).map((provider)=>(
                  <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
                    Sign In
                  </button>
             ))}
            </>
          )}
      </div>
      {/* mobile navigation */}
      
      <div className="sm:hidden flex relative">
        {session?.user ?  <div className='flex'>
          
        <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full' 
        onClick={()=>{setToggleDropdown((prev)=>!prev)}}/>
        {toggleDropdown && (
          <div className="dropdown">
            <Link className="dropdown_link" href='/profile' onClick={()=>setToggleDropdown(false)}>My Profile</Link>
            <Link className="dropdown_link" href='/create-prompt' onClick={()=>setToggleDropdown(false)}>Create Prompt</Link>
            <button type='button' className='mt-5 w-full black_btn' onClick={()=>{setToggleDropdown(false);signOut();}}>Signout</button>
          </div>
        )}
      </div>
        :
        <>
        {providers && Object.values(providers).map((provider)=>(
             <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>
               Sign In
             </button>
        ))}
       </>
        }
      </div>
    </nav>
  )
}

export default Nav