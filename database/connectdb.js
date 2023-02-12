const mongoose = require('mongoose');

connect = "mongodb+srv://sourav:789@cluster0.rwjxkeh.mongodb.net/?retryWrites=true&w=majority"
const connectdb =()=>{
    //return mongoose.connect('mongodb://localhost:27017/api_database') 
    return mongoose.connect(connect)
    .then(()=>{
        console.log("MONGO DB IS CONNECTED SUCCESSFULLY")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectdb
