import {useState} from 'react'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import '../auth.form.scss'
import '../../../style/button.scss'

const Register = () => {

    const navigate = useNavigate()
    const {loading, handleRegister} = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSumbit = async (e)=>{
        e.preventDefault()
        await handleRegister({username, email, password})
        navigate("/home")
    }

    if(loading){
      return(<Loader/>)
    }

  return (
    <main>
      <div className="noise-layer" />

      <div className="form-container">
        <h1 className="brand">Talvo</h1>
        <p className="login-label">Sign Up</p>
        <p className="tagline">// AI-powered resume analysis</p>

        <form onSubmit={handleSumbit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter username"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <a href="/forgot-password" className="forgot">
            Forgot password?
          </a>

          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>

        <div className="login-footer">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </main>
  )
}

export default Register