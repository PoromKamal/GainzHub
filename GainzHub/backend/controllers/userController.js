const jwt = require('jsonwebtoken');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
const { json } = require('express');
const AWS = require("aws-sdk")
let {s3DAO} = require("../config/awsS3");
s3DAO = new s3DAO();
const fs = require('fs');

const getUserData = asyncHandler(async(req, res) => {
    const userId = req.headers['x-auth-token']; //Temporary workaround, massive security risk, please refactor later
    try{
        const foundUser = await User.findOne({_id: userId});
        return res.status(200).json(foundUser);
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const getAllUserData = asyncHandler(async(req, res) => {
    User.find({},(err,result) => {
        if (err)
        {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

const getUserDataSecure = asyncHandler(async(req, res) => {
    const userId = req.user; //Temporary workaround, massive security risk, please refactor later
    try{
        const foundUser = await User.findOne({_id: userId});
        return res.status(200).json(foundUser);
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const removeAddedMealPlan = asyncHandler(async(req, res)=>{
    const userId = req.user;
    const {mealPlanId} = req.body;
    try{
        const userObj = await User.findOne({_id:userId});
        userObj.exploreMealPlans= userObj.exploreMealPlans.filter((meal) => meal != mealPlanId);
        await userObj.save();
        res.status(200).send("Success unadding mealplan");
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const addPublishedMealPlan = asyncHandler( async(req, res)=>{
    const userId = req.user;
    const {mealPlanId} = req.body;
    console.log(mealPlanId);
    try{
        await User.updateOne({_id: userId}, {$push: {exploreMealPlans: mealPlanId}});
        res.status(200).send("Successfully added meal plan");
    }catch(err){
        return res.status(500).send(err.message);
    }
});


const editProfile = async(req, res) => {
    const {updatedUser} = req.body;
    try{
        //console.log(updatedMealPlan);
        await User.findOneAndReplace({_id: updatedUser._id}, updatedUser);
        return res.status(200).send("Updated Profile");
    } catch(err){
        return res.status(400).send(err.message);
    }
}

/*
Access Key ID:
AKIA5VMO3VKYPBCYOH32
Secret Access Key:
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
*/

const uploadProfilePic = asyncHandler(async(req, res) => {
    const user = req.user;
    const {image} = req.body;

    //Get the username of the user
    const userObj = await User.findOne({_id: user});

    try{
        await s3DAO.uploadProfilePicture(image, userObj.username);
        return res.status(200).send("Uploaded Profile Picture");
    }catch(err){
        return res.status(500).send("Could not upload profile");
    }


});

const getProfilePic = asyncHandler(async(req, res)=>{
    const user = req.user;

    const userObj = await User.findOne({_id: user});
    const url = await s3DAO.getProfilePicture(userObj.username);
    if(url != ""){
        return res.status(200).json({url});
    }
    else{
        return res.status(404).send("Could not find profile picture");
    }

})

module.exports = {getAllUserData, getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure, editProfile, uploadProfilePic, getProfilePic};
