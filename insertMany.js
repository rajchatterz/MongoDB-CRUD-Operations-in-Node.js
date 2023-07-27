const {MongoClient} = require('mongodb')
require('dotenv').config()
const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbname = "bank"
const collection_name = "accounts"
const safeURI = `${url.slice(0, 14)}****${url.slice(30, 31)}****${url.slice(47)}`
const accountCollection = client.db(dbname).collection(collection_name)

const dbconnection = async ()=>{
    try {
        await client.connect()
        console.log(`connected to the ${dbname} with the url name${safeURI}`)
    } catch (error) {
        console.error('error fetching while connecting to the database',error);
    }
}
const sampleAccount = [
    {
        account_id:"727217272",
        account_holder:"JOsh malon",
        account_type:"current",
        balance:7477474,
        last_seen:new Date()
    },
    {
        account_id:"y263833",
        account_holder:"eva melon",
        account_type:"business",
        balance:8377388,
        last_seen:new Date()
    }
]

const main = async()=>{
    try {
        await dbconnection()
        let result = await accountCollection.insertMany(sampleAccount)
        console.log(`inserted document ${result.account_id}`)
    } catch (error) {
        console.log(`error while inserting the document ${error}`)
    }
    finally{
        await client.close()
    }
}
main()