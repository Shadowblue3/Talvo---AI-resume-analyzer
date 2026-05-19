import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import '../../../style/button.scss'
import '../auth.form.scss'


const Login = () => {
  
  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const handleSumbit = async (e)=>{
        e.preventDefault()
        handleLogin({email, password})
        navigate("/home")
    }

    if(loading){
      return (<Loader/>)
    }

  return (
    <main>
      <div className="noise-layer" />

      <div className="form-container">
        <h1 className="brand">Talvo</h1>
        <p className="login-label">Login</p>
        <p className="tagline">// AI-powered resume analysis</p>

        <form onSubmit={handleSumbit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <a href="/forgot-password" className="forgot">
            Forgot password?
          </a>

          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </main>
  )
}

export default Login