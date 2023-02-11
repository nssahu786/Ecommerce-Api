const mongoose = require('mongoose');

con = "mongodb+srv://nssahu786:sahu123@cluster0.0wogww0.mongodb.net/?retryWrites=true&w=majority"

const connectdb =()=>{
    //return mongoose.connect('mongodb://localhost:27017/api_database') 
    return mongoose.connect(con)
    .then(()=>{
        console.log("MONGO DB IS CONNECTED SUCCESSFULLY")
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports = connectdb