import React from "react";
import { useState } from "react";
import Dbdata from "./Dbdata";
import Form from "./Form";
function Inventory(){
    const [text,setText]=useState("")
    const [quantity,setQuantity]=useState(0)
    const [image,setImage]=useState(null)
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(text,image,quantity)
    }
    return (
        <>
      
       <Dbdata/>
       
        </>
    )
}
export default Inventory;