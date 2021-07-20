import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef } from "react"
import { Context } from "../../context/Context"
import axios from "axios"


export default function Login() {

  const userRef = useRef()
  const passwordRef = useRef()

  const {error, dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })

      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    } catch (err) {
      dispatch({type: "LOGIN_FAILURE"})
    }
  };

  

  return (
    <div className="login">
      <span className="loginTitle">S'identifier</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Nom d'utilisateur</label>
        <input 
        className="loginInput" 
        type="text" 
        placeholder="Enter your username..." 
        ref={userRef}
        />
        <label>Mot de passe</label>
        <input 
        className="loginInput" 
        type="password" 
        placeholder="Enter your password..." 
        ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
        S'identifier
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">S'inscrire</Link>
      </button>
      {
        error && (
          <div style={{color: "tomato", marginTop: "1rem"}}>Nom d'utilisateur ou mot de passe incorrect</div>
        )
      }
    </div>
  )
}
