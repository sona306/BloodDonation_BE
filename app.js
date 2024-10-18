const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const loginModel = require("./Models/Admin")
const donarloginModel = require("./Models/Donar")
const consumerloginModel = require("./Models/Cosumer")
const hospitalloginModel = require("./Models/Hospital")
const donationRequestModel = require("./Models/DonationRequest")

let app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://sonasabu:sonavi306@cluster0.ejzjjq6.mongodb.net/mernblood_donationdb?retryWrites=true&w=majority&appName=Cluster0")

//ADMIN SIGIN UP
app.post("/adminSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    loginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new loginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//ADMIN SIGN IN
app.post("/adminSignIn",(req,res)=>{
    let input = req.body
    let result = loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

//DONAR SIGN UP
app.post("/donarSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    donarloginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new donarloginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//DONAR SIGN IN
app.post("/donarSignIn",(req,res)=>{
    let input = req.body
    let result = donarloginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token,"userId":response[0]._id})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

//CONSUMER SIGN UP
app.post("/consumerSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    consumerloginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new consumerloginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//CONSUMER SIGN IN
app.post("/consumerSignIn",(req,res)=>{
    let input = req.body
    let result = consumerloginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})

//CONSUMER SIGN UP
app.post("/hospitalSignUp",(req,res)=>{
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password,10)
    //console.log(hashedPassword)
    let hashedConfirm = bcrypt.hashSync(req.body.confirm,10)
    req.body.password = hashedPassword
    req.body.confirm = hashedConfirm

    hospitalloginModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "Email id already exits" })
            } else {
                let result = new hospitalloginModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

//HOSPITAL SIGN IN
app.post("/hospitalSignIn",(req,res)=>{
    let input = req.body
    let result = hospitalloginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"blood-donation",{expiresIn:"2d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status" : "token creation failed"})
                            } else {
                                res.json({"status" : "success","token":token})
                            }
                        })
                } else {
                    res.json({"status" : "incorect password"})
                }
            } else {
                res.json({"status" : "username doesnt exist"})
            }
        }
    )
})


// DONOR SEND REQUEST FOR BLOOD DONATION
app.post("/donar/requestBloodDonation", (req, res) => {
    let input = req.body;
    let token = req.headers.token;

    jwt.verify(token, "blood-donation", async (error, decoded) => {
        if (decoded && decoded.email) {
            // Check if donationHistory is true, then validate fields: date, hospitalName, and quality
            if (input.donationHistory) {
                if (!input.date || !input.hospitalName || !input.quality) {
                    return res.status(400).json({
                        status: "failure",
                        message: "date, hospitalName, and quality are required when donationHistory is true"
                    });
                }
            } else {
                // If donationHistory is false, make sure these fields are not provided or are empty
                if (input.date || input.hospitalName || input.quality) {
                    return res.status(400).json({
                        status: "failure",
                        message: "date, hospitalName, and quality should not be provided when donationHistory is false"
                    });
                }
            }

            // Proceed with saving the request
            let result = new donationRequestModel(input);
            try {
                await result.save();
                res.json({ status: "success" });
            } catch (err) {
                res.status(500).json({ status: "failure", message: "Error saving the request", error: err });
            }
        } else {
            res.status(401).json({ status: "Invalid Authentication" });
        }
    });
});
//ADMIN VIEW REQUEST FROM DONAR
app.get("/admin/getAllDonationRequests", (req, res) => {
    donationRequestModel.find()
        .then((requests) => {
            res.json({ status: "success", requests: requests });
        })
        .catch((err) => {
            res.status(500).json({ status: "failure", message: err.message });
        });
});


// ADMIN APPROVES OR REJECTS A DONATION REQUEST
app.post("/admin/approveDonationRequest", async (req, res) => {
    const { requestId, status } = req.body;

    // Ensure that requestId and status are provided
    if (!requestId || !status) {
        return res.status(400).json({
            status: "failure",
            message: "Missing required fields: requestId and status are required."
        });
    }

    try {
        // Find the donation request by ID
        const request = await donationRequestModel.findById(requestId);

        if (!request) {
            return res.status(404).json({
                status: "failure",
                message: "Donation request not found."
            });
        }

        // Update the request status and add adminResponseDate
        request.status = status; // 'Approved' or 'Rejected'
        request.adminResponseDate = new Date();

        // Save the updated request
        await request.save();

        res.json({
            status: "success",
            message: `Donation request ${status.toLowerCase()} successfully.`,
            requestId: request._id
        });
    } catch (error) {
        console.error("Error approving/rejecting donation request:", error.message);
        res.status(500).json({
            status: "failure",
            message: "Error processing the donation request.",
            error: error.message
        });
    }
});

//Admin get pending req
app.get("/admin/getPendingRequests", async (req, res) => {
    try {
        // Fetch pending donation requests (assuming `status` field is used to track the request status)
        const pendingRequests = await donationRequestModel.find({ status: "Pending" });

        res.json({
            status: "success",
            requests: pendingRequests // Return the pending requests
        });
    } catch (error) {
        console.error("Error fetching pending requests:", error.message);
        res.status(500).json({
            status: "failure",
            message: "Error fetching pending requests.",
            error: error.message
        });
    }
});


app.listen(8080,()=>{
    console.log("server started...")
})