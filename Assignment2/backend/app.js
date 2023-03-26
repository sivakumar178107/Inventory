// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const AWS = require('aws-sdk');

 
// require('dotenv').config();
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const upload = multer({ dest: 'uploads/' }); 
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const itemSchema = new mongoose.Schema({
//   itemName: String,
//   itemQuantity: Number,
//   itemImage: String
// });
// const Item = mongoose.model('Item', itemSchema);
// mongoose.connect('mongodb+srv://Hemanthgara:Hemanthg123@cluster0.bhsdppf.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });



// app.get('/api', (req, res) => {
//   res.send({ message: 'Hello from the server!' });
// });

// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// app.get('/api/add/:a/:b', (req, res) => {
//     const a = parseInt(req.params.a, 10);
//     const b = parseInt(req.params.b, 10);
//     const result = a + b;
  
//     res.send({ result });
//   });
//   // app.post('/api/items', async (req, res) => {
//   //   const { itemName, itemQuantity, itemImage } = req.body;
//   //   const item = new Item({ itemName, itemQuantity, itemImage });
//   //   try {
//   //     await item.save();
//   //     res.send(item);
//   //   } catch (err) {
//   //     res.status(500).send(err);
//   //   }
//   // });
//   // app.route('/api/items')
//   // .get(async (req, res) => {
//   //   try {
//   //     const items = await Item.find().select('itemName itemQuantity itemImage');
//   //     res.send(items);
//   //   } catch (err) {
//   //     res.status(500).send(err);
//   //   }
//   // })
//   // .post(async (req, res) => {
//   //   const { itemName, itemQuantity, itemImage } = req.body;
//   //   console.log(req.body.itemName)
//   // const item = new Item();
//   // item.itemName = itemName;
//   // item.itemQuantity = itemQuantity;
//   // item.itemImage = itemImage;
//   // console.log("hey",item.itemName)
//   // try {
//   //   await item.save();
//   //   res.send(item);
//   // } catch (err) {
//   //   res.status(500).send(err);
//   // }

//   // });
//   app.post('/api/items', upload.single('itemImage'), async (req, res) => {
//     const { itemName, itemQuantity } = req.body;
//   const fileContent = fs.readFileSync(req.file.path);

//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `uploads/${req.file.originalname}`,
//     Body: fileContent,
//     ACL: 'public-read'
//   };

//   s3.upload(params, async (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
   
//     const item = new Item({
//       itemName,
//       itemQuantity,
//       itemImage: data.Location
//     });

//     try {
//       await item.save();
//       res.send(item);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
//   });
//   app.get('/api/items', async (req, res) => {
//     try {
//       const items = await Item.find().select('itemName itemQuantity itemImage');
//       res.send(items);
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   });
  



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
const Item = mongoose.model('Item', itemSchema);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
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

app.put('/api/items/:id', async (req, res) => {
  
  const itemId = new ObjectId(req.params.id);

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
