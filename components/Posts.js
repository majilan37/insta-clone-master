import { useEffect, useState } from "react"
import { onSnapshot, query, collection, orderBy } from "@firebase/firestore"
import Post from "./Post"
import { db } from "../firebase"

function Posts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            setPosts(snapshot.docs)
        })
        return () => unsubscribe()
    }, [db])

    return (
        <div>
            {posts.map((post) => (
                <Post 
                    key={post.id} 
                    id={post.id} 
                    username={post.data().username}
                    img={post.data().image}  
                    userImg={post.data().profileImg} 
                    caption={post.data().caption}
                />
            ))}
        </div>
    )
}

export default Posts
