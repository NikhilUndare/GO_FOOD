import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";


export default function Login() {
    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate('/')
        }
        if (!json.success) {
            alert("Enter valid credentials ")
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar/>
            </div>
            <div className="container">
                <form className='w-50 m-auto mt-5 border bg-dark border-white rounded ' style={{ padding: "15px" }} onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>


                    <button type="submit" className=" m-3 btn btn-success">Login</button>
                    <Link to="/createuser" className="m-3 btn btn-info"> I'm new User</Link>
                </form>

            </div>
        </div>
    )
}