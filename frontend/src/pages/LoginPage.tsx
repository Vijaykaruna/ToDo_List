import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "https://todo-list-lfx4.onrender.com";
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  function handleLogin(e:any){
    e.preventDefault();
    console.log(SERVER_URL);
    axios.post(`${SERVER_URL}/login`, {email, password}, {withCredentials: true})
    .then(res => {//console.log(res)
      if(res.status === 200){
        navigate('/home')
        setErr('')
      }
    })
    .catch(err => {console.log(err)
      setErr(err.response.data)
    });
  }
    return(
       <div className="container-fluid vh-100 bg-1 style-font">
        <div className="pt-5 ms-lg-5 d-flex justify-content-evenly flex-lg-row flex-column">
         <form onSubmit={handleLogin} className="col-lg-5 col-12 bg-light pb-5 bg-opacity-10 rounded-5 mt-3 shadow-lg">
            <p className="fs-1 text-center text-light py-5">Login</p>
            <div className="mb-5 mx-lg-5 mx-4">
                <div className="form-floating mb-3">
                 <input type="email" className="form-control border-0" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                 <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                 <input type="password" className="form-control border-0" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>         
                 <label htmlFor="floatingPassword">Password</label>
                 <p className="text-danger my-2 text-center">{err}</p>
                </div>
                <p className="text-light float-end me-2 mt-1">Create an account? <Link to={'/signup'} className="text-decoration-none">Sign Up</Link></p>
                <div className="my-5 text-center">
                   <button type="submit" className="btn btn-primary rounded-pill px-5">Login</button>
                </div>
            </div>
          </form>
          <div className="my-5 me-4 text-light text-center col-lg-4">
            <p className="h1 fw-bold">Happy to see you again!</p>
          </div>
        </div>
       </div>
    );
}
export default LoginPage;