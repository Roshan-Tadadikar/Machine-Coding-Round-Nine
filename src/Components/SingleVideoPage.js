import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import YouTube from 'react-youtube';
import { MdPlaylistAdd, MdWatchLater } from "react-icons/md"
import Icon from '@mdi/react';
import { mdiPlaylistEdit } from '@mdi/js';
import { categories } from '../Data/Categories';
import { videos } from '../Data/AllVideos';
import { ProvideContext } from './ContextProvide/ContextProivder'
import { useContext } from 'react';
import { AiFillDelete } from "react-icons/ai"
import { HiPencil } from "react-icons/hi"

const SingleVideoPage = () => {
    const [notes, toggleNotes] = useState(false)
    const [playlist, togglePlaylist] = useState(false)
    const[editNotes, toggleEdit] = useState(false)
    const location = useLocation()
    const[oldCommentId, setOldCommentId] = useState(0)
    const video = location.state
    const [state, setState] = useState(videos.filter(ele => ele._id != video._id))
    console.log("video is==>" + video.src)
    const { states, dispatch } = useContext(ProvideContext)
    const addToWatchLater = (ele) => {
        if (states.watchLater.includes(ele)) {
            console.log("removed")
            dispatch({ type: "remove_from_watch_later", payload: ele })
        } else {
            console.log("added")
            dispatch({ type: "add_to_watch_later", payload: ele })
        }

    }

    const editComment=(id)=>{
        const newval = document.getElementById("id").value;
        dispatch({type:"edit_comment", payload:{
            id:id,
            comment:newval
        }})
        toggleNotes(!notes)
    }

    const deleteComment=(id)=>{
        dispatch({type:"delete_comment", payload:id})
    }

    const handleEditComment=(ele)=>{
        toggleEdit(!editNotes)
        document.getElementById("note").value=ele.comment
        setOldCommentId(ele.commentId)
        console.log("oldCOmmentId ====>"+oldCommentId)
      
    }

    function getRandomInt() {
        const randomFloat = Math.random();
        const randomInteger = Math.floor(randomFloat * 1000000);
        return randomInteger;
      }
    return (
        <div>
            <Navbar />
            <div class="sm:ml-64">
                <div class="p-4 rounded-lg flex justify-between ">
                    <div className='flex flex-col w-4/6'>
                        <YouTube videoId={video.src} />
                        <div className='flex p-2 shadow-xl justify-between w-5/6 mt-2'>
                            <div className='flex '>
                                <img class="w-10 h-10 rounded-full mr-2" src="https://e1.pxfuel.com/desktop-wallpaper/522/159/desktop-wallpaper-anime-village.jpg" alt="Rounded avatar" />
                                <h1 className='font-bold text-lg p-2'>{video.title}</h1>
                            </div>
                            <div className='flex p-2 text-2xl w-32 justify-between'>
                                <MdPlaylistAdd className='cursor-pointer' onClick={() => toggleNotes(!notes)} />
                                <MdWatchLater onClick={(video) => addToWatchLater(video)} />
                                <Icon path={mdiPlaylistEdit} className='cursor-pointer' size={1} onClick={() => togglePlaylist(!playlist)} />


                               
                                        <div class={playlist?"z-0 absolute mt-8  bg-white divide-y divide-gray-100 rounded-lg shadow w-48 bg-gray-300 shadow-2xl":"hidden"}>
                                            <ul class="py-2 text-sm text-gray-700 text-black p-2" aria-labelledby="dropdownHoverButton">
                                                <li>
                                                    <h1 className='font-bold text-xl'>Add to PlayList</h1>
                                                </li>
                                                <li>
                                                    <input className='p-2 border border-gray-300 w-30 mt-4 rounded ' id='title' placeholder='Enter tile of your playlist' />
                                                </li>
                                                <li>
                                                    <input className='p-2 border border-gray-300 w-30 mt-4 rounded' id="description" placeholder='Write a description' />
                                                </li>
                                                <li>
                                                    <button className='p-2 mt-4 bg-blue-400 w-40 text-white font-bold rounded'
                                                    onClick={()=>{
                                                        const id = getRandomInt()
                                                        dispatch({type:"create_playlist", payload:{
                                                            id:id,
                                                            title:document.getElementById("title").value,
                                                           description:document.getElementById("description").value
                                                        }})
                                                        dispatch({type:"add_to_playlist", payload:{
                                                            id:id,
                                                            video:video
                                                        }})
                                                        togglePlaylist(!playlist)
                                                    }}
                                                    >Create a PlayList</button>
                                                </li>
                                            </ul>
                                        </div>
                                       
                              
                                        <div class={(notes || editNotes)?"z-0 absolute mt-8  bg-white divide-y divide-gray-100 rounded-lg shadow w-48 bg-gray-300 shadow-2xl":"hidden"}>
                                            <ul class="py-2 text-sm text-gray-700 text-black p-2" aria-labelledby="dropdownHoverButton">
                                                <li>
                                                    <h1 className='font-bold text-xl'>Add Notes</h1>
                                                </li>
                                                <li>
                                                    <input className='p-2 border border-gray-300 w-30 mt-4 rounded ' placeholder='Write a description' id='note' />
                                                </li>
                                                <li>

                                                    {
                                                        editNotes
                                                        ?
                                                        <button className='p-2 mt-4 bg-blue-400 w-40 text-white font-bold rounded'
                                                        onClick={() => {
                                                            dispatch({
                                                                type: "edit_comment", payload: {
                                                                    id: video._id,
                                                                    comment: document.getElementById("note").value,
                                                                    commentId:oldCommentId
                                                                }
                                                            })
                                                            toggleEdit(!editNotes)
                                                        }
                                                        }
                                                    >Update  Note</button>
                                                        :

                                                        <button className='p-2 mt-4 bg-blue-400 w-40 text-white font-bold rounded'
                                                        onClick={() => {
                                                            const commentId = getRandomInt()
                                                            dispatch({
                                                                type: "add_comment", payload: {
                                                                    id: video._id,
                                                                    comment: document.getElementById("note").value,
                                                                    commentId:commentId
                                                                }
                                                            })
                                                            toggleNotes(!notes)
                                                        }
                                                        }
                                                    >Create  Note</button>
                                                    }
                                                   


                                                </li>
                                            </ul>
                                        </div>
                                        
                                
                            </div>
                        </div>

                        <div>
                            <h1 className='font-bold text-left  mt-8 text-2xl'>My Notes</h1>
                            <div className='flex flex-col'>
                                {
                                    states.Comment[video._id]?.map(element =>
                                        <div className='flex justify-between shadow-xl p-2 mb-2 mt-2 w-5/6'>
                                            <h1>{element.comment}</h1>
                                            <div className='flex w-16 justify-between cursor-pointer'>
                                                <HiPencil onClick={()=>handleEditComment(element)} />
                                                <AiFillDelete onClick={()=>deleteComment(element)}/>
                                            </div>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col self-end'>
                        <h1 className='text-xl font-bold mb-4 text-left'>More Videos</h1>
                        {
                            state.map(video =>
                                <div class="lg:w-1/2 mb-4">
                                    <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                        <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={video.thumbnail} />
                                        <div class="flex-grow sm:pl-8">
                                            <h2 class="title-font font-medium text-sm text-gray-900">{video.title}</h2>
                                            <h3 class="text-gray-500 mb-3">{video.creator}</h3>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleVideoPage