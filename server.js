var express = require('express');
var app = express();
var admin = require("firebase-admin");

var serviceAccount = require("./htbank.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://htbank-286bd.firebaseio.com"
});

let db = admin.firestore();
var size1 = 0;
var size2 = 0;
var size3 = 0;
var size4 = 0;

app.get("/getQueue",(req,res)=>{
    var type = req.query.type;
    let size;
    if(type == 'ฝากเงิน/ถอนเงิน'){
        size1++;
        size = size1;
    }else if(type == 'โอนเงิน'){
        size2++;
        size = size2;
    }else if(type == 'เปิดบัญชีใหม่'){
        size3++
        size= size3;
    }else{
        size4++
        size = size4;
    }
    console.log("Request received");
    console.log(size);
    console.log(Date.now());
    console.log(type);
    db.collection("trans").add({
        "date":Date.now(),
        "type":type,
        "id":size.toString()
    });
    res.send("id : 1");
});

app.listen(8300,(req,res)=>{
    console.log("Server is running at port 8300");
});