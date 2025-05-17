import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function SignupPage(){
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  function handleSignup(e: any){
    e.preventDefault();
    axios.post(`${SERVER_URL}/signup`, {name, email, password})
    .then(res => {console.log(res)
      navigate('/')
    })
    .catch(err => {console.log(err)
      setIsDuplicate(true);
      console.log(isDuplicate)
    });
  }

    return(
        <div className="container-fluid vh-100 bg-1 style-font">
        <div className="pt-3 me-lg-5 d-flex justify-content-evenly flex-lg-row flex-column">
          <div className="my-5 text-light text-center col-lg-4">
              <p className="h1 fw-bold">Welcome!</p>
          </div>
         <form onSubmit={handleSignup} className="col-lg-5 col-12 bg-light pb-5 bg-opacity-10 rounded-5 mt-3 shadow-lg">
            <p className="fs-1 text-center text-light py-5">SignUp</p>
            <div className="mb-5 mx-lg-5 mx-4">
                <div className="form-floating mb-3">
                 <input type="text" className="form-control border-0" id="floatingName" placeholder="UserName" value={name} onChange={(e) => setName(e.target.value)} required/>
                 <label htmlFor="floatingName">UserName</label>
                </div>
                <div className="form-floating mb-3">
                 <input type="email" className="form-control border-0" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                 <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                 <input type="password" className="form-control border-0" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                 <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="float-end mt-2">
                  <p className="text-light">Already Member?<Link to={'/'} className="text-decoration-none"> Log In</Link></p>
                </div>
                <div className="my-5 text-center">
                  <button type="submit" className="btn btn-primary rounded-pill px-5">Get Started</button>
                </div>
            </div>
          </form>
        </div>
       </div>
    )
}
export default SignupPage;