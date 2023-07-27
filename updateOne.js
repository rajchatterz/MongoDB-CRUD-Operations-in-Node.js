



const {MongoClient,ObjectId} = require('mongodb')
require('dotenv').config()
const url = process.env.MONGO_URL
const safeUrl = `${url.slice(0,14)}****${url.slice(30,31)}****${url.slice(47)}`
const client = new MongoClient(url)
const dbname = "bank"
const collection_name = "accounts"
const collectionName = client.db(dbname).collection(collection_name)

const dbconnection = async()=>{
    try {
        await client.connect()
        console.log(`sever is successfully connected with the ${safeUrl}`)
    } catch (error) {
        console.error(`find a error while connecting with the database ${error}`);
    }
}
const updateFilter = { _id:  ObjectId("64c2889ce89330965e131d10") }

const documentToUpdate = {balance:{$inc:10000000}}
const main = async()=>{
    try {
        await dbconnection()
        const result = collectionName.updateOne(updateFilter,documentToUpdate)
        (await result).modifiedCount>0?console.log(`update`):console.log("not update")
        console.log(`Found ${await docCount} documents`)
    } catch (error) {
        console.error(`error finding dicument ${error}`);
    }finally{
        await client.close()
    }
}
main()