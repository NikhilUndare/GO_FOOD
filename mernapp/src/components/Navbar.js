import React,{useState} from "react"

import { Link,useNavigate } from "react-router-dom"
import { useCart} from "./ContextReducer";
import Badge from "react-bootstrap/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from "../Modal";
import Cart from "../screens/Cart";
export default function Navbar() {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
     const navigate = useNavigate();
    const  handlelogOut = () =>{
      localStorage.removeItem("authToken");
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFooD</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link   fs-4" aria-current="page" to="/">Home</Link>
                            </li>
                            
                            {(localStorage.getItem("authToken"))?
                             <li className="nav-item">
                             {/* <Link className="nav-link   fs-4" aria-current="page" to="/">My Orders</Link> */}
                            </li>
                            :"" }
                        </ul>
                        {!(localStorage.getItem("authToken"))? 
                         <div className="d-flex">
                         <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                         <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                       </div>
                        : <div>
                           <div className="btn  mx-1" onClick={()=>{setCartView(true)}}>
                              
                              <Badge   >
                                <ShoppingCartIcon>
                                   
                                </ShoppingCartIcon>
                                {data.length === 0 ? "" : data.length}  
                              </Badge>
                           </div>

                         {cartView? <Modal onClose={()=> {setCartView(false)}}> 
                             <Cart/>
                         </Modal> : ""}  
                           <div className="btn bg-white text-danger mx-1" onClick={handlelogOut}>
                              LogOut
                           </div>

                         </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}