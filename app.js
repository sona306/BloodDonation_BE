const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

const loginModel = require("./Models/Admin")
const donarloginModel = require("./Models/Donar")
const consumerloginModel = require("./Models/Cosumer")
const hospitalloginModel = require("./Models/Hospital")
const donationRequestModel = require("./Models/DonationRequest")
const bloodRequestModel = require("./Models/BloodRequest")
const BloodInventory = require('./Models/BloodInventory')
const postModel = require('./Models/Post')
const Camp = require('./Models/Camp')
const Notification = require('./Models/Notification')
const Doubt = require('./Models/Doubt')
const BloodRequestHospital = require('./Models/BloodRequestHospital')
const CampRegistration = require('./Models/CampRegistration')

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
            message: "No donor has registered yet!",
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

// api to show remaining in blood inventory
app.post('/admin/bloodinventory', async (req, res) => {
    try {
        // Retrieve all blood group records from the BloodInventory table
        const bloodInventory = await BloodInventory.find({}, 'BloodGroup Amount');

        // Return the response with the list of blood groups and their amounts
        res.json({
            message: "Blood inventory retrieved successfully.",
            inventory: bloodInventory
        });
    } catch (error) {
        console.error("Error fetching blood inventory:", error);
        return res.status(500).json({ error: "Error retrieving blood inventory." });
    }
});

// API to show remaining blood inventory
app.post('/admin/checkbloodinventory', async (req, res) => {
    try {
        // Retrieve all blood group records from the BloodInventory table
        const bloodInventory = await BloodInventory.find({}, 'BloodGroup Amount');

        // Prepare alerts for blood groups with amounts less than 10
        const alerts = bloodInventory
            .filter(item => item.Amount < 10)
            .map(item => `${item.BloodGroup} blood is running low (${item.Amount} units remaining).`);

        // Return the response with the list of blood groups and their amounts
        res.json({
            message: "Blood inventory retrieved successfully.",
            inventory: bloodInventory,
            alerts: alerts // Include alerts in the response
        });
    } catch (error) {
        console.error("Error fetching blood inventory:", error);
        return res.status(500).json({ error: "Error retrieving blood inventory." });
    }
});


