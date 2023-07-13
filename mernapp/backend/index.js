const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const router = require('./routes/Auth')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// global.foodData = require('./db')(function call(err, food_item,foodCategory) {
     
//     if(err) console.log(err);
//     global.foodData = food_item;
//     global.foodCategory = foodCategory;
 
//   })
mongoose.connect('mongodb+srv://nikundare111:Nikhil@cluster0.qmkdjbw.mongodb.net/goFoodMern?retryWrites=true&w=majority')
.then(async(response) => {
    console.log("connected to mongod DB successfully!");
    const fetched_data=mongoose.connection.db.collection("food_item");
    const data = await fetched_data.find({}).toArray();
     global.food_item = data;
     const fetched1_data=mongoose.connection.db.collection("foodCategory");
    const data1 = await fetched1_data.find({}).toArray();
     global.foodCategory = data1;
       
    // callback(data1,data)
})
.catch(err => {
    console.log("connection to DB failed", err);
})


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}...`)
})