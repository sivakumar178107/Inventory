import React, { useState } from 'react';

function Form() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemImage, setItemImage] = useState(null);

  const handleInputChange = (event) => {
    if (event.target.name === 'itemName') {
      setItemName(event.target.value);
    } else if (event.target.name === 'itemQuantity') {
      setItemQuantity(event.target.value);
    } else if (event.target.name === 'itemImage') {
      setItemImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemQuantity', itemQuantity);
    formData.append('itemImage', itemImage);

    const response = await fetch('http://localhost:3001/api/items', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Item created successfully');
    } else {
      console.error('Error creating item:', response.status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
                  <h3>Create Item</h3>
                  
      <label>
        Item Name:
        <input type="text" name="itemName" value={itemName} onChange={handleInputChange} />
      </label>
      <label>
        Item Quantity:
        <input type="number" name="itemQuantity" value={itemQuantity} onChange={handleInputChange} />
      </label>
      <label>
        Item Image:
        <input type="file" name="itemImage" onChange={handleInputChange} />
      </label>
      <button type="submit">Create Item</button>
    </form>
  );
}

export default Form;
