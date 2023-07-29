import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { videos } from '../Data/AllVideos'
import {MdPlaylistAdd,MdWatchLater} from "react-icons/md"
import { ProvideContext } from './ContextProvide/ContextProivder'

const VideListingPage = () => {
    const location = useLocation()
    const{states,dispatch} = useContext(ProvideContext)
    const{category} = location?.state
    const [state, setState] = useState(videos)

    useEffect(() => {
        setState(state.filter(ele => ele.category == category.category))
    }, [])

    const addToWatchLater=(ele)=>{
        if(states.watchLater.includes(ele)){
            console.log("removed")
            dispatch({type:"remove_from_watch_later", payload:ele})
        }else{
            console.log("added")
            dispatch({type:"add_to_watch_later", payload:ele})
        }
    
    }
    return (
        <div>
            <Navbar />
            <div class="p-4 sm:ml-64">
                <div class="p-4 rounded-lg">
                    <h1 className='font-bold text-3xl text-left'>{category.category}</h1>
                    <section class="text-black body-font">
                        <div class="container px-5 py-24 mx-auto">
                            <div class="flex flex-wrap -m-4">
                                {
                                    state.map(ele =>
                                        <Link class="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer flex flex-col" to="/singelPage" state={ele}>
                                            <span class="block relative h-48 rounded overflow-hidden">
                                                <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={ele.thumbnail} />
                                                <MdWatchLater className='absolute top-0 right-0 text-blue-900 mt-2 mr-2'
                                                onClick={()=>addToWatchLater(ele)}  />
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
                                        </Link>

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

export default VideListingPage