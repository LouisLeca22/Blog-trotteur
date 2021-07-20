import "./sidebar.css" 
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
      const getCats = async () => {
        const res = await axios.get("/api/categories");
        setCats(res.data)
      };

      getCats()
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle" style={{textTransform: "uppercase"}}>catégories</span>
        <ul className="sidebarList">
          {cats.map(cat =>(
              <Link key={cat._id} to={`/?cat=${cat.name}`} className="link">
                <li className="sidebarListItem">
                  {cat.name}
                </li>
              </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">SUIVEZ-NOUS</span>
        <div className="sidebarSocial">
          <a href="http://www.facebook.com" className="link">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          </a>
          <a href="http://www.twitter.com" className="link">
          <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
          <a href="http://www.pinterest.com" className="link">
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          </a>
          <a href="http://www.instagram.com" className="link">
          <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