app.post('/admin/highestDonorsPerSixMonths', async (req, res) => {
    try {
        // Use aggregation to group by year and 6-month periods, filtering out invalid dates
        const results = await donationRequestModel.aggregate([
            {
                // Match documents with valid requested dates
                $match: {
                    requestedDate: { $ne: null } // Ensure requestedDate is not null
                }
            },
            {
                // Add a field for the 6-month period (1 for Jan-Jun, 2 for Jul-Dec)
                $addFields: {
                    sixMonthPeriod: {
                        $cond: {
                            if: { $lte: [{ $month: "$requestedDate" }, 6] },
                            then: 1, // Jan-Jun
                            else: 2 // Jul-Dec
                        }
                    },
                    year: { $year: "$requestedDate" } // Extract the year
                }
            },
            {
                // Group by year, sixMonthPeriod, and userId
                $group: {
                    _id: {
                        year: "$year",
                        sixMonthPeriod: "$sixMonthPeriod",
                        userId: "$userId" // Group by userId
                    },
                    totalAmount: { $sum: "$Amount" } // Sum the donation amounts
                }
            },
            {
                // Sort by year, sixMonthPeriod, and totalAmount descending
                $sort: { "_id.year": 1, "_id.sixMonthPeriod": 1, totalAmount: -1 }
            },
            {
                // Group again to get highest donor per 6-month period
                $group: {
                    _id: {
                        year: "$_id.year",
                        sixMonthPeriod: "$_id.sixMonthPeriod"
                    },
                    highestDonor: { $first: "$_id.userId" }, // Get the userId of the highest donor for each period
                    totalAmount: { $first: "$totalAmount" } // Get the total amount for that donor
                }
            },
            {
                // Optionally, project the results to format the output
                $project: {
                    period: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            { $cond: [{ $eq: ["$_id.sixMonthPeriod", 1] }, "01-06", "07-12"] } // Format period as 'YYYY-01-06' or 'YYYY-07-12'
                        ]
                    },
                    highestDonor: "$highestDonor",
                    totalAmount: "$totalAmount"
                }
            }
        ]);

        // Log the raw aggregation results
        console.log('Raw Aggregation Results:', results);

        // Now fetch the donor details for the highest donor in each 6-month period
        const highestDonorDetails = await Promise.all(results.map(async (result) => {
            const donorDetails = await donarloginModel.findById(result.highestDonor);
            return {
                period: result.period,
                donor: donorDetails,
                totalAmount: result.totalAmount
            };
        }));

        console.log('Formatted Highest Donor Details:', highestDonorDetails); // Log the formatted results

        res.status(200).json({
            highestDonors: highestDonorDetails
        });

    } catch (error) {
        console.error('Error fetching highest donors per 6 months:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


//create post
app.post("/admin/create",async(req,res)=>{
    let input = req.body
    let token = req.headers.token
    jwt.verify(token,"blood-donation",async(error,decoded)=>{
        if (decoded && decoded.email) {
            let result = new postModel(input)
            await result.save()
            res.json({"status":"Success"})
        } else {
        res.json({"status":"Invalid Authentication"})
        }
    })
})

//view Mypost
app.post("/admin/viewmypost",(req,res)=>{
    let input = req.body
    let token = req.headers.token
    jwt.verify(token,"blood-donation",(error,decoded)=>{
    if (decoded && decoded.email) {
        postModel.find(input).then(
            (items)=>{
                res.json(items)
            }
        ).catch(
            (error)=>{
                res.json({"status":"Error"})
            }
        )
    } else {
        res.json({"status":"Invalid Authentication"})
    }
    })
    
})

// Delete Post
app.post("/admin/deletepost", (req, res) => {
    let { postId } = req.body; // Get the postId to be deleted
    let token = req.headers.token; // Extract token from headers

    // Verify the token
    jwt.verify(token, "blood-donation", (error, decoded) => {
        if (decoded && decoded.email) {
            // Find the post by ID and delete it
            postModel.findByIdAndDelete(postId)
                .then((result) => {
                    if (result) {
                        res.json({ "status": "Success", "message": "Post deleted successfully" });
                    } else {
                        res.json({ "status": "Error", "message": "Post not found" });
                    }
                })
                .catch((err) => {
                    res.json({ "status": "Error", "message": err.message });
                });
        } else {
            res.json({ "status": "Invalid Authentication" });
        }
    });
});


app.get("/public/viewposts", (req, res) => {
    postModel.find({})
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            res.json({ "status": "Error", "message": error.message });
        });
});


//create post for camps
app.post("/admin/createcamp", async (req, res) => {
  let input = req.body; // The input will contain the details of the camp
  let token = req.headers.token; // The token is sent in the headers for authentication

  // Verify JWT token for authentication
  jwt.verify(token, "blood-donation", async (error, decoded) => {
    if (decoded && decoded.email) {
      // If the JWT token is valid, proceed to create a new camp
      try {
        // Create a new Camp object with the input data and attach the decoded user (admin)'s ID
        let newCamp = new Camp({
          title: input.title,
          location: input.location,
          date: new Date(input.date), // Convert to Date if necessary
          contact: input.contact,
          description: input.description,
          createdBy: decoded._id,  // Assuming `_id` is part of the decoded JWT payload (admin's ID)
        });

        // Save the new camp to the database
        await newCamp.save();

        // Now, create notifications for all donors
        const donors = await donarloginModel.find();  // Fetch all donors from the database
        donors.forEach(async (donor) => {
          const message = `New Blood Donation Camp: ${newCamp.title} is available at ${newCamp.location}. Date: ${newCamp.date}`;
          const existingNotification = await Notification.findOne({ donorId: donor._id, campId: newCamp._id });
          if (!existingNotification) {
            const newNotification = new Notification({
              donorId: donor._id,
              campId: newCamp._id,
              message,
              isSeen: false,
            });
            await newNotification.save();  // Save the notification to the database
          }
        });

        // Respond with success message after creating camp and sending notifications
        res.json({ "status": "Success", "message": "Blood donation camp created and notifications sent to donors!" });
      } catch (err) {
        console.error("Error saving camp:", err);
        res.json({ "status": "Error", "message": "Failed to create blood donation camp" });
      }
    } else {
      // If the token is invalid or expired
      res.json({ "status": "Invalid Authentication" });
    }
  });
});


//camp notification for donors
// Get all camps for donors
app.get('/donor/camps', async (req, res) => {
    try {
      const camps = await Camp.find();
      res.status(200).json({ camps });
    } catch (error) {
      console.error('Error fetching camps:', error);
      res.status(500).json({ message: 'Server error, unable to fetch camps' });
    }
  });
  
// Create notifications for new camps (Admin posting new camps)
app.post('/admin/camps', async (req, res) => {
  try {
    const { camp } = req.body;
    const newCamp = new Camp(camp);
    await newCamp.save();

    // Create a notification for all donors
    const donors = await donarloginModel.find();  // Fetch all donors
    donors.forEach(async (donor) => {
      const message = `New Blood Donation Camp: ${newCamp.name}`;
      const existingNotification = await Notification.findOne({ donorId: donor._id, campId: newCamp._id });
      if (!existingNotification) {
        const newNotification = new Notification({ donorId: donor._id, campId: newCamp._id, message, isSeen: false });
        await newNotification.save();
      }
    });

    res.status(201).json({ message: 'Camp and notifications created successfully' });
  } catch (error) {
    console.error('Error creating camp and notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Unseen Notifications for a specific donor
app.get('/donor/notifications/unseen', async (req, res) => {
    const donorId = req.query.donorId;  // The donorId will be passed in the query string
    
    if (!donorId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }
  
    try {
      // Fetch all unseen notifications for the donor
      const unseenNotifications = await Notification.find({ donorId, isSeen: false });
  
      // If no unseen notifications
      if (unseenNotifications.length === 0) {
        return res.status(200).json({ message: "No new notifications", notifications: [] });
      }
  
      res.status(200).json({ notifications: unseenNotifications });
    } catch (error) {
      console.error("Error fetching unseen notifications:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Fetch All Notifications for a specific donor
app.get('/donor/notifications/all', async (req, res) => {
    const donorId = req.query.donorId;  // The donorId will be passed in the query string
    
    if (!donorId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }
  
    try {
      // Fetch all notifications (seen and unseen) for the donor
      const allNotifications = await Notification.find({ donorId });
  
      // If no notifications
      if (allNotifications.length === 0) {
        return res.status(200).json({ message: "No notifications found", notifications: [] });
      }
  
      res.status(200).json({ notifications: allNotifications });
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Mark Notifications as Seen for a specific donor
app.post('/donor/notifications/markAsSeen', async (req, res) => {
    const { donorId } = req.body;  // Donor ID to mark the notifications
  
    if (!donorId) {
      return res.status(400).json({ message: "Donor ID is required" });
    }
  
    try {
      // Mark all unseen notifications as seen for the donor
      const result = await Notification.updateMany(
        { donorId, isSeen: false },
        { $set: { isSeen: true } }
      );
  
      res.status(200).json({ message: `${result.modifiedCount} notifications marked as seen` });
    } catch (error) {
      console.error("Error marking notifications as seen:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

//hospital emergency req
app.post('/api/hospitals/emergency-blood-request', async (req, res) => {
    try {
        let { hospitalName, bloodType, unitsRequired, urgencyLevel, contactNumber, location, additionalNotes, expectedDeliveryTime } = req.body;

        // Validate required fields
        if (!hospitalName || !bloodType || !unitsRequired || !urgencyLevel || !contactNumber) {
            return res.status(400).json({ status: "error", message: "Missing required fields" });
        }

        // Ensure urgencyLevel is valid
        const validUrgencyLevels = ['High', 'Medium', 'Low'];
        if (!validUrgencyLevels.includes(urgencyLevel)) {
            return res.status(400).json({ status: "error", message: "Invalid urgency level" });
        }

        // Validate expectedDeliveryTime format (optional)
        let deliveryTime = expectedDeliveryTime ? new Date(expectedDeliveryTime) : null;
        if (expectedDeliveryTime && isNaN(deliveryTime.getTime())) {
            return res.status(400).json({ status: "error", message: "Invalid expected delivery time format" });
        }

        // Create a new blood request (without hospitalId)
        const newRequest = new BloodRequestHospital({
            hospitalName,
            bloodType,
            unitsRequired,
            urgencyLevel,
            contactNumber,
            location,
            additionalNotes,
            expectedDeliveryTime: deliveryTime,
            status: "pending",
            requestTime: new Date()
        });

        await newRequest.save();

        
        res.status(201).json({
            status: "success",
            message: "Emergency blood request sent to the admin.",
            requestId: newRequest._id
        });
    } catch (error) {
        console.error("Error processing emergency blood request:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Admin Approves Emergency Blood Request
app.post('/api/admin/approve-emergency-request', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { requestId } = req.body;

        // Validate request ID
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({ status: "error", message: "Invalid request ID format" });
        }

        // Find the blood request
        const bloodRequest = await BloodRequestHospital.findById(requestId).session(session);
        if (!bloodRequest) {
            return res.status(404).json({ status: "error", message: "Blood request not found" });
        }

        // Check if request is already processed
        if (bloodRequest.status !== "pending") {
            return res.status(400).json({ status: "error", message: "Request already processed." });
        }

        // Find blood inventory for the requested blood group
        const inventory = await BloodInventory.findOne({ BloodGroup: bloodRequest.bloodType }).session(session);

        if (!inventory || inventory.Amount < bloodRequest.unitsRequired) {
            return res.status(400).json({
                status: "error",
                message: `Not enough blood units available. Available: ${inventory ? inventory.Amount : 0} units.`,
            });
        }

        // Deduct units from inventory
        const updatedInventory = await BloodInventory.findOneAndUpdate(
            { BloodGroup: bloodRequest.bloodType },
            { $inc: { Amount: -bloodRequest.unitsRequired } },  // Deduct units
            { new: true, session }
        );

        // Approve request
        bloodRequest.status = "approved";
        bloodRequest.responseMessage = "Request approved by admin.";
        bloodRequest.approvalTime = new Date();
        await bloodRequest.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log("✅ Admin Approved Emergency Blood Request:", bloodRequest);

        return res.status(200).json({
            status: "success",
            message: "Request approved. Blood units have been deducted from inventory.",
            requestId: bloodRequest._id,
            updatedInventory,  // Send updated inventory data to frontend
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error("❌ Error processing admin approval:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
});


app.get('/api/hospitals/emergency-blood-requests', async (req, res) => {
    try {
        const requests = await BloodRequestHospital.find({ status: "pending" });

        if (!requests || requests.length === 0) {
            return res.status(200).json({ requests: [] }); // No pending requests
        }

        res.status(200).json({ requests });
    } catch (error) {
        console.error("❌ Error fetching emergency blood requests:", error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});


//camp registration
app.post("/registercamp", async (req, res) => {
    let { campId, name, email, phone, bloodGroup } = req.body; // Include bloodGroup in request body
  
    try {
      // Check if the camp exists
      let camp = await Camp.findById(campId);
      if (!camp) {
        return res.json({ status: "Error", message: "Camp not found" });
      }
  
      // Check if the user is already registered for the camp using email or phone
      let existingRegistration = await CampRegistration.findOne({
        campId: campId,
        $or: [{ email }, { phone }],
      });
  
      if (existingRegistration) {
        return res.json({ status: "Error", message: "You are already registered for this camp" });
      }
  
      // Create a new registration entry
      let newRegistration = new CampRegistration({
        campId: campId,
        name,
        email,
        phone,
        bloodGroup,
        registeredAt: new Date(),
      });
  
      await newRegistration.save(); // Save registration to database
  
      // Respond with success message
      res.json({
        status: "Success",
        message: "Successfully registered for the camp",
      });
    } catch (err) {
      console.error("Error registering for camp:", err);
      res.json({ status: "Error", message: "Failed to register for the camp" });
    }
  });
  
// Fetch all camps with full details
app.get('/camps', async (req, res) => {
    console.log('Fetching camps...');
    try {
      const camps = await Camp.find({}, '-__v');
      console.log('Camps fetched:', camps);
      res.json(camps);
    } catch (err) {
      console.error('Error fetching camps:', err);
      res.status(500).json({ message: 'Failed to fetch camps' });
    }
  });
  
// Fetch all camp registrations with full details for admin
app.get("/admin/camp-registrations", async (req, res) => {
    console.log("Fetching all camp registrations...");

    try {
        // Fetch registrations and populate camp details
        const registrations = await CampRegistration.find({})
            .populate({
                path: 'campId',
                select: 'name location date',
                strictPopulate: false, // Avoid errors if campId is missing
            })
            .select('-__v');

        // Filter out invalid or incomplete records
        const validRegistrations = registrations.filter(reg => reg.campId?.location);

        // Sort by camp location in ascending order
        validRegistrations.sort((a, b) =>
            a.campId.location.localeCompare(b.campId.location)
        );

        if (validRegistrations.length === 0) {
            console.warn("No valid registrations available.");
            return res.status(404).json({ status: "Error", message: "No registrations available" });
        }

        console.log(`Fetched ${validRegistrations.length} registrations`);
        res.status(200).json({ status: "Success", data: validRegistrations });
    } catch (err) {
        console.error("Error fetching registrations:", err.message);
        res.status(500).json({ status: "Error", message: err.message || "Failed to fetch registrations" });
    }
});

//donation reminder
app.get('/api/donation-requests', async (req, res) => {
    try {
        const donationRequests = await donationRequestModel.find()
            .select('userId fullname requestedDate status location BloodGroup Amount');

        // Format data to extract date, month, year and future date
        const formattedRequests = donationRequests.map(request => {
            const requestDate = new Date(request.requestedDate);
            
            // Add 90 days to the requested date
            const futureDate = new Date(requestDate);
            futureDate.setDate(futureDate.getDate() + 90);

            return {
                userId: request.userId,
                fullname: request.fullname,
                date: requestDate.getDate(), // Extract day of the month
                month: requestDate.toLocaleString('default', { month: 'long' }), // Full month name
                year: requestDate.getFullYear(), // Year
                futureDate: futureDate.toLocaleDateString(), // Format future date
                status: request.status,
                location: request.location,
                BloodGroup: request.BloodGroup,
                Amount: request.Amount
            };
        });

        res.status(200).json(formattedRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donation requests', error: error.message });
    }
});
  
//mail to donors
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'line30356@gmail.com', // 
        pass: 'tedq pxms pecj ocbr' // 
    }
});

// ✅ Endpoint to send reminder email after 90 days
app.post('/sendReminder', async (req, res) => {
    const { fullname, lastDonationDate,email } = req.body;
    if (!fullname || !lastDonationDate) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    // ✅ Calculate next eligible date (after 90 days)
    const lastDate = new Date(lastDonationDate);
    const nextDonationDate = new Date(lastDate.setDate(lastDate.getDate() + 90)).toISOString().split('T')[0];

    const mailOptions = {
        from: 'line30356@gmail.com', // ✅ Sent from admin email
        to: email,
        subject: 'You are eligible to donate blood again!',
        html: `
            <h2>Blood Donation Eligibility Reminder</h2>
            <p>Dear <strong>${fullname}</strong>,</p>
            <p>We are happy to inform you that you are eligible to donate blood again on:</p>
            <ul>
                <li><strong>Date:</strong> ${nextDonationDate}</li>
            </ul>
            <p>Your previous donation has helped save lives. We hope to see you again soon!</p>
            <p>Thank you for your valuable contribution!</p>
            <br>
            <p>Regards,<br><strong>Blood Donation Team</strong></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: `Reminder sent to ${email}` });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

//emergency req mail
// ✅ Endpoint to send emergency request email to multiple donors
app.post('/sendEmergencyRequest', async (req, res) => {
    const { bloodType, recipients } = req.body;

    if (!bloodType || !recipients || !recipients.length) {
        return res.status(400).json({ status: 'error', message: 'Missing required fields or recipients list is empty' });
    }

    // ✅ Email content
    const mailOptions = {
        from: 'line30356@gmail.com', 
        to: recipients.join(','), // Convert array to comma-separated string
        subject: `Urgent Need for ${bloodType} Blood`,
        html: `
            <h2>Emergency Blood Donation Request</h2>
            <p>Dear Donors and Consumers,</p>
            <p>We urgently require <strong>${bloodType}</strong> blood to save a life. If you are eligible and willing to donate, please contact us immediately.</p>
            <p>Your contribution can save lives!</p>
            <br>
            <p>Thank you for your support!</p>
            <br>
            <p>Regards,<br><strong>Blood Donation Team</strong></p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ status: 'success', message: `Emergency request sent to ${recipients.length} recipients` });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});


app.get('/getAllEmails', async (req, res) => {
    try {
        const { location } = req.query;

        if (!location) {
            return res.status(400).json({ success: false, message: 'Location is required' });
        }

        // ✅ Fetch donor emails based on location
        const donorEmails = await donarloginModel.find({ location }, 'email');
        // ✅ Fetch consumer emails based on location
        const consumerEmails = await consumerloginModel.find({ location }, 'email');

        // ✅ Combine emails into one list
        const allEmails = [
            ...donorEmails.map(donor => donor.email),
            ...consumerEmails.map(consumer => consumer.email)
        ];

        res.status(200).json({ success: true, emails: allEmails });
    } catch (error) {
        console.error('Error fetching emails:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch emails' });
    }
});
// ✅ Get all unique locations from donors and consumers
app.get('/getAllLocations', async (req, res) => {
    try {
        const donorLocations = await donarloginModel.distinct('location');
        const consumerLocations = await consumerloginModel.distinct('location');

        // ✅ Combine and remove duplicates
        const allLocations = [...new Set([...donorLocations, ...consumerLocations])];

        res.status(200).json({ success: true, locations: allLocations });
    } catch (error) {
        console.error('Error fetching locations:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch locations' });
    }
});

// ✅ API to send "Request Closed" email
app.post('/sendRequestClosedEmail', async (req, res) => {
    const { recipients } = req.body;

    if (!recipients || recipients.length === 0) {
        return res.status(400).json({ success: false, message: 'No recipients provided' });
    }

    const subject = 'Emergency Request Closed - Thank You!';
    const message = `
        <p>Dear Donor,</p>
        <p>We are pleased to inform you that the emergency request has been successfully fulfilled.</p>
        <p>Thank you for your prompt response and for saving a life! Your contribution is invaluable.</p>
        <p>Stay safe and healthy!</p>
        <br>
        <p>Best regards,<br><strong>Blood Donation App Team</strong></p>
    `;

    try {
        for (const recipient of recipients) {
            // ✅ Send email
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: recipient,
                subject,
                html: message
            });
        }

        console.log(`✅ "Request Closed" emails sent to ${recipients.length} users.`);
        res.status(200).json({ success: true, message: `Emails sent to ${recipients.length} users.` });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ success: false, message: 'Failed to send emails' });
    }
});

app.listen(8080,()=>{
    console.log("server started...")
})

