const {
    MongoClient,
    ObjectId
} = require('mongodb')


const connectionUrl = 'mongodb://localhost:27017'

const dbName = 'chatbotDB'



let db



const init = () =>

    MongoClient.connect(connectionUrl, {
        useNewUrlParser: true
    }).then((client) => {

        db = client.db(dbName)

    })



const insertItem = (item) => {

    const collection = db.collection('items')

    return collection.insertOne(item)

}



const getInfo = (disease) => {

    const collection = db.collection('disease').findOne({
        "ThreatName": disease
    }, function (err, result) {
        if (err) throw err;
        console.log("Result.WhatItIs: ", result.WhatItIs);
        r = result.WhatItIs;
        //db.close();
        console.log("Inside Function Return Res: ", r);
    });
    return collection

}



// const updateQuantity = (id, quantity) => {

//     const collection = db.collection('items')

//     return collection.updateOne({
//         _id: ObjectId(id)
//     }, {
//         $inc: {
//             quantity
//         }
//     })

// }



module.exports = {
    init,
    getInfo
}