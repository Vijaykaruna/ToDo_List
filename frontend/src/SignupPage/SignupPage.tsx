import { useNavigate, Link } from "react-router-dom";

function SignupPage(){
  const navigate = useNavigate();
    return(
        <div className="container-fluid vh-100 bg-1 style-font">
        <div className="pt-3 me-lg-5 d-flex justify-content-evenly flex-lg-row flex-column">
          <div className="my-5 text-light text-center col-lg-4">
            <p className="h1 fw-bold">Welcome!</p>
          </div>
         <form className="col-lg-5 col-12 bg-light pb-5 bg-opacity-10 rounded-5 mt-3 shadow-lg">
            <p className="fs-1 text-center text-light py-5">SignUp</p>
            <div className="mb-5 mx-lg-5 mx-4">
                <div className="form-floating mb-3">
                 <input type="text" className="form-control border-0" id="floatingName" placeholder="UserName" required/>
                 <label htmlFor="floatingName">UserName</label>
                </div>
                <div className="form-floating mb-3">
                 <input type="email" className="form-control border-0" id="floatingInput" placeholder="name@example.com" required/>
                 <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                 <input type="password" className="form-control border-0" id="floatingPassword" placeholder="Password"/>
                 <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="float-end mt-2">
                  <p className="text-light">Already Member?<Link to={'/'} className="text-decoration-none"> Log In</Link></p>
                </div>
                <div className="my-5 text-center">
                  <button type="submit" className="btn btn-primary rounded-pill px-5" onClick={() => {navigate('/home')}}>Get Started</button>
                </div>
            </div>
          </form>
        </div>
       </div>
    )
}
export default SignupPage;