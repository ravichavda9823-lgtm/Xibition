let {MongoClient} = require("mongodb");

require("dotenv").config();
 let URL = process.env.URL;

 let connectDb = async() =>{
    try{
        let client  = await MongoClient.connect(URL);
        let db = client.db("Artxibition");
        console.log("DB Created");
        if(db){
            return db;
        }
    }catch(e){
        console.log(e);
    }
 }

 module.exports = {connectDb};