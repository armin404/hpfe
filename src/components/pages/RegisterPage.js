import React,{useRef,useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/Requests';
import '../../App.css'
import { BackgroundStyle } from './LandingPage'
const REGISTER_URL = '/auth/register';

export default function SignUpPage() {
    const [name,setName] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const [errMsg,setErrMsg] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "email": email,
            "password": password,
            "name":name
          });
        try {
            const response = await axios.post(REGISTER_URL,data,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                }
            );
            window.location.href = '/login';          
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Please provide valid email');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }
    return (
        <header style={ BackgroundStyle }>

        <div className="text-center m-5-auto">
            <h2 className="white-text" >Register form</h2>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Name</label><br/>
                    <input type="text" onChange={(e)=>setName(e.target.value)} name="first_name" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} required />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="register_btn"  type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p className="white-text"><Link className="white-text" to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </header>

    )

}
