import "./singlePost.css"
import {useLocation} from "react-router"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

export default function SinglePost() {

  const  dateOptions = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};

  const location = useLocation()
  const path = (location.pathname.split("/")[2])
  const [post, setPost] = useState({})
  const {user} = useContext(Context)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updatedMode, setUpdateMode] = useState("")

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" +path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }

    getPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {data: {username: user.username}});
      window.location.replace("/")
    } catch (err) {
      
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, { 
        username: user.username, title, desc
      });
      setUpdateMode(false)
    } catch (err) {
      
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo &&
           <img src={`/images/${post.photo}`} alt="" className="singlePostImg" />
        }

        {
          updatedMode ? (
            <input 
              type="text" 
              value={title} 
              className="singlePostTitleInput" 
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
          /> 
          ): (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username &&
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                  <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            }
          </h1>
          )
        }
    
        <div className="singlePostInfo">
          <span className="singlePostAuthor">Auteur: 
          <Link to={`/?user=${post.username}`} className="link">
          <b>{post.username}</b>
          </Link>
         </span>
          <span className="singlePostDate">{new Date(post.createdAt).toLocaleDateString("fr-FR", dateOptions)}</span>
        </div>
        {
          updatedMode ? (
          <textarea  
          className="singlePostDescInput" 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)}
          />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )
        }

        
        {
          updatedMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
          )
        }
   
      </div>
    </div>
  )
}
