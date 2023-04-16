// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const AWS = require('aws-sdk');


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const { ObjectId } = require('mongodb');

require('dotenv').config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({ dest: 'uploads/' }); 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const itemSchema = new mongoose.Schema({
  itemName: String,
  itemQuantity: Number,
  itemImage: String
});
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPassword: { type: String, required: true }
});

const User=mongoose.model('User',userSchema);
const Item = mongoose.model('Item', itemSchema);
mongoose.connect('mongodb://52.202.201.124:27017/mydatabase', { //Change this line to the MongoDB Docker container URL
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/api/add/:a/:b', (req, res) => {
    const a = parseInt(req.params.a, 10);
    const b = parseInt(req.params.b, 10);
    const result = a + b;
    res.send({ result });
});

app.post('/api/items', upload.single('itemImage'), async (req, res) => {
  const { itemName, itemQuantity } = req.body;
  const fileContent = fs.readFileSync(req.file.path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${req.file.originalname}`,
    Body: fileContent,
    ACL: 'public-read'
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
   
    const item = new Item({
      itemName,
      itemQuantity,
      itemImage: data.Location
    });
    console.log(item)
    try {
      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().select('itemName itemQuantity itemImage');
    res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update an item in the database by id
// Update an item in the database by id
// app.delete('/api/items/:id', async (req, res) => {
//   const itemId = req.params.id;
//   try {
//     const itemToDelete = await Item.findByIdAndDelete(itemId);
//     if (!itemToDelete) {
//       return res.status(404).send({ error: 'Item not found' });
//     }
//     const s3Params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${itemToDelete.itemImage.split('/').pop()}`
//     };
//     console.log(`uploads/${itemToDelete.itemImage.split('/').pop()}`)
//     // await s3.deleteObject(s3Params).promise();
//     await itemToDelete.remove();
//     res.send({ message: 'Item deleted successfully' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send(err);
//   }
// });
app.delete('/api/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const itemToDelete = await Item.findByIdAndDelete(itemId);
    if (!itemToDelete) {
      return res.status(404).send({ error: 'Item not found' });
    }
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${itemToDelete.itemImage.split('/').pop()}`
    };
    console.log(`uploads/${itemToDelete.itemImage.split('/').pop()}`)
    // await s3.deleteObject(s3Params).promise();
    res.send({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});


app.put('/api/items/:id', async (req, res) => {
  
  const itemId = new ObjectId(req.params.id.toString());

  const { name, quantity } = req.body;

  try {
    const itemToUpdate = await Item.findOne({ _id: itemId });
   
    if (!itemToUpdate) {
      return res.status(404).json({ error: 'Item not found' });
    }

    
      itemToUpdate.itemName = name;
    

    
      itemToUpdate.itemQuantity = quantity;
   
    
    const updatedItem = await itemToUpdate.save();
    res.json(updatedItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});
app.get(`/api/users/:userName/:password`, async(req, res) => {
  const a = req.params.userName;
  const b = req.params.password;
  const itemToUpdate = await User.findOne({ userName: a,
    userPassword: b });
    if (!itemToUpdate) {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log(`itemToUpdate: ${itemToUpdate}`);
  
    return res.json({ message: 'account exists', item: itemToUpdate });
   
});
app.post('/api/users', async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  console.log(userName,userEmail,userPassword,"hey")
  const item = new User({
    userName,
    userEmail,
    userPassword,
  });
  console.log(item);
  try {
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(500).send(err);
  }
});
