import "./header.css"
import {Link } from "react-scroll"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Blog Trotteur</span>
        <span className="headerTitleSm">Voyager depuis chez vous en lisant les articles de notre blog</span>
         <Link className="headerButton" to="posts-component" smooth={true} duration={1000}>
            Lire nos articles
         </Link>
      </div>
      <img
        className="headerImg"
        src="/images/showcase.jpg"
        alt=""
      />
    </div>
  )
}
