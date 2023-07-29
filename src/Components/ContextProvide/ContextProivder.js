import React, { createContext, useContext, useReducer } from 'react'
import { videos } from '../../Data/AllVideos'

export const ProvideContext = createContext()

const ContextProivder = ({ children }) => {


    const addComment = (comment, video) => {
        console.log("Inside comment===>" + JSON.stringify(comment));
        const id = video.id;
        const newComment = { ...comment };
        if (video.id in newComment) {
            console.log("Inside if condition ");
            newComment[id] = [...newComment[id], video];
        } else {
            console.log("Inside else condition ");
            newComment[id] = [video];
        }

        return newComment;
    };

    const deleteComment = (comment, video) => {
        console.log("Inside delete comment===>" + JSON.stringify(video));
        const id = video.id;
        const newComment = { ...comment };
        newComment[id] = newComment[id].filter((ele) => ele.commentId !== video.commentId);
        return newComment;
    };

    const editComment = (comment, video) => {
        console.log("Inside edit comment===>" + JSON.stringify(video));
        const id = video.id;
        const newComment = { ...comment };
        newComment[id] = newComment[id].filter((ele) => ele.commentId !== video.commentId);
        newComment[id] = [...newComment[id], video];
        return newComment;
    };

    const createPlaylist=(playlist,obj)=>{
        console.log("Inside create playlist"+JSON.stringify(obj));
        const newPlayList = {...playlist}
        const id = obj.id
        newPlayList[id]={
            title:obj.title,
            description:obj.description,
            arr:[]
        }

        return newPlayList
    }

    const addToPlayList=(playList,obj)=>{
        console.log("Inside add to  playlist"+JSON.stringify(obj));
        const newPlayList = {...playList}
        const id = obj.id
        newPlayList.arr=newPlayList.arr ? [...newPlayList.arr, obj.video]:[obj.video]
        console.log("playlsi===>"+JSON.stringify(playList))
        return newPlayList
    }


    const handleReducer = (states, action) => {
        switch (action.type) {
            case "add_to_watch_later":
                return { ...states, watchLater: [...states.watchLater, action.payload] }
            case "remove_from_watch_later":
                return { ...states, watchLater: states.watchLater.filter(ele => ele.id != action.payload.id) }
            case "add_comment":
                console.log("Inside add comment once")
                return { ...states, Comment: addComment(states.Comment, action.payload) }
            case "delete_comment":
                return { ...states, Comment: deleteComment(states.Comment, action.payload) }
            case "edit_comment":
                return { ...states, Comment: editComment(states.Comment, action.payload) }
            case "create_playlist":
                return { ...states, playList: createPlaylist(states.playList, action.payload) }
            case "add_to_playlist":
                return { ...states, playList: addToPlayList(states.playList, action.payload) }
        }
    }
    const [states, dispatch] = useReducer(handleReducer, { watchLater: [], Comment: {}, playList: {} })

    return (
        <ProvideContext.Provider value={{ states, dispatch }}>
            {children}
        </ProvideContext.Provider>
    )
}

export default ContextProivder