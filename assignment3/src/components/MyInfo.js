import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import "./MyInfo.css"
import image from "../assets/hemanth.jpg";
import Thirdapidata from "./Displaydata";
function MyInfo(){
    const [about,setAbout]=useState("I'm Hemanth");
    const [name,setName]=useState("Hemanth Kumar Gara");
    const [first,setFirst]=useState(0);
    const [second,setSecond]=useState(0);
    const [final,setFinal]=useState(0)
    const [result, setResult] = useState(null);
    const handleClick = async () => {
        const response = await fetch('http://localhost:3001/api/add/${first}/${second}', {
            mode: 'no-cors'
          });
        const data = await response.json();
        setResult(data.result);
      };
    
    const handleSubmit=()=>{
         
         final=parseInt(first)+parseInt(second)
        setFinal(final)  
      }
    return(<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"10px",width:"100%",flexDirection:"column"}}>
        
        <div style={{display:"flex",justifyContent:"space-between",boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',alignItems:"flex-start",minWidth:"94%",gap:"5px",flexDirection:"row",margin:'20px',padding:"20px",background:"rgb(173 110 118 / 96%)",color:"white"}}>
            <img src={image} style={{maxWidth:"200px",maxHeight:"200px"}}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"5px",flexDirection:"column",padding:"10px",}}>
            <h2>{name}</h2>
            <p>{about}</p>
            </div>
            
        </div>
        
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"5px",flexDirection:"column",padding:"10px",border:"green 2px solid",margin:"20px",width:"62%"}}>
            <h2>Edit My Info</h2>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"5px",flexDirection:"column",padding:"10px"}}>
    <h5 style={{color:"green"}}>Enter Your Name</h5>
    <input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"5px",flexDirection:"column",padding:"10px"}}>
<h5 style={{color:"green"}}>Enter Something about you</h5>
<input placeholder="description" value={about} onChange={(e)=>setAbout(e.target.value)}/>
    </div> 
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"60%",gap:"10px",flexDirection:"column",padding:"20px",border:"2px solid green",margin:"20px"}}>
            <h2>Add Two Numbers</h2>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"10px",flexDirection:"column",padding:"10px"}}>
    <label style={{color:"green"}}>Enter First Number</label>
    <input onChange={(e)=>setFirst(e.target.value)}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"10px",flexDirection:"column",padding:"10px"}}>
<label style={{color:"green"}}>Enter Second Number</label>
    <input onChange={(e)=>{setSecond(e.target.value);handleSubmit()}}/>
</div>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",width:"100%",gap:"10px",flexDirection:"column",padding:"10px"}}>
    <button className="submit-button" onClick={handleClick}>Submit</button>
<h3>Result from frontend is: <b>{parseInt(first)+parseInt(second)}</b></h3>
<h3>Result from Backend is: <b>{result}</b></h3>
</div >
        </div>
    </div>
    {/* <Thirdapidata/> */}
    </>);
}
export default MyInfo;