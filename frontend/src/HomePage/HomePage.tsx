import UserImg from "../assets/user.png";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function HomePage(){
   const navigate = useNavigate();
  return(
  <div className="bg-dark vh-100">
      <nav className="navbar bg-primary">
        <div className="container">
            <a className="navbar-brand text-light fw-bold" href="#">ToDo List</a>
            <div className="d-flex gap-4">
               <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><img src={UserImg} alt="profile" className="bg-light rounded-5 p-1"/></a>
            </div>
        </div>
      </nav>
      <div id="liveAlertPlaceholder"></div>
       <button type="button" className="btn btn-primary" id="liveAlertBtn">Show live alert</button>
      <div className="container d-flex justify-content-between gap-4 my-5 flex-lg-row flex-column">
        <div className="offcanvas offcanvas-end w-25 h-50 rounded-2" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header border-bottom">
               <h5 className="offcanvas-title" id="offcanvasExampleLabel">Profile</h5>
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body text-center">
               <p className="fw-bold">Name</p>
               <button className="btn btn-danger" onClick={() => {navigate('/')}}>Log Out</button>
            </div>
         </div>
         <div className="col-lg-5 col-12 bg-light bg-opacity-10 p-2 rounded-3 border-bottom" style={{maxHeight:'250px'}}>
           <div className="mb-3 d-flex flex-column mx-lg-0 mx-2">
            <label htmlFor="exampleFormControlInput1" className="form-label text-light fw-bold fs-5">Title:</label>
            <input type="text" className="form-control " id="exampleFormControlInput1" placeholder="What's the title of your To Do..."/>
           </div>
           <div className="mb-3 d-flex flex-column mx-lg-0 mx-2">
            <label htmlFor="exampleFormControlInput2" className="form-label text-light fw-bold fs-5">Description:</label>
            <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="What's the description of your To Do..."/>
           </div>
           <button type="button" className="btn btn-primary mx-lg-0 mx-2 mb-2">Add</button>
         </div>
         <div className="col-lg-7 bg-secondary bg-opacity-25 rounded-3">
            <div className="my-2">
                <div className="d-flex gap-2 mx-2 border-bottom pb-1 rounded-0 justify-content-evenly">
                  <a href="#" className="text-decoration-none text-light px-5">On going</a>
                  <span className="border-start"></span>
                  <a href="#" className="text-decoration-none text-light px-5">Completed</a>
                </div>
                <div className="overflow-auto" style={{ maxHeight: '450px'}}>
                 {/* ToDo List*/}
                  <div className="bg-light bg-opacity-25 my-2 mx-2 px-3 pt-2 rounded-1 text-light d-flex justify-content-between align-items-center shadow-lg">
                     <div>
                        <p className="fw-bold">Title: Workout</p>
                        <p>Desc: This is the description</p>
                     </div>
                     <div className="d-flex gap-3">
                        <button className="btn btn-success"><IoMdCheckmark className="fs-5" /></button>
                        <button className="btn btn-danger"><MdDeleteOutline className="fs-5" /></button>
                     </div>
                  </div>
                  
      
                </div>
            </div>
         </div>
      </div>
  </div>
 )
}
export default HomePage;