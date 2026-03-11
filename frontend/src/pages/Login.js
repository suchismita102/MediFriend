import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess} from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    /* ADD THIS */
    useEffect(()=>{
        document.body.className = "auth-page";
        return ()=>{
            document.body.className = "";
        }
    },[]);

    const handleChange = (e)=> {
        const {name, value} = e.target;
        const copyLoginInfo ={ ...loginInfo };
        copyLoginInfo[name]= value;
        setLoginInfo(copyLoginInfo)
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if(!email || !password){
            return handleError('All fields are necessary!')
        }

        try{
            const url = "http://localhost:8080/auth/login";

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const {success, message, jwtToken, name, error} = result;

            if(success){
                handleSuccess(message);

                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);

                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }

            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }

            else if(!success){
                handleError(message);
            }

        }
        catch(err){
            handleError(err);
        }
    }

  return (
    <div className='container'>

      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>
            <label>Email</label>

            <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder='Enter Your Email'
                value={loginInfo.email}
            />
        </div>

        <div>
            <label>Password</label>

            <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder='Enter Your Password'
                value={loginInfo.password}
            />
        </div>

        <button type='submit'>Login</button>

        <span>
            Don't have an account ?
            <Link to="/signup"> Signup</Link>
        </span>

      </form>

      <ToastContainer/>

    </div>
  )
}

export default Login