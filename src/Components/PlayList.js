import React, { useContext } from 'react'
import { ProvideContext } from './ContextProvide/ContextProivder'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const PlayList = () => {
    const { states, dispatch } = useContext(ProvideContext)
    const entries = Object.keys(states.playList).length>0? Object.values(states.playList):[]
    console.log("Inside enteries ===>"+JSON.stringify(states.playList))
    return (
        <div>
            <Navbar />
            <div class="p-4 sm:ml-64">
                <div class="p-4 rounded-lg">
                    <section class="text-gray-600 body-font">
                        <div class="container px-5 py-24 mx-auto">
                            <div class="flex flex-wrap -m-4">
                               
                                    {
                                        (entries!=undefined && entries.length>0)
                                        ?
                                      entries.map(list =>
                                        <Link class="p-4 md:w-1/3 cursor-pointer" to="/allVideosList" state={{arr:list.arr}}>
                                            
                                            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                                                <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg" alt="blog" />
                                                <div class="p-6">
                                                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{list.title}</h2>
                                                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{list.description}</h1>
                                                </div>
                                            </div>
                                            </Link>
                                        )
                                        :
                                        <h1>Oops! No playlist created</h1>
                                    }
                               

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PlayList