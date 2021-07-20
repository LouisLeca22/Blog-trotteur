import { Link } from "react-router-dom"
import "./register.css"
import {useState} from "react"
import axios from "axios"

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password 
      })
      res.data && window.location.replace('/login')
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="register">
      <span className="registerTitle">S'inscrire</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nom d'utilisateur</label>
        <input 
        className="registerInput" 
        type="text" 
        placeholder="Enter your username..." 
        onChange={e => setUsername(e.target.value)}
        />
        <label>E-mail</label>
        <input 
        className="registerInput" 
        type="email" 
        placeholder="Enter your email..." 
        onChange={e => setEmail(e.target.value)}
        />
        <label>Mot de passe</label>
        <input 
        className="registerInput" 
        type="password" 
        placeholder="Enter your password..." 
        onChange={e => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          S'inscrire
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">S'identifier</Link>
      </button>
      {error && <span style={{color: "tomato", marginTop: "1rem"}}>Une erreur s'est produite</span>}
    </div>
  )
}
