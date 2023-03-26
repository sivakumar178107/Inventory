import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Form from './Form';
function Dbdata() {
 let updateform=false;
  const [items, setItems] = useState([]);
  const [updateID,setupdateID]=useState();
  const [updateName,setupdateName]=useState();
  const [updateQuantity,setupdateQuantity]=useState();
  const [updateImage,setupdateImage]=useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
      console.log("hey",items)
      if(items.length==0){
        alert("Inventory is empty")
      }
  }, []);
// Update an item by id
const handleInputChange = (event) => {
    if (event.target.name === 'itemName') {
      setupdateName(event.target.value);
    } else if (event.target.name === 'itemQuantity') {
      setupdateQuantity(event.target.value);
    } 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:3001/api/items/${updateID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: updateName,
        quantity: updateQuantity,
      }),
    });

    if (response.ok) {
      console.log('Item updated successfully');
    } else {
      console.error('Error updating item:', response.status);
    }
  }
//   const handleSubmit = async (event) => {
//     event.preventDefault();
    
//      // Replace with the id of the item to update
// const updatedItem = {
//   itemName: updateName,
//   itemQuantity: updateQuantity,
//   itemImage:updateImage?updateImage:null // File object for the updated item image, or null to keep the existing image
// };
// updateItem(updateID,updatedItem)
   
//   };

  
  
  return (
    <div style={{padding:"20px 0px",gap:"20px",display:"flex",flexDirection:'column'}}>
      <div style={{display:"flex",flexDirection:"row",justifyContent:'center',gap:"50px"}}>
       <Form/>
        <div>
            
            <form onSubmit={handleSubmit}>
            <h3>Update Item</h3>
      <label>
        Item Name:
        <input type="text" name="itemName" value={updateName} onChange={handleInputChange} />
      </label>
      <label>
        Item Quantity:
        <input type="number" name="itemQuantity" value={updateQuantity} onChange={handleInputChange} />
      </label>
      <button type="submit">Update Item</button>
    </form>
    </div>
    </div>
        <div>
      
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Quantity</th>
            <th>Item Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.itemName}</td>
              <td>{item.itemQuantity}</td>
              <td>
              <img src={item.itemImage} alt={item.itemName} width="100" />
              </td>
              <td><button onClick={()=>{updateform=!updateform;setupdateID(item._id);setupdateName(item.itemName);setupdateQuantity(item.itemQuantity);console.log(updateform)}}>
                <FontAwesomeIcon icon={faPen}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Dbdata;
