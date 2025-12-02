import UserImg from "../assets/user.png";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer, Button, Col, Row, Toast } from "react-bootstrap";
import axios from "axios";

function HomePage(){
   type Todo = {
      id: any;
      title: string;
      content: string;  
      state: boolean;
      time: string;
      _id: string;
    };
    
   const navigate = useNavigate();
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "https://todo-list-lfx4.onrender.com";
   const [showAdd, setShowAdd] = useState<boolean>(false);
   const [showCpt, setShowCpt] = useState<boolean>(false);
   const [showDel, setShowDel] = useState<boolean>(false);
   const [markTlt, setMarkTlt] = useState<String>('');
   const [delTlt, setDelTlt] = useState<String>('');
   const [addTlt, setAddTlt] = useState<String>('');

   const [title, setTitle] = useState('');
   const [data, setData] = useState('');
   const [name, setName] = useState('');
   const [id, setId] = useState('');
   const [details, setDetails] = useState<Todo[]>([]);
   const [showComp, setShowComp] = useState<Todo[]>([]);

   /* Log out */
   function handleLogout(){
      axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true })
      .then( res => {
         console.log(res)
         setName('')
         navigate('/')
      })
      .catch(err => console.log(err));
   }
   /* User id */
   useEffect(() => {
   axios.get(`${SERVER_URL}/profile`, { withCredentials: true })
    .then(res => {
      setName(res.data.name);
      setId(res.data.id);
    })
    .catch(err => console.log(err));
}, []);

  /*handling add ToDo list */
   function handleAdd(){
      axios.post(`${SERVER_URL}/upload`, {title, data, id})
      .then(res => {console.log(res)
         setShowAdd(true);
         setTitle('');
         setData('');
         setAddTlt(title);
         fetchOngoing();
      })
      .catch(err => {console.log(err)
        console.log(data);
      })
   }
      const fetchOngoing = () => {
      axios.get(`${SERVER_URL}/ongoing`, { withCredentials: true })
         .then(res => setDetails(res.data))
         .catch(err => console.log(err));
      };

      const fetchCompleted = () => {
      axios.get(`${SERVER_URL}/completed`, { withCredentials: true })
         .then(res => setShowComp(res.data))
         .catch(err => console.log(err));
      };
      useEffect(() => {
      fetchOngoing();
      fetchCompleted();
      }, []);
 
  function handleDelete(id: any, tlt: String){
   axios.delete(`${SERVER_URL}/deleteTodo`, {data: {id}})
   .then(res => {
     console.log(res)
     setShowDel(true)
     setDelTlt(tlt);
     fetchOngoing(); 
     fetchCompleted();
   })
   .catch(err => console.log(err));
 }

   function handleMark(id: any, tlt: String){
   axios.put(`${SERVER_URL}/finishTodo`, {id})
 .then(res => {
    setShowCpt(true)
    setMarkTlt(tlt);
    console.log(res)
    fetchOngoing();
    fetchCompleted();
 })
 .catch(err => console.log(err));
   }

  return(
  <div className="bg-dark vh-100">
      <nav className="navbar bg-primary">
        <div className="container">
            <a className="navbar-brand text-light fw-bold" href="#">ToDo List</a>
            <div className="d-flex gap-4">
               <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><img src={UserImg} alt="profile" className="bg-light rounded-5 p-1"/> <IoIosArrowDown className="text-light mt-2" /></a>
            </div>
        </div>
      </nav>

      <Row>
      <Col xs={6}>
      <ToastContainer  position="top-center">
        <Toast className="bg-success text-light"  onClose={() => setShowAdd(false)} show={showAdd} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Successfully Added!</strong>
          </Toast.Header>
          <Toast.Body>{addTlt}</Toast.Body>
         </Toast>
        </ToastContainer>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
      <ToastContainer  position="bottom-end">
        <Toast className="bg-success text-light"  onClose={() => setShowCpt(false)} show={showCpt} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Completed ToDo List!</strong>
          </Toast.Header>
          <Toast.Body>{markTlt}</Toast.Body>
         </Toast>
        </ToastContainer>
      </Col>
    </Row>
    <Row>
      <Col xs={6}>
      <ToastContainer  position="bottom-end">
        <Toast className="bg-danger text-light"  onClose={() => setShowDel(false)} show={showDel} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Deleted ToDo List!</strong>
          </Toast.Header>
          <Toast.Body>{delTlt}</Toast.Body>
         </Toast>
        </ToastContainer>
      </Col>
    </Row>
      <div className="container d-flex justify-content-between gap-4 my-5 flex-lg-row flex-column">
        <div className="offcanvas offcanvas-end rounded-2" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header border-bottom">
               <h5 className="offcanvas-title" id="offcanvasExampleLabel">Profile</h5>
               <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body text-center">
               <p className="fw-bold text-dark">{name}</p>
               <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
            </div>
         </div>
         <div className="col-lg-5 col-12 bg-secondary bg-opacity-25 p-2 rounded-3 border-bottom" style={{maxHeight:'250px'}}>
           <div className="mb-3 d-flex flex-column mx-lg-0 mx-2">
            <label htmlFor="exampleFormControlInput1" className="form-label text-light fw-bold fs-5">Title:</label>
            <input type="text" className="form-control " id="exampleFormControlInput1" placeholder="What's the title of your To Do..." value={title} onChange={(e) => setTitle(e.target.value)}/>
           </div>
           <div className="mb-3 d-flex flex-column mx-lg-0 mx-2">
            <label htmlFor="exampleFormControlInput2" className="form-label text-light fw-bold fs-5">Description:</label>
            <input type="text" className="form-control" id="exampleFormControlInput2" placeholder="What's the description of your To Do..." value={data} onChange={(e) => setData(e.target.value)}/>
           </div>
           <Col xs={6}>
               <Button className="mx-lg-0 mx-2 mb-2" onClick={handleAdd}>Add</Button>
           </Col>
         </div>
         <div className="col-lg-7 bg-secondary bg-opacity-25 rounded-3">
            <div className="my-2">

              <ul className="nav nav-pills mb-3 d-flex gap-2 mx-2 border-bottom pb-1 rounded-0 justify-content-evenly" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                     <button className="nav-link active px-5 text-light" id="pills-onGoing-tab" data-bs-toggle="pill" data-bs-target="#pills-onGoing" type="button" role="tab" aria-controls="pills-onGoing" aria-selected="true">On going</button>
                  </li>
                  <span className="border-start"></span>
                  <li className="nav-item" role="presentation">
                     <button className="nav-link px-5 text-light" id="pills-completed-tab" data-bs-toggle="pill" data-bs-target="#pills-completed" type="button" role="tab" aria-controls="pills-completed" aria-selected="false">Completed</button>
                  </li>
               </ul>

               <div className="tab-content text-light overflow-auto" id="pills-tabContent" style={{ maxHeight: '450px'}}>
               <div className="tab-pane fade show active" id="pills-onGoing" role="tabpanel" aria-labelledby="pills-onGoing-tab">
               {details.map((todo) => {
                  return(
                     <div className="bg-light bg-opacity-25 my-2 mx-2 px-3 pt-2 rounded-1 text-light d-flex justify-content-between align-items-center shadow-lg" key = {todo._id} >
                     <div>
                        <p className="fw-bold">Title: {todo.title}</p>
                        <p>Desc: {todo.content}</p>
                     </div>
                     <div className="d-flex gap-3">
                        <button className="btn btn-success" onClick={() => handleMark(todo._id, todo.title)}><IoMdCheckmark className="fs-5" /></button>
                        <button className="btn btn-danger" onClick={() => handleDelete(todo._id, todo.title)}><MdDeleteOutline className="fs-5" /></button>
                     </div>
                  </div>
                  )
               })}
               </div>

               <div className="tab-pane fade" id="pills-completed" role="tabpanel" aria-labelledby="pills-completed-tab">
              {/* Completed List */}
              {showComp.map((todo, index) => {
               return(
                  <div key={index} className="bg-light bg-opacity-25 my-2 mx-2 px-3 pt-2 rounded-1 text-light d-flex justify-content-between align-items-center shadow-lg">
                     <div>
                        <p className="fw-bold">Title: {todo.title}</p>
                        <p>Desc: {todo.content}</p>
                        <p>Date: {todo.time}</p>
                     </div>
                     <div className="d-flex gap-3">
                        <button className="btn btn-danger" onClick={() => handleDelete(todo._id, todo.title)}><MdDeleteOutline className="fs-5" /></button>
                     </div>
                  </div>
               )
              })}
               </div>
               </div>

            </div>
         </div>
      </div>
  </div>
 )
}
export default HomePage;
