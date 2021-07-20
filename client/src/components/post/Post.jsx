import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {

  const  dateOptions = {weekday: "long", year: "numeric", month: "long", day: "2-digit"};

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={`/images/${post.photo}`} alt="" />}
      <div className="postInfo">
        <div className="postCats">
            {
              post.categories.map((category, index) => (
                <Link key={index} to={`/?cat=${category}`} className="link">
                  <span className="postCat">{category}</span>
                </Link>
              ))
            }
            
        </div>
        <Link to={`/post/${post._id}`} className="link postTitle">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr className="postSep"/>
        <span className="postDate">
          {new Date(post.createdAt).toLocaleDateString("fr-FR", dateOptions)}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}