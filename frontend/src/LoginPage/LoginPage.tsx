import { useNavigate,Link } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
    return(
       <div className="container-fluid vh-100 bg-1 style-font">
        <div className="pt-5 ms-lg-5 d-flex justify-content-evenly flex-lg-row flex-column">
         <form className="col-lg-5 col-12 bg-light pb-5 bg-opacity-10 rounded-5 mt-3 shadow-lg">
            <p className="fs-1 text-center text-light py-5">Login</p>
            <div className="mb-5 mx-lg-5 mx-4">
                <div className="form-floating mb-3">
                 <input type="email" className="form-control border-0" id="floatingInput" placeholder="name@example.com" required/>
                 <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                 <input type="password" className="form-control border-0" id="floatingPassword" placeholder="Password"/>
                 <label htmlFor="floatingPassword">Password</label>
                </div>
                <p className="text-light float-end me-2 mt-1">Create an account? <Link to={'/signup'} className="text-decoration-none">Sign Up</Link></p>
                <div className="my-5 text-center">
                <button type="submit" className="btn btn-primary rounded-pill px-5" onClick={() => {navigate('/home')}}>Login</button>
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