require("dotenv").config();
const Restrooms = require("../models/restrooms");
const mongoose = require("mongoose")

exports.restrooms = async (req, res) => {
    console.log('getting markers 2');
    try {
        // mongoose.connect(process.env.DATABASE, (err, db) => {
        //     if (err) throw err;
        //     // let dbo = db.db("test");
            

        // })
        Restrooms.find({}, (err, restrooms) => {
            var restroomArr = [];
            restrooms.forEach((restroom) => {
                restroomArr.push(restroom)
            })

            res.send(restroomArr)
        })
    } catch (error) {
        
    }
}