import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import { BackgroundStyle } from './LandingPage'
import axios from '../../api/Requests'
const RESET_URL = '/auth/forgotpassword';


export default function ForgetPasswordPage() {
    const [email,setEmail]=useState('');
    const [errMsg,setErrMsg] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "email": email,
          });
        try {
            const response = await axios.post(RESET_URL,data,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
}
            );
            setErrMsg("Email sent sucessfully");
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Please provide valid email');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Email not found');
            }
        }
    }
    return (
        <header style={ BackgroundStyle }>

        <div className="text-center m-5-auto">
            <h2 className="white-text" >Reset your password</h2>
            <h5 className="white-text" >Enter your email address and we will send you a new password</h5>
            <form onSubmit={handleSubmit}>
                <h2>{errMsg}</h2>
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
                </p>
                <p>
                    <button id="register_btn" type="submit">Send password reset email</button>
                </p>
            </form>
            <footer>
                <Link  className="white-text" to="/register">Create an account</Link>
                <p className="white-text"><Link className='white-text' to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
        </header>

    )
}
