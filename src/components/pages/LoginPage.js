import React, {useRef,useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../providers/AuthProvider';
import '../../App.css'
import { BackgroundStyle } from './LandingPage'
import axios from '../../api/Requests';
const LOGIN_URL = '/auth/login';
export default function SignInPage() {
    const {auth,setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [success, setSuccess] = useState(false);

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState();
    
    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "email": user,
            "password": pwd
          });
        try {
            const response = await axios.post(LOGIN_URL,data,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
}
            );         
            const accessToken = response.data.accessToken;
            const name = response.data.user;
            setAuth({ user:user, name:name,pass:pwd, token:accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            window.location.href = '/home';          
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
            errRef.current.focus();
        }
    }

    return (
        <header style={ BackgroundStyle }>
        <div className="text-center m-5-auto">
        <h2 className="white-text" >Login form</h2>
            <form onSubmit={handleSubmit}>
                <p ref={errRef} aria-live="assertive">{errMsg}</p>
                <p>
                    <label>Email address</label><br/>
                    <input type="text" name="first_name" id="username" ref={userRef} autoComplete="off" onChange={(e)=> setUser(e.target.value)} value={user} required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br/>
                    <input type="password" id="password" onChange={(e)=>setPwd(e.target.value)}                             value={pwd}
 required />
                </p>
                <p>
                    <button id="register_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
               <Link className="white-text" to="/register">Create an account</Link>
               <br></br>
               <Link className="white-text" to="/">Back to Homepage</Link>
            </footer>
        </div>
        </header>

    )
}
