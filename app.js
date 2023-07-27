const {MongoClient} = require('mongodb')
require('dotenv').config()
const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbname = "bank"
const collection_name = "accounts"

const accountCollection = client.db(dbname).collection(collection_name)

const dbconnection = async ()=>{
    try {
        await client.connect()
        console.log(`connected to the ${dbname} with the url name`)
    } catch (error) {
        console.error('error fetching while connecting to the database',error);
    }
}
const sampleAccount = {
    account_holder:"Raj Chatterjee",
    account_id:"0000001",
    account_type:"Saving",
    balance:456000,
    last_update:new Date()
}

const main = async()=>{
    try {
        await dbconnection()
        let result = await accountCollection.insertOne(sampleAccount)
        console.log(`inserted document ${result.account_id}`)
    } catch (error) {
        console.log(`error while inserting the document ${error}`)
    }
    finally{
        await client.close()
    }
}
main()