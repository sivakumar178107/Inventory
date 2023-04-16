import React,{useState} from "react";
import { Navigate, useNavigate } from "react-router";
function Login(){
    const navigate = useNavigate();
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isAccount,setIsAccount]=useState(true)
    const [userDetails,setUserDetails]=useState()
    // const handleSignUp=async(e)=>{
    //     e.preventDefault()
    //     const formData=new FormData();
    //     formData.append('userName',userName)
    //     formData.append('userEmail',email)
    //     formData.append('userPassword',password)
    //     console.log(formData,userName,email,password)
    //     const res = await fetch('http://localhost:3001/api/users',{
    //         method:"POST",
    //         body:formData
    //     })
    //     if(res.ok){
    //     console.log("user created successfully")
    //     }
    //     else{
    //         console.log({"error":res.status})
    //     }
    // }
    const handleSignUp = async (e) => {
        e.preventDefault();
        const data = {
          userName: userName,
          userEmail: email,
          userPassword: password,
        };
        const res = await fetch("http://localhost:3001/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          console.log("user created successfully");
        } else {
          console.log({ error: res.status });
        }
      };      
      const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3001/api/users/${userName}/${password}`, {
          method: "GET",
        });
        if (res.ok) {
          console.log("user logged in successfully", res);
          const data = await res.json();
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userDetails", JSON.stringify(data.item));
          console.log(localStorage)
        } else {
          console.log({ error: res.status });
        }
        navigate("/user");
      };
      
    const handleInputChange=(e)=>{
        if(e.target.name=="username"){
            setUserName(e.target.value)
        }
        if(e.target.name=="email"){
            setEmail(e.target.value)
        }
        if(e.target.name=="password"){
            setPassword(e.target.value)
        }
    }
    
    return(
        <>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",padding:"50px 0px",gap:"20px"}}>
          {isAccount?<form onSubmit={handleLogin}>
            <label> User Name
                <input type="text" name="username" placeholder="enter user name" onChange={handleInputChange}/>
            </label>
            <label> Password
                <input type="password" name="password" placeholder="enter password" onChange={handleInputChange}/>
            </label>
            <button type="submit">Login</button>
            <h5 style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>setIsAccount(false)}>Not a member click here to sign up</h5>
            </form>:<form onSubmit={handleSignUp}>
            <label> User Name
                <input type="text" name="username" placeholder="enter user name" onChange={handleInputChange}/>
            </label>
            <label> Email
                <input type="email" name="email" placeholder="enter email" onChange={handleInputChange}/>
            </label>
            
            <label> Password
                <input type="password" name="password" placeholder="enter password" onChange={handleInputChange}/>
            </label>
            <button type="submit">Sign Up</button>
            <h5 style={{cursor:"pointer",textDecoration:"underline"}} onClick={()=>setIsAccount(true)}>Already a member click here to log in</h5>
            </form>} 

        </div>
        </>
    )
}
export default Login;