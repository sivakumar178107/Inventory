import { useEffect, useState } from "react";
import React from "react";
import { Navigate,useNavigate } from "react-router";
function UserDetails(){
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleLogout=()=>{
        localStorage.setItem('isAuthenticated',false)
        localStorage.setItem('userDetails',{})
        
    navigate('/login')
        
        console.log(localStorage)
    }
    useEffect(()=>{
        if(localStorage.getItem('userDetails')){
            const details=JSON.parse(localStorage.getItem('userDetails'))
            setName(details["userName"])
            setEmail(details["userEmail"])
            setPassword(details["userPassword"])
        }
    })
    return(
        <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"20px 20px",flexDirection:"column",gap:"10px", boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",margin:"50px 0px"}}>
        <h3>User Name : {name}</h3>
        <h3>Email : {email}</h3>
        <h3>Password : {password}</h3>
        <button className="submit-button" onClick={handleLogout}>Logout</button>
        </div>
        </div>
        </>
    )
}
export default UserDetails;