import {
    BookmarkIcon, ChatIcon, DotsHorizontalIcon, 
    EmojiHappyIcon, HeartIcon, PaperAirplaneIcon
} from '@heroicons/react/outline'

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { addDoc, serverTimestamp, collection, query, orderBy, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'
import Moment from 'react-moment'

function Post({img, username, caption, id, userImg}) {
    const {data: session} = useSession()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false)

    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment;
        
        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentToSend,
            username: session.user.name,
            userImg: session.user.image,
            timestamp: serverTimestamp()
        })

        setComment('')
    }

    useEffect(() => {
        return setHasLiked(likes.findIndex(like => (like.id === session?.user.uid) ) !== -1)
    }, [likes])

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => {
            setComments(snapshot.docs)
        })

        return () => unsubscribe()
    }, [db])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes', ), snapshot => {
            setLikes(snapshot.docs)
        })

        return () => unsubscribe()
    }, [db, id])


    console.log(hasLiked);
    const likePost = async () => {
        if (!hasLiked) {
            await setDoc(doc(db, 'posts', id, 'likes',session.user.uid ), {
                username: session.user.username,
            })
        } else {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        }
    } 
    return (
        <div className="bg-white my-7 border rounded-sm" >
            <div className="flex items-center p-5">
                <img className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={userImg} alt="" />
                <p className="flex-1 font-semibold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            <img className='w-full object-cover' src={img} alt="" />
            {session && (
                <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-4">
                        {hasLiked ? <HeartIconFilled  onClick={likePost} className="btn text-red-500" /> 
                                  : <HeartIcon onClick={likePost} className="btn" /> }
                        <ChatIcon  className="btn" />
                        <PaperAirplaneIcon  className="btn" />
                    </div>
                    <BookmarkIcon className="btn" />
                </div>
            )}
            <p className={`p-5 truncate ${session && 'pt-0'}`} >
                {likes.length > 0 && (
                    <p className="font-bold mb-1">{likes.length} likes</p>
                )}
                <span className="font-bold mr-1">{username}</span>
                {caption}
            </p>
            {/* comments */}
            {comments.length > 0 && (
                <div className="ml-10 h-16 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-center space-x-2 mb-3">
                            <img className="h-7 rounded-full" src={comment.data().userImg} alt="" />
                            <p className="text-sm flex-1">
                                <span className="font-semibold">{comment.data().username}: </span>
                                {comment.data().comment}
                            </p>
                            <Moment fromNow className='pr-5 text-xs' >
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            {session && (
                <form onSubmit={sendComment} className="flex items-center px-4">
                    <EmojiHappyIcon className="h-6" />
                    <input 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        className="flex-grow border-none focus:ring-0" 
                        placeholder='Add comment...' 
                        type="text" 
                    />
                    <button 
                        disabled={!comment.trim()} 
                        onClick={sendComment}
                        type="submit" 
                        className="font-semibold text-blue-400" 
                        type="submit"
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
