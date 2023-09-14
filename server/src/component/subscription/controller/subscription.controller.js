const {RgisterModel} = require('../../signup/models/signup.models')
const {SubModel} = require('../models/subscription.models')
const jwt = require("jsonwebtoken");


exports.getUserSubscriptions = async(req,res)=> {
    if(Object.prototype.hasOwnProperty.call(req.headers,"authorization")){
        const token =  req.headers.authorization.split(" ")[1]
        console.log("token", token);
         const details = await jwt.verify(token, process.env.JWT_TOKEN);
         console.log(details);
         if(details !== undefined){
            const userDetails = await RgisterModel.findOne({where:{email:details.email}})
            if(userDetails !== null){
              const getSubs = await SubModel.findAll({where:{signup_id:userDetails.dataValues.id}, include:{
                  model: RgisterModel,
                  as: 'signup',
                  attributes: {
                    exclude: ['created_at', 'updated_at','password'],
                  },
                }})
              return {error:false, message:null, data:getSubs}
            }
            else{
              return {error:true, message:"no user found", data:null}
            }
         }
         else{
          return {error:true, message:"token expired", data:null}
         }
    }
    else{
        return {error:true, message: "no authorization passed", data:null}
    }

}


