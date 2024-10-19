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
const bloodRequestModel = require("./Models/BloodRequest")
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

// API to search for donors based on blood type for CONSUMER
app.post('/consumer/searchDonor', async (req, res) => {
    const { bloodtype } = req.body;  // Get blood type from the request body

    if (!bloodtype) {
        return res.status(400).json({ 
            status: "failure", 
            message: "Blood type is required." 
        });
    }

    try {
        // Fetch donors with the matching blood type, projecting only the specified fields
        const donors = await donarloginModel.find(
            { bloodtype: bloodtype }, 
            {
                username: 1,
                fullname: 1,
                dateofbirth: 1,
                gender: 1,
                bloodtype: 1,
                phonenumber: 1,
                email: 1,
                homeaddress: 1,
                location: 1,
                medicalhistory: 1,
                lastdonationdate: 1,
                hospitalname: 1,
                emergencycontactnumber: 1,
                _id: 0  // Optional: Exclude the _id field if not needed
            }
        );

        if (donors.length > 0) {
            res.status(200).json({
                status: "success",
                donors: donors
            });
        } else {
            res.status(404).json({
                status: "failure",
                message: `No donors found for blood type: ${bloodtype}`
            });
        }
    } catch (error) {
        console.error("Error fetching donors:", error.message);
        res.status(500).json({
            status: "failure",
            message: "Error fetching donors.",
            error: error.message
        });
    }
});

// API to post a blood request from consumer side
app.post('/consumer/requestBlood', async (req, res) => {
    const {fullname, requestedDate, urgency, location, bloodtype, Amount } = req.body; // Extract fields from the request body

    // Validate input
    if ( !fullname || !requestedDate || !urgency || !location || !bloodtype || !Amount) {
        return res.status(400).json({ 
            status: "failure", 
            message: "All fields are required." 
        });
    }

    try {
        // Create a new blood request
        const newRequest = await bloodRequestModel.create({
            fullname,
            requestedDate,
            urgency,
            location,
            bloodtype,
            Amount
        });

        // Fetch donors with the matching blood type (assuming BloodGroup matches blood type)
        const matchingDonors = await donarloginModel.find({ bloodtype: bloodtype });

        if (matchingDonors.length > 0) {
            // Optionally, you can notify the donors here
            // For example, you could send an email or push notification to the donors
            
            res.status(201).json({
                status: "success",
                message: "Blood request posted successfully.",
                requestId: newRequest._id,  // Return the ID of the created request
                matchingDonors: matchingDonors // Optionally include matching donors
            });
        } else {
            res.status(201).json({
                status: "success",
                message: "Blood request posted successfully. No matching donors found.",
                requestId: newRequest._id
            });
        }
    } catch (error) {
        console.error("Error posting blood request:", error.message);
        res.status(500).json({
            status: "failure",
            message: "Error posting blood request.",
            error: error.message
        });
    }
});

// API to fetch blood requests based on urgency
app.post('/admin/bloodRequestsByUrgency', async (req, res) => {
    try {
        const { urgency } = req.body; // Extract urgency from the request body

        // Validate that the urgency field is provided
        if (!urgency) {
            return res.status(400).json({
                status: 'failure',
                message: 'Urgency level is required.'
            });
        }

        // Fetch blood requests that match the urgency level from the database
        const requests = await bloodRequestModel.find({ urgency });

        // Check if there are any requests matching the urgency level
        if (requests.length > 0) {
            res.status(200).json({
                status: 'success',
                message: `Blood requests with urgency level "${urgency}" found.`,
                requests: requests
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: `No blood requests with urgency level "${urgency}" found.`,
                requests: []
            });
        }
    } catch (error) {
        console.error("Error fetching blood requests by urgency:", error.message);
        res.status(500).json({
            status: 'failure',
            message: 'Error fetching blood requests by urgency.',
            error: error.message
        });
    }
});

app.listen(8080,()=>{
    console.log("server started...")
})