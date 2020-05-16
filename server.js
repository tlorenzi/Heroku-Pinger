const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
var tcpp = require('tcp-ping');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded())
var port = process.env.PORT || 3000;

app.listen(port, console.log("listing on port {port}"));  // process.enc || 4000

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/add", (req, res) => {

    let address = req.body.address;

    const url =
        "MY-Connection-String";

    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to db");
            res.redirect('/');
            return;
        }
        console.log("Connected successfully to db");

        let collection = client.db("data").collection("addresses");

        collection.findOne({ data: "yes" })
            .then(res => {
                let addressArr = res.list;
                addressArr.push(address);
                let newData = { "data": "yes", "list": addressArr };

                collection.update({ data: "yes" }, newData, function (err, res) {
                    if (!err) console.log("updated data successfully");
                });
            })
            .catch(err => console.log(err));

    });
    res.redirect('/');
});

function pinger() {

    const url =
        "mongodb+srv://tyler:bakersfield@cluster0-u94vc.mongodb.net/test?retryWrites=true&w=majority";

    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("error connecting to db");
            res.redirect('/');
            return;
        }
        console.log("Connected successfully to db in the method to retrieve addresses");

        let collection = client.db("data").collection("addresses");

        collection.findOne({ data: "yes" })
            .then(res => {

                for (let i = 0; i < res.list.length; i++) {
                    let address = res.list[i];

                    tcpp.ping({ address: address, port: 80 }, function (err, data) {
                        if (err) console.log("error: ", err);

                        console.log(data);
                    });
                }
            })
            .catch(err => console.log(err));
    })
}


setInterval(() => pinger(), 3600000);
