const { response } = require('express');
const Garden = require('../models/gardenModel')
const User = require('../models/userModel')
const Plant = require('../models/plantModel');
const Photo = require('../models/photoModel');

const { deletePlant } = require('./plantService');
 

// create a garden and save ref to user gardens array
const createGarden = async(name,direction,directSun,surrounding,userID)=>{
    console.log("controller"+surrounding)
     const garden= new Garden({
    name:name,
    direction:direction,
    directSun:directSun,
    surrounding:surrounding,
    userID:userID,
    plants:[]
    }); 
    User.findById(userID,(err,user)=>{
        if(user)
            user.gardens.push(garden)
    })
    return await garden.save();
};

  
const getGardensByUserId = async(userID)=>{
    console.log("SESRVICE getGardensByUserId"); 
       return await Garden.find({userID:userID}); 
};
 const getGardenById = async(id)=>{return await Garden.findById(id)};

 const editGarden = async(id,name=null,direction=null,surrounding=null,directSun=null)=>{
    Garden.findById(id,(err,garden)=>{
        if (name!=null){
            garden.name = name;     }
         if (direction!=null){
            garden.direction = direction;}
         if (surrounding!=null){
            garden.surrounding = surrounding;}
        if (directSun!=null){
            garden.directSun = directSun;}
            garden.save();
    
    });
   
     return true };

const getAllGardens = async()=>{return await Garden.find({})
};



const deleteGarden = async(gardenID,userID)=>{
    const garden = await getGardenById(gardenID);
    if (garden.plants.length>0)
    {
        for (let i=0; i<garden.plants.length ; i++)
        {
            deletePlant(garden.plants[i]); 
        }
    }
    //deleting garden ref from user 
  
   User.findById(userID,(err,user)=>{
       var removeIndex;
       if(user.gardens.length){
            for(let i=0;i<user.gardens.length;i++)
                if(user.gardens[i]==gardenID)
                    removeIndex=i
            user.gardens.splice(removeIndex,1)
            user.save()    
       }
   })

     await garden.remove(); 
    return true;
};

module.exports={
createGarden,
getAllGardens,
deleteGarden,
getGardenById,
getGardensByUserId,
editGarden
};