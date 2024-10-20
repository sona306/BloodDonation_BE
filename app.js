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
const BloodInventory = require('./Models/BloodInventory')
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

// Admin get approved requests
app.post("/admin/getApprovedRequests", async (req, res) => {
    try {
        // Fetch approved donation requests (assuming `status` field is used to track the request status)
        const approvedRequests = await donationRequestModel.find({ status: "Approved" });

        res.json({
            status: "success",
            requests: approvedRequests // Return the approved requests
        });
    } catch (error) {
        console.error("Error fetching approved requests:", error.message);
        res.status(500).json({
            status: "failure",
            message: "Error fetching approved requests.",
            error: error.message
        });
    }
});

// API to search for donors based on blood type for CONSUMER
app.post('/consumer/searchDonor', async (req, res) => {
    const { BloodGroup } = req.body;  // Get blood type from the request body

    if (!BloodGroup) {
        return res.status(400).json({ 
            status: "failure", 
            message: "Blood type is required." 
        });
    }

    try {
        // Fetch donors with the matching blood type, projecting only the specified fields
        const donors = await donarloginModel.find(
            { BloodGroup: BloodGroup }, 
            {
                username: 1,
                fullname: 1,
                dateofbirth: 1,
                gender: 1,
                BloodGroup: 1,
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
                message: `No donors found for blood type: ${BloodGroup}`
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
    const {fullname, requestedDate, urgency, location, BloodGroup, Amount } = req.body; // Extract fields from the request body

    // Validate input
    if ( !fullname || !requestedDate || !urgency || !location || !BloodGroup || !Amount) {
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
            BloodGroup,
            Amount
        });

        // Fetch donors with the matching blood type (assuming BloodGroup matches blood type)
        const matchingDonors = await donarloginModel.find({ BloodGroup: BloodGroup });

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

app.post('/admin/updateInventoryFromApprovedRequests', async (req, res) => {
    try {
        const { requestId, Amount } = req.body; // Extract requestId and Amount from the request body

        // Validate input
        if (!requestId || Amount == null || Amount <= 0) {
            return res.status(400).json({
                status: 'failure',
                message: 'Both requestId and a positive Amount are required.',
            });
        }

        // Find the donor request by ID
        const donorRequest = await donationRequestModel.findById(requestId);
        if (!donorRequest) {
            return res.status(404).json({
                status: 'failure',
                message: 'Donor request not found.',
            });
        }

        // Check if the request is approved
        if (donorRequest.status !== 'Approved') {
            return res.status(400).json({
                status: 'failure',
                message: 'Only approved requests can update inventory.',
            });
        }

        // Ensure BloodGroup is present in the donorRequest
        if (!donorRequest.BloodGroup) {
            return res.status(400).json({
                status: 'failure',
                message: 'Blood group is missing for this donor request. Cannot update inventory.',
            });
        }

        // Check if the blood inventory exists for the given blood group
        let bloodInventory = await BloodInventory.findOne({ BloodGroup: donorRequest.BloodGroup });

        // If inventory exists for this blood group, add the amount
        if (bloodInventory) {
            bloodInventory.Amount += Amount; // Increment the existing amount
            await bloodInventory.save(); // Save the updated inventory
        } else {
            // If no inventory exists for this blood group, create a new entry
            bloodInventory = await BloodInventory.create({
                BloodGroup: donorRequest.BloodGroup,
                Amount: Amount,
            });
        }

        // Respond with success message and updated quantity
        return res.status(200).json({
            status: 'success',
            message: 'Blood inventory updated successfully.',
            totalQuantity: bloodInventory.Amount, // Return the updated total quantity
            bloodGroup: bloodInventory.BloodGroup // Include the blood group in the response
        });

    } catch (error) {
        console.error('Error updating blood inventory:', error.message);
        return res.status(500).json({
            status: 'failure',
            message: 'Error updating blood inventory.',
            error: error.message,
        });
    }
});



app.post('/admin/bloodinventoryconsumer', async (req, res) => {
    const { BloodGroup, Amount, urgency } = req.body;

    // Validate urgency level
    const validUrgencyLevels = ["Normal", "Urgent", "Critical"];
    if (!validUrgencyLevels.includes(urgency)) {
        return res.status(400).json({ error: "Invalid urgency level. Valid values are Normal, Urgent, or Critical." });
    }

    try {
        // Normalize the blood group input
        const normalizedBloodGroup = BloodGroup.trim().toUpperCase();

        // Fetch the blood inventory for the given blood group
        const bloodInventory = await BloodInventory.findOne({ BloodGroup: normalizedBloodGroup });

        // Check if the blood group exists in the inventory
        if (!bloodInventory) {
            return res.status(404).json({ error: "Blood group not found in inventory." });
        }

        // Check if there are sufficient units (Amount) available
        if (bloodInventory.Amount < Amount) {
            return res.status(400).json({ error: "Insufficient blood units available." });
        }

        // Deduct the requested amount from the available units
        const updatedAmount = bloodInventory.Amount - Amount;

        // Update the blood inventory in the database
        const updatedInventory = await BloodInventory.findOneAndUpdate(
            { BloodGroup: normalizedBloodGroup },
            { Amount: updatedAmount }, // Update the Amount field in the database
            { new: true } // Return the updated document after modification
        );

        // Return the response with the updated remaining amount
        res.json({
            message: "Blood units successfully deducted from inventory.",
            remainingAmount: updatedInventory.Amount // Use the updated document's Amount field
        });
    } catch (error) {
        console.error("Error accessing blood inventory:", error);
        return res.status(500).json({ error: "Error accessing blood inventory." });
    }
});

app.listen(8080,()=>{
    console.log("server started...")
})