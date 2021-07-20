import './posts.css'
import Post from "../post/Post"

export default function Posts({posts}) {
  return (
    <div id="posts-component" className="posts">
      {posts.map(post => (
        <Post key={post._id} post={post}/>
      ))}
    </div>
  )
}
