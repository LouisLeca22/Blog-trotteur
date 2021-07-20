import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios"
import "./topbar.css";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get("/categories/")
      setCats(res.data)
    }

    fetchCats();
  },[])

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const onSearch = (category ) => {
    let matches = []
    if(category.length > 0){
      matches = cats.filter(c => {
        const regex = new RegExp(`${category}`, "gi")
        return c.name.match(regex)
      })
    }
    setSuggestions(matches)
    setCat(category)
  }

  const onSuggest = (category) => {
    setCat(category);
    setSuggestions([])
  }

  const handleSearch = () => {
    window.scrollTo(0,document.querySelector('.header').scrollHeight)

  }

 
  return (
    <div className="top">
      <div className="topLeft">
        <a href="http://www.facebook.com">
        <i className="topIcon fab fa-facebook-square"></i>
        </a>
        <a href="http://www.twitter.com">
        <i className="topIcon fab fa-twitter-square"></i>
        </a>
        <a href="http://www.pinterest.com">
        <i className="topIcon fab fa-pinterest-square"></i>
        </a>
        <a href="http://www.instagram.com">
        <i className="topIcon fab fa-instagram-square"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              ACCUEIL
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" style={{textTransform:"uppercase"}} to="/write">
              écrire
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout} style={{textTransform: "uppercase"}}>
            {user && "déconnexion"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={`/images/${user.profilePicture}`} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                S'IDENTIFIER
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                S'INSCRIRE
              </Link>
            </li>
          </ul>
        )}
        <form className="searchForm">
          <label htmlFor="search" >
            <Link to={`/?cat=${cat}`} className="link" onClick={handleSearch}>
              <i onClick={handleSearch} className="topSearchIcon fas fa-search"></i>
            </Link>
          </label>
          <input 
          className="searchInput"
          placeholder="France, Brésil, Argentine..."
          type="text" 
          id="search"
          onChange={e =>  onSearch(e.target.value)}
          value={cat}
          onBlur={
            () => {
              setTimeout(() => {
                setSuggestions([])
              }, 200)
            }
          }
          />

{suggestions &&suggestions.map((suggestion, index) => (
            <div className="searchSuggestion" onClick={() => onSuggest(suggestion.name)} key={index}>{suggestion.name}</div>
          ))}
        </form>
      </div>
    </div>
  );
}