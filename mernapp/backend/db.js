// const mongoose = require('mongoose')


// module.exports = function (callback) {
//     mongoose.connect('mongodb+srv://nikundare111:Nikhil@cluster0.qmkdjbw.mongodb.net/goFoodMern?retryWrites=true&w=majority')
//     .then(async(response) => {
//         console.log("connected to mongod DB successfully!");
//         const fetched_data=mongoose.connection.db.collection("food_item");
//         const data = await fetched_data.find({}).toArray();
//          global.food_item = data;
//          const fetched1_data=mongoose.connection.db.collection("foodCategory");
//         const data1 = await fetched1_data.find({}).toArray();
//          global.foodCategory = data1;
         
       
//         // callback(data1,data)
//     })
//     .catch(err => {
//         console.log("connection to DB failed", err);
//     })
// };