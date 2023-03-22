const mongoClient = require("mongodb").MongoClient;
const dotenv = require('dotenv').config();
const {fetch,parseData} = require('./scrapper')
const url = process.env.DB_URL;
const client = new mongoClient(url);
const dbName = "FlipkartScrap";

client
  .connect()
  .then(() => console.log(" connected to database"))
  .catch((e) => console.error("can not connect to database"));
const db = client.db(dbName);

const collection = db.collection("Products");

async function scrapper(pageNo){
  if(pageNo===0)
  return "work completed";

  const flipkartData = await fetch(
      `https://www.flipkart.com/search?q=mobile&page=${pageNo}`
  ).catch((error)=>console.log("can not fetch data"));


  const result = parseData(flipkartData);

      if(!result) console.log("can not get data");
      else{
          console.log("saving data in db");
          result.map(async (result)=>{

              try{
                  await collection.insertOne(result);
                  console.log("data saved")
              } catch(error){
                  console.error("can not save data");
              }
          }) 
      }
      return scrapper(pageNo - 1);
}
scrapper(40);