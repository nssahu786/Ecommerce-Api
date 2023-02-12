const mongoose = require('mongoose');

connect = "mongodb://nishant123:sahu123@ac-afincus-shard-00-00.eih0fcq.mongodb.net:27017,ac-afincus-shard-00-01.eih0fcq.mongodb.net:27017,ac-afincus-shard-00-02.eih0fcq.mongodb.net:27017/?ssl=true&replicaSet=atlas-omm3dg-shard-0&authSource=admin&retryWrites=true&w=majority"

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