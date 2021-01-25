const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const plantSchema=new Schema({
species:String,
status:String,
irrigationInstructors:String, // celsius
optimalTemp:Number, // %
optimalSoilMoisture:Number,
optimalSunExposure:Number,
description:String,
sensorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"sensors"
},
photos:[
    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"photos"
        }
    
],  
GardenID:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"gardens"
}


})

module.exports=mongoose.model('plants',plantSchema);