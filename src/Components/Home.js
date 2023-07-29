import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { categories } from '../Data/Categories'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { videos } from '../Data/AllVideos'
import { ProvideContext } from './ContextProvide/ContextProivder'
import { useContext } from 'react'

import {MdPlaylistAdd,MdWatchLater} from "react-icons/md"

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const[state, setState]= useState(categories)
    const addToWatchLater=(ele)=>{
        if(states.watchLater.includes(ele)){
            console.log("removed")
            dispatch({type:"remove_from_watch_later", payload:ele})
        }else{
            console.log("added")
            dispatch({type:"add_to_watch_later", payload:ele})
        }
    
    }
    
    const{states,dispatch} = useContext(ProvideContext)
    console.log("current location==>"+location.pathname)

    const filterByTitle=(name)=>{
        if(name.length==0){
            setState(videos)
        }
       else setState(state.filter(video=>video.title.includes(name)))
    }

    useEffect(()=>{
       
        if(location.pathname=="/"){
            setState(categories)
        }else{
            setState(videos)
        }
   
    },[location])

    const openSingleVideoPage=(ele)=>{
        navigate("/singelPage",{state:ele})
    }

    if (location.pathname == '/explore' || location.pathname=="/watchLater") {
        return(
        <div>
            <Navbar />
            <div class="p-4 sm:ml-64">
                <div class="p-4 rounded-lg">
                    <h1 className='text-3xl font-bold mb-6 text-left text-black'>{location.pathname.substring(1).toUpperCase()}</h1>
                 {  
                 location.pathname=="/explore"?
                 <form className='shadow-xl'>
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-black rounded-lg  focus:ring-blue-500 focus:border-blue-500    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search videos by title..." required
                                onChange={(e)=>filterByTitle(e.target.value)}
                            />
                        </div>
                    </form>
                    
                :
                ""
                }
                   
                   
                    <section class="text-black body-font">
                        <div class="container px-5 py-24 mx-auto">
                            <div class="flex flex-wrap -m-4">
                                {
                                   (location.pathname=="/explore"?state:states.watchLater).map(ele =>
                                        <div class="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer flex flex-col">
                                            <span class="block relative h-48 rounded overflow-hidden">
                                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={ele.thumbnail} onClick={()=>openSingleVideoPage(ele)}/>
                                                <MdWatchLater className='absolute top-0 right-0 text-blue-900 mt-2 mr-2'
                                                    onClick={() => addToWatchLater(ele)} />
                                            </span>
                                            <div className='flex p-2'>
                                                <img class="w-10 h-10 rounded-full mr-2" src="https://e1.pxfuel.com/desktop-wallpaper/522/159/desktop-wallpaper-anime-village.jpg" alt="Rounded avatar" />

                                                <div className='flex flex-col font-bold'>
                                                    <h1>{ele.title}</h1>
                                                    <h1>{ele.category}</h1>
                                                    <p className='text-gray-400 text-sm '>
                                                        <span>{ele.views} Views</span> |
                                                        <span>{ele.creator}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        )
    } 
   else return (
        <div>
            <Navbar />
            <div>
                <div class="p-4 sm:ml-64">
                    <div class="p-4 rounded-lg">
                        <h1 className='font-bold text-3xl text-left'>Categories</h1>
                        <section class="text-black body-font">
                            <div class="container px-5 py-24 mx-auto">
                                <div class="flex flex-wrap -m-4">
                                    {
                                        state.map(ele =>
                                            <Link to="/listing" state={{ category: ele }} class="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer" >
                                                <div
                                                key={ele.id}
                                                >
                                                    <a class="block relative h-48 rounded overflow-hidden">
                                                        <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={ele.thumbnail} />
                                                    </a>
                                                    <h1 className='font-bold'>{ele.category}</h1>
                                                </div>
                                            </Link>

                                        )
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home