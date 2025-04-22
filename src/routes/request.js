const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const sendConnectionEmail = require("../utils/mailer");
 
//& ONLY FOR INTERESTED AND IGNORED STATUS
requestRouter.post("/request/send/:status/:toUserId", 
  userAuth, 
  async(req,res) => {

    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if(!allowedStatus.includes(status))
      {
        return res.status(400).json({message: "Invalid status type: " + status});
      }

      //* if fromUserId is same as toUserId
      //^ we can simply do it by comparing toUser and FromUser => but lets do it using schema validation "SCHEMA PRE"

      //* Whether toUserId exists
      const toUser = await User.findById(toUserId);
      if(!toUser)
      {
        return res.status(404).json({message: "User not found!"});
      }

      //* IF there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        //& This is a mongoose mehtod{or followed by an array of conditions}
        $or: [
          {fromUserId, toUserId},//elon musk has already sent cr to alia bhat
          {fromUserId: toUserId, toUserId:fromUserId},//alia bhat has sent connection req to elon musk
        ],
      });

      if(existingConnectionRequest) {
        return res.status(400).send({message: "Connection Request ALready Exist!!"});
         //or throw new error
      }

      //create an instance
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      //save this instance to db
      const data = await connectionRequest.save();

      const sub = "💘 You've Got a New Connection Request!";

      const firstName = req.user.firstName.split(' ')[0];
      const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

      const body = ` <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff0f5; padding: 30px; border-radius: 12px; border: 1px solid #f3d1e4; max-width: 600px; margin: auto;">
      <h1 style="text-align: center; color: #d63384;">💌 New Connection Alert!</h1>
      <p style="font-size: 18px; color: #333; text-align: center;">
        <strong>${capitalizedName}</strong> has shown interest in you! 🥰
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://dev-tinder-delta-one.vercel.app/" style="background-color: #d63384; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-size: 16px;">
          View Connection 💖
        </a>
      </div>

      <p style="font-size: 16px; color: #555; text-align: center;">
        Don’t keep them waiting — check your dashboard to decide if the vibe is mutual! ✨
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #f3d1e4;" />

      <p style="font-size: 14px; color: #999; text-align: center;">
        You’re receiving this email because you’re part of <strong>DevTinder</strong>. Keep connecting, keep vibing! 💫<br/>
        Need help? Contact support at <a href="mailto:support@devtinder.com" style="color: #d63384;">support@devtinder.com</a>
      </p>
    </div>
    `;

      await sendConnectionEmail(req.user.firstName, toUser.emailId, status, sub, body);
      // console.log(emailRes + "email sent");

      res.json({
        message: req.user.firstName+" is "+status+" in "+toUser.firstName,
        data,
      });
    } catch (err){
      res.status(400).send("ERROR: " + err.message);
    }  
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {
  try {
    const loggedInUser = req.user;
    const {status, requestId} = req.params;

    //^validate the status
    const allowedStatus = ["accepted", "rejected"];

    if(!allowedStatus.includes(status)) {
      return res.status(400).json({message : "Status not allowed"});
    }

    //This queries the MongoDB database using Mongoose. It tries to find one document (i.e., record) in the ConnectionRequestModel collection that matches the conditions.
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id : requestId,
      toUserId : loggedInUser._id,
      status : "interested",
    });

    if(!connectionRequest)
    {
      return res.status(404).json({messgae : "Connection request not found"});
    }

    connectionRequest.status = status; 

    const data = await connectionRequest.save();

    res.json({message: "Connection request" + status, data});
     
    //akshay => elon
    //* is elon logged in??
    //* existing status should be interested state
    //* request id should be valid

  }
  catch(err) {
    res.status(400).send("ERROR :" + err.message);
  }

});

module.exports = requestRouter; 