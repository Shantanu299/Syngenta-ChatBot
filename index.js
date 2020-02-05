const express = require('express')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app = express()
port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}));



app.get("/", (request, response) => {
    console.log("Working Fine...");
    response.status(200).send("Hello World");
});
app.post("/webhook", function (request, response) {

    let action = request.body.queryResult.action;

    console.log('Inside Main function2');
    console.log(action);
    response.setHeader('Content-Type', 'application/json');

    if (action == 'WhatItIs') {
        const parameters = request.body.queryResult.parameters;
        var disease = parameters['disease'];
        console.log("DISEASE NAME: ", disease);
        var resp = getInfo(disease, response);

    } else if (action == 'productName') {
        const parameters = request.body.queryResult.parameters;
        var disease = parameters['disease'];
        console.log("DISEASE NAME: ", disease);
        var resp = getProduct(disease, response);

    } else if (action == 'productDosage') {
        const parameters = request.body.queryResult.parameters;
        var disease = parameters['disease'];
        console.log("DISEASE NAME: ", disease);
        var resp = getDosage(disease, response);

    } else if (action == 'WhyItOccurs') {
        const parameters = request.body.queryResult.parameters;
        var disease = parameters['disease'];
        console.log("Disease NAME: ", disease);
        var resp = getDiseaseCause(disease, response);
    } else {
        console.log('Inside input function');
        response.send(buildChatResponse("I'm sorry, I don't know this"));
    }

});

function getInfo(disease, CloudFnResponse) {
    let r = ''
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("chatbotDB");
        dbo.collection("disease").findOne({
            "ThreatName": disease
        }, function (err, result) {
            if (err) throw err;
            try {
                console.log("Result.WhatItIs: ", result.WhatItIs);
                r = result.WhatItIs;
                db.close();
                console.log("Inside Function Return Res: ", r);
                CloudFnResponse.send(buildChatResponse(r));
            } catch (error) {
                console.log(error);
            }

        });

    });
}



function getProduct(disease, CloudFnResponse) {
    let r = ''
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("chatbotDB");
        dbo.collection("disease").findOne({
            "ThreatName": disease
        }, function (err, result) {
            if (err) throw err;
            try {
                console.log("Result.WhatItIs: ", result.ProductName);
                r = result.ProductName;
                db.close();
                console.log("Inside Function Return Res: ", r);
                CloudFnResponse.send(buildChatResponse(r));
            } catch (error) {
                console.log(error);
            }

        });

    });
}

function getDosage(disease, CloudFnResponse) {
    let r = ''
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("chatbotDB");
        dbo.collection("disease").findOne({
            "ThreatName": disease
        }, function (err, result) {
            if (err) throw err;
            try {
                console.log("Result.WhatItIs: ", result.Dosage);
                r = result.Dosage;
                db.close();
                console.log("Inside Function Return Res: ", r);
                CloudFnResponse.send(buildChatResponse(r));
            } catch (error) {
                console.log(error);
            }

        });

    });
}


function getDiseaseCause(diseaseName, CloudFnResponse) {
    let r = ''
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        dbo = db.db("chatbotDB");
        dbo.collection("disease").findOne({
            "ThreatName": diseaseName
        }, function (err, result) {
            if (err) throw err;
            try {
                console.log("Result.WhyItOccurs: ", result.WhyItOccurs);
                r = result.WhyItOccurs;
                db.close();
                console.log("Inside Function Return Res: ", r);
                CloudFnResponse.send(buildChatResponse(r));
            } catch (error) {
                console.log(error);
            }

        });

    });
}

function buildChatResponse(chat) {
    return JSON.stringify({
        "fulfillmentText": chat
    });
}