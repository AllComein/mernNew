// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://202.54.6.99:8081"
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// // database
// const db = require("./app/models");
// const Role = db.role;

// db.sequelize.sync();
// // force: true will drop the table if it already exists
// // db.sequelize.sync({force: true}).then(() => {
// //   console.log('Drop and Resync Database with { force: true }');
// //   initial();
// // });

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });



// app.get("/roles", async (req, res) => {
//   try {
//     // Fetch all roles from the database
//     const roles = await Role.findAll();
//     // Send the roles as JSON response
//     res.json(roles);
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error("Error fetching roles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });





// // routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
//   Role.create({
//     id: 4,
//     name: "subadmin"
//   });
//   Role.create({
//     id: 5,
//     name: "sub_moderator"
//   });
// }





// // Import necessary modules
// const express = require("express");
// const cors = require("cors");

// // Create an instance of Express application
// const app = express();

// // Configure CORS
// // const corsOptions = {
// //   origin: "http://202.54.6.99:8081"
// // };

// app.use(cors());

// // Middleware to parse JSON and urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import database models
// const db = require("./app/models");
// const User = db.user;
// const Role = db.role;
// const UserRole = require("./app/models/index"); // Import user_role model

// // Sync database
// db.sequelize.sync();

// // Define a route to fetch roles
// app.get("/roles", async (req, res) => {
//   try {
//     // Fetch all roles from the database
//     const roles = await Role.findAll();
//     // Send the roles as JSON response
//     res.json(roles);
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error("Error fetching roles:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



// // Define a route to fetch all users
// app.get("/users", async (req, res) => {
//   try {
//     // Fetch all users from the database
//     const users = await User.findAll();
//     // Send the users as JSON response
//     res.json(users);
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });




// // Define a route to handle registration and update user_roles table
// app.post("/register", async (req, res) => {
//   try {
//     // Extract username, email, password, and role from request body
//     const { username, email, password, role } = req.body;

//     // Create the user in the users table
//     const newUser = await User.create({
//       username,
//       email,
//       password,
//       role
//     });

//     // Find the role from the roles table
//     const selectedRole = await Role.findOne({ where: { name: role } });

//     // Associate the user with the role in the user_roles table
//     await newUser.addRole(selectedRole);

//     // Send a success response
//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     // If an error occurs, send an error response
//     console.error("Error registering user:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Define other routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);

// // Set port and start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });





require("dotenv").config();
const nodemailer = require("nodemailer");
const multer = require("multer");
const bodyParser = require('body-parser');
const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://202.54.6.34:4011"
// };

// const allowedOrigins = ['http://localhost:4011', 'http://202.54.6.34:4011', 'http://183.182.84.228:4011'];

// // Enable CORS middleware with multiple allowed origins
// app.use(cors({
//   origin: allowedOrigins, // Allow requests from these origins
// }));

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

const { userrecord } = require("./app/models");
const { exec } = require('child_process');
const cron = require('node-cron');

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Adjust the limit as needed



app.use("/ledger", require("./controllers/ledger.controller"));
app.use("/mtfpo", require("./controllers/mtfpo.controller"));
app.use("/netpo", require("./controllers/netpo.controller"));
app.use("/portfo", require("./controllers/portfo.controller"));
app.use("/dpsoh", require("./controllers/dpsoh.controller"));
app.use("/nominee", require("./controllers/nominee.controller"));
app.use("/porteq", require("./controllers/porteq.controller"));
app.use("/portcom", require("./controllers/portcom.controller"));
app.use("/userrecords", require("./controllers/userrecords.controller"));




app.use("/mtf", require("./controllers/mtf.controller"));
app.use("/record", require("./controllers/person.controller"));
app.use("/diff", require("./controllers/diff.controller"));
app.use("/prio", require("./controllers/prio.controller"));
app.use("/letter", require("./controllers/letter.controller"));
app.use("/esign", require("./controllers/esign.controller"));
app.use("/liqus", require("./controllers/liqus.controller"));
app.use("/brok", require("./controllers/brok.controller"));
app.use("/sebi", require("./controllers/sebi.controller"));
app.use("/cuspa", require("./controllers/cuspa.controller"));
app.use("/ptt", require("./controllers/ptt.controller"));
app.use("/dbrok", require("./controllers/dbrok.controller"));
app.use("/crm", require("./controllers/crm.controller"));
app.use("/esdpsoh", require("./controllers/esdpsoh.controller"));
app.use("/pfdiff", require("./controllers/pfdiff.controller"));
app.use("/pfdiffrems", require("./controllers/pfdiffrem.controller"));
app.use("/predetail", require("./controllers/predetail.controller"));
app.use("/predetails", require("./controllers/predetails.controller"));
app.use("/predetailss", require("./controllers/predetailss.controller"));
app.use("/oorder", require("./controllers/oorder.controller"));
app.use("/ncorder", require("./controllers/ncorder.controller"));
app.use("/nporder", require("./controllers/nporder.controller"));
app.use("/dealslip", require("./controllers/dealslip.controller"));
app.use("/apdealer", require("./controllers/apdealer.controller"));
app.use("/krastatus", require("./controllers/krastatus.controller"));
app.use("/diffdata", require("./controllers/diffdata.controller"));
app.use("/kslledger", require("./controllers/kslledger.controller"));
app.use("/trialbal", require("./controllers/trialbal.controller"));
app.use("/ledgertur", require("./controllers/ledgertrn.controller"));
app.use("/dpsohdiff", require("./controllers/dpsohdiff.controller"));

app.use("/dptrans", require("./controllers/dptrans.controller"));
app.use("/isinmaster", require("./controllers/isinmaster.controller"));
app.use("/kslpf", require("./controllers/kslpf.controller"));
app.use("/removedboss", require("./controllers/removedboss.controller"));
app.use("/qtydiff", require("./controllers/qtydiff.controller"));
app.use("/tradeslip", require("./controllers/tradeslip.controller"));
app.use("/tabledate", require("./controllers/tabledate.controller"));
app.use("/ucccounts", require("./controllers/ucccounts.controller"));
app.use("/esldump", require("./controllers/esldump.controller"));
// app.use("/bhav", require("./controllers/bhav.controller"));
// set port, listen for requests

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}



require("dotenv").config();


const Route = require("./app/routes/route");


app.use(express.json());
app.use(
  cors({
    origin: ["http://eslinfo.exclusivegrp.com:4011", "http://183.182.84.228:4011" , "http://202.54.6.34:4011" ],
    methods: ["GET", "POST"],
  })
);

app.use("/api", Route);




const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// app.get('/openapp', (req, res) => {
//   exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', (error) => {
//       if (error) {
//           console.error('Error opening batch file:', error);
//           res.status(500).send('Failed to open batch file');
//       } else {
//           res.send('Batch file opened successfully');
//       }
//   });
// });














let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});


transporter.verify((err, success) => {
  if (err) {
      console.error("Error verifying transporter:", err);
  } else {
      console.log(`Server is ready to take messages: ${success}`);
  }
});

const upload = multer({ dest: 'uploads/' });

app.post("/send", upload.single('file'), function (req, res) {
  const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.recipients, // Modified to accept multiple email addresses
      subject: req.body.subject || 'AL Registration Form', // Use default subject if not provided
      text: req.body.message,
      attachments: [] // Initialize an empty array for attachments
  };

  if (req.file) {
      // If a file is attached, add it to the attachments array
      mailOptions.attachments.push({
          filename: req.file.originalname,
          path: req.file.path
      });
  }

  transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
          console.error("Error sending email:", err);
          res.json({
              status: "fail",
          });
      } else {
          console.log("Message Sent");
          res.json({
              status: "success",
          });
      }
  });
});




//multiple upload at a time

const uploads = multer({ dest: 'uploads/' }); // Multer setup

app.post("/multsend", uploads.array('file'), (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.recipients,
    subject: req.body.subject || 'AL Registration Form',
    text: req.body.message,
    attachments: [],
  };

  if (req.files && req.files.length > 0) {
    // Loop through all uploaded files and add them as attachments
    req.files.forEach((file) => {
      mailOptions.attachments.push({
        filename: file.originalname,
        path: file.path,
      });
    });
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.json({ status: "fail" });
    }
    console.log("Message Sent");
    res.json({ status: "success" });
  });
});























app.post("/newsend", upload.single('file'), function (req, res) {
  const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.recipients, // Modified to accept multiple email addresses
      subject: req.body.subject || 'AL Registration Form', // Use default subject if not provided
      text: req.body.message,
      attachments: [] // Initialize an empty array for attachments
  };

  // Specify the path to the file you want to attach
  const filePath = 'Running_Account_22Sept22.pdf';

  // Add the file to the attachments array
  mailOptions.attachments.push({
      filename: 'Running_Account.pdf',
      path: filePath
  });

  transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
          console.error("Error sending email:", err);
          res.json({
              status: "fail",
          });
      } else {
          console.log("Message Sent");
          res.json({
              status: "success",
          });
      }
  });
});

























app.post('/sends', async (req, res) => {
  try {
    const detail = req.body.uccDetail;
    if (!detail) {
      return res.status(400).json({ status: "fail", message: "Invalid UCC detail" });
    }

    const { username, name, panno, kslucc, dpId, incomeRange, mailid } = detail;

    if (!kslucc) {
      return res.status(400).json({ status: "fail", message: "Missing UCC" });
    }

    const existingRecord = await userrecord.findOne({ where: { kslucc } });
    if (existingRecord) {
      return res.status(400).json({ status: "fail", message: `UCC ${kslucc} already exists` });
    }

    const message = `Dear Sir,

    Please Ignore Previous mail and revert this One.

    Please activate my account.
    
    1. Name - ${name}
    2. PAN no. - ${panno}
    3. Client Code - ${kslucc}
    4. Client DP ID - ${dpId}
    5. There is no change in my KYC.
    6. Income Range As On 31/03/24: ${incomeRange}
    7. Consent dormancy activation: YES
    8. Pep (Politically Exposed Person): NO
    9. Relative PEP: NO
    
    Please check and forward this email to the following email IDs:
    joshi.tarun@kotak.com, damian.vaz@kotak.com, koushlendra.upadhyay@kotak.com, info@exclusivegroup.co.in
    
    Regards,
    Thank You`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: mailid,
      subject: 'Dormancy Activation Request',
      text: message,
    };

    const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;


    try {
      await transporter.sendMail(mailOptions);
      await userrecord.create({ username, name, panno, kslucc, dpId, incomeRange, mailid ,date : formattedDate });
      res.status(200).json({ status: "success", message: `Email sent for UCC ${kslucc}` });
    } catch (error) {
      console.error(`Failed to send email to ${mailid}: ${error.message}`);
      res.status(500).json({ status: "fail", message: error.message });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});











// app.post('/sendss', async (req, res) => {
//   try {
//     const detail = req.body.uccDetail;
//     if (!detail) {
//       return res.status(400).json({ status: "fail", message: "Invalid UCC detail" });
//     }

//     const { username, name, panno, kslucc, dpId, incomeRange, mailid } = detail;

//     if (!kslucc) {
//       return res.status(400).json({ status: "fail", message: "Missing UCC" });
//     }

//     const existingRecord = await userrecord.findOne({ where: { kslucc } });
//     const message = `Dear Sir,

//     Please Ignore Previous mail and revert this One.

//     Please activate my account.
    
//     1. Name - ${name}
//     2. PAN no. - ${panno}
//     3. Client Code - ${kslucc}
//     4. Client DP ID - ${dpId}
//     5. There is no change in my KYC.
//     6. Income Range As On 31/03/24: ${incomeRange}
//     7. Consent dormancy activation: YES
//     8. Pep (Politically Exposed Person): NO
//     9. Relative PEP: NO
    
//     Please check and forward this email to the following email IDs:
//     joshi.tarun@kotak.com, damian.vaz@kotak.com, koushlendra.upadhyay@kotak.com, info@exclusivegroup.co.in
    
//     Regards,
//     Thank You`;

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: mailid,
//       subject: 'Dormancy Activation Request',
//       text: message,
//     };

//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

//     try {
//       await transporter.sendMail(mailOptions);

//       if (existingRecord) {
//         await userrecord.update({ date: formattedDate , username }, { where: { kslucc } });
//         res.status(200).json({ status: "success", message: `Email sent and date updated for UCC ${kslucc}` });
//       } else {
//         await userrecord.create({ username, name, panno, kslucc, dpId, incomeRange, mailid, date: formattedDate });
//         res.status(200).json({ status: "success", message: `Email sent and record created for UCC ${kslucc}` });
//       }
//     } catch (error) {
//       console.error(`Failed to send email to ${mailid}: ${error.message}`);
//       res.status(500).json({ status: "fail", message: error.message });
//     }
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// });























app.post('/sendss', async (req, res) => {
  try {
    const detail = req.body.uccDetail;
    if (!detail) {
      return res.status(400).json({ status: "fail", message: "Invalid UCC detail" });
    }

    const { username, name, panno, kslucc, dpId, incomeRange, mailid } = detail;

    if (!kslucc) {
      return res.status(400).json({ status: "fail", message: "Missing UCC" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mailid)) {
      return res.status(400).json({ status: "fail", message: "Invalid email address" });
    }

    const existingRecord = await userrecord.findOne({ where: { kslucc } });

    const message = `Dear Sir,

    Please Ignore Previous mail and revert this One.

    Please activate my account.
    
    1. Name - ${name}
    2. PAN no. - ${panno}
    3. Client Code - ${kslucc}
    4. Client DP ID - ${dpId}
    5. There is no change in my KYC.
    6. Income Range As On 31/03/24: ${incomeRange}
    7. Consent dormancy activation: YES
    8. Pep (Politically Exposed Person): NO
    9. Relative PEP: NO
    
    Please check and forward this email to the following email IDs:
    joshi.tarun@kotak.com, damian.vaz@kotak.com, koushlendra.upadhyay@kotak.com, info@exclusivegroup.co.in
    
    Regards,
    Thank You`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: mailid,
      subject: 'Dormancy Activation Request',
      text: message,
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    try {
      await transporter.sendMail(mailOptions);
      
      if (existingRecord) {
        await userrecord.update({ date: formattedDate, username }, { where: { kslucc } });
        res.status(200).json({ status: "success", message: `Email sent and date updated for UCC ${kslucc}` });
      } else {
        await userrecord.create({ username, name, panno, kslucc, dpId, incomeRange, mailid, date: formattedDate });
        res.status(200).json({ status: "success", message: `Email sent and record created for UCC ${kslucc}` });
      }
    } catch (error) {
      console.error(`Failed to send email: ${error.message}`);
      console.error(`Error details: ${error.stack}`);
      res.status(500).json({ status: "fail", message: "Failed to send email.", error: error.message });
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
    res.status(500).json({ status: "fail", message: "Unexpected server error." });
  }
});







// app.post('/run-batch', async (req, res) => {
//   try {
//     exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', (error) => {
//       if (error) {
//         console.error('Error opening batch file:', error);
//         return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
//       }
//       res.status(200).json({ status: "success", message: 'Batch file executed' });
//     });
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// });


// app.post('/run-batch', async (req, res) => {
//   try {
//     const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

//     // Check if today's date is already in the database
//     const existingRecord = await db.UpdateCount.findOne({ where: { date: today } });

//     if (existingRecord) {
//       // Update the count for today's date
//       await db.UpdateCount.update(
//         { count: existingRecord.count + 1 },
//         { where: { date: today } }
//       );
//       exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', async (error) => {
//         if (error) {
//           console.error('Error opening batch file:', error);
//           return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
//         }

//         try {
//           await db.UpdateCount.create({ date: today, count: 1 });
//           res.status(200).json({ status: "success", message: 'Batch file executed and count updated' });
//         } catch (dbError) {
//           console.error('Error updating database:', dbError.message);
//           res.status(500).json({ status: "fail", message: 'Failed to update database' });
//         }
//       });
//       res.status(200).json({ status: "success", message: 'Count updated for today' });
//     } else {
//       // Execute the batch file and create a new record
//       exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', async (error) => {
//         if (error) {
//           console.error('Error opening batch file:', error);
//           return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
//         }

//         try {
//           await db.UpdateCount.create({ date: today, count: 1 });
//           res.status(200).json({ status: "success", message: 'Batch file executed and count updated' });
//         } catch (dbError) {
//           console.error('Error updating database:', dbError.message);
//           res.status(500).json({ status: "fail", message: 'Failed to update database' });
//         }
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// });






const executeBatchFileAndRespond = (res, isNewRecord = false) => {
  exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', async (error) => {
    if (error) {
      console.error('Error opening batch file:', error);
      return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
    }

    res.status(200).json({ status: "success", message: `Batch file executed and ${isNewRecord ? 'new record created' : 'count updated'}` });
  });
};

app.post('/run-batch', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    // Check if today's date is already in the database
    const existingRecord = await db.UpdateCount.findOne({ where: { date: today } });

    if (existingRecord) {
      // Update the count for today's date
      await db.UpdateCount.update(
        { count: existingRecord.count + 1 },
        { where: { date: today } }
      );

      executeBatchFileAndRespond(res);
    } else {
      // Create a new record for today's date
      await db.UpdateCount.create({ date: today, count: 1 });

      executeBatchFileAndRespond(res, true);
    }
  } catch (dbError) {
    console.error('Error updating database:', dbError.message);
    if (!res.headersSent) {
      res.status(500).json({ status: "fail", message: 'Failed to update database' });
    }
  }
});








const executeBatchFile = (res) => {
  exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\QtyDiff\\Kslpf.bat"', (error) => {
    if (error) {
      console.error('Error opening batch file:', error);
      return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
    }

    res.status(200).json({ status: "success", message: 'Batch file executed successfully' });
  });
};

app.post('/run-kslpf', (req, res) => {
  try {
    // Directly execute the batch file without any database logic
    executeBatchFile(res);
  } catch (error) {
    console.error('Error executing batch file:', error);
    if (!res.headersSent) {
      res.status(500).json({ status: "fail", message: 'Error running batch file' });
    }
  }
});








const executeBatch = (res) => {
  exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\QtyDiff\\removedboss.bat"', (error) => {
    if (error) {
      console.error('Error opening batch file:', error);
      return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
    }

    res.status(200).json({ status: "success", message: 'Batch file executed successfully' });
  });
};

app.post('/run-remove', (req, res) => {
  try {
    // Directly execute the batch file without any database logic
    executeBatch(res);
  } catch (error) {
    console.error('Error executing batch file:', error);
    if (!res.headersSent) {
      res.status(500).json({ status: "fail", message: 'Error running batch file' });
    }
  }
});












app.post('/check-and-run', async (req, res) => {
  try {
    const givenTime = new Date();
    givenTime.setHours(10, 0, 0, 0); // Set to 10:00 AM

    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    if (now < givenTime) {
      return res.status(400).json({ status: "fail", message: "The given time has not passed yet" });
    }

    const existingRecord = await db.UpdateCount.findOne({ where: { date: today } });

    if (existingRecord) {
      return res.status(200).json({ status: "info", message: 'Batch file already triggered today' });
    } else {
      exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', async (error) => {
        if (error) {
          console.error('Error opening batch file:', error);
          return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
        }

        try {
          await db.UpdateCount.create({ date: today, count: 1 });
          res.status(200).json({ status: "success", message: 'Batch file executed and count updated' });
        } catch (dbError) {
          console.error('Error updating database:', dbError.message);
          res.status(500).json({ status: "fail", message: 'Failed to update database' });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

// Schedule the cron job
// cron.schedule('0 10 * * *', async () => {
//   try {
//     // Trigger the /check-and-run endpoint
//     await axios.post('http://183.182.84.228:4005/check-and-run');
//     console.log('Scheduled task executed at 10:00 AM');
//   } catch (error) {
//     console.error('Error executing scheduled task:', error);
//   }
// });





// Endpoint to check date and trigger batch file if needed
// app.post('/check-and-run', async (req, res) => {
//   try {
//     const givenTime = new Date();
//     givenTime.setHours(10, 0, 0, 0); // Set to 9:05 AM

//     const now = new Date();
//     const today = now.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

//     if (now < givenTime) {
//       return res.status(400).json({ status: "fail", message: "The given time has not passed yet" });
//     }

//     const existingRecord = await db.UpdateCount.findOne({ where: { date: today } });

//     if (existingRecord) {
//       return res.status(200).json({ status: "info", message: 'Batch file already triggered today' });
//     } else {
//       exec('start cmd.exe /k "C:\\Users\\anujj\\Desktop\\bat\\DailyTasks.bat"', async (error) => {
//         if (error) {
//           console.error('Error opening batch file:', error);
//           return res.status(500).json({ status: "fail", message: 'Failed to open batch file' });
//         }

//         try {
//           await db.UpdateCount.create({ date: today, count: 1 });
//           res.status(200).json({ status: "success", message: 'Batch file executed and count updated' });
//         } catch (dbError) {
//           console.error('Error updating database:', dbError.message);
//           res.status(500).json({ status: "fail", message: 'Failed to update database' });
//         }
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ status: "fail", message: error.message });
//   }
// });

















// app.post('/sends', async (req, res, next) => {
//   try {
//     const uccDetails = req.body.uccDetails; // Assuming uccDetails is an array of objects with { username, name, panno, kslucc, dpId, incomeRange, mailid }
    
//     if (!uccDetails || !Array.isArray(uccDetails) || uccDetails.length === 0) {
//       return res.status(400).json({ status: "fail", message: "Missing or invalid UCC details" });
//     }

//     let successCount = 0;
//     let failCount = 0;

//     for (const detail of uccDetails) {
//       const { username, name, panno, kslucc, dpId, incomeRange, mailid } = detail;

//       if (!username || !name || !panno || !kslucc || !dpId || !incomeRange || !mailid) {
//         failCount++;
//         continue;
//       }

//       const existingRecord = await userRecord.findOne({ where: { kslucc } });

//       if (existingRecord) {
//         failCount++;
//         continue;
//       }

//       const message = `Dear Sir,

// Please activate my account.

// 1. Name - ${name}
// 2. PAN no. - ${panno}
// 3. Client Code - ${kslucc}
// 4. Client DP ID - ${dpId}
// 5. There is no change in my KYC.
// 6. Income Range As On 31/03/24: ${incomeRange}
// 7. Consent dormancy activation: YES
// 8. Pep (Politically Exposed Person): NO
// 9. Relative PEP: NO

// Please check and forward this email to the following email IDs:
// joshi.tarun@kotak.com, damian.vaz@kotak.com, koushlendra.upadhyay@kotak.com, info@exclusivegroup.co.in

// Regards,
// Thank You`;

//       const mailOptions = {
//         from: process.env.EMAIL,
//         to: mailid,
//         subject: 'Dormancy Activation Request',
//         text: message,
//       };

//       try {
//         await transporter.sendMail(mailOptions);
//         successCount++;

//         // Update userRecord only if email is successfully sent
//         await userRecord.create({
//           username,
//           name,
//           panno,
//           kslucc,
//           dpId,
//           incomeRange,
//           mailid
//         });

//       } catch (error) {
//         failCount++;
//       }
//     }

//     return res.status(200).json({ status: "success", message: "Emails processed", successCount, failCount });
//   } catch (error) {
//     return next(new Error(error.message, 500));
//   }
// });


// app.post('/sends', async (req, res) => {
//   try {
//       const { username, name, panno, kslucc, dpId, incomeRange, mailid } = req.body;
//       const existingRecord = await db.userrecord.findOne({ where: { kslucc } });

//       if (existingRecord) {
//           return res.status(400).json({ status: "fail", message: "UCC already exists" });
//       }

//       const message = `Dear Sir,

//       Please activate my account.

//       1. Name - ${name}
//       2. PAN no. - ${panno}
//       3. Client Code - ${kslucc}
//       4. Client DP ID - ${dpId}
//       5. There is no change in my KYC.
//       6. Income Range As On 31/03/24: ${incomeRange}
//       7. Consent dormancy activation: YES
//       8. Pep (Politically Exposed Person): NO
//       9. Relative PEP: NO

//       Please check and forward this email to the following email IDs:
//       joshi.tarun@kotak.com, damian.vaz@kotak.com, koushlendra.upadhyay@kotak.com, info@exclusivegroup.co.in

//       Regards,
//       Thank You`;

//       const mailOptions = {
//           from: process.env.EMAIL,
//           to: mailid,
//           subject: 'Dormancy Activation Request',
//           text: message,
//       };

//       await transporter.sendMail(mailOptions);

//       // Update the user record in the database
//       await db.userrecord.create({
//           kslucc,
//           username,
//           name,
//           panno,
//           dpId,
//           incomeRange,
//           mailid
//       });

//       res.status(200).json({ status: "success", message: "Message Sent" });
//   } catch (error) {
//       console.error("Error:", error);
//       res.status(500).json({ status: "fail", message: error.message });
//   }
// });





// transporter.verify((err, success) => {
//   err
//       ? console.log(err)
//       : console.log(`=== Server is ready to take messages: ${success} ===`);
// });

// const upload = multer({ dest: 'uploads/' });

// app.post("/send", upload.single('file'), function (req, res) {
//   let mailOptions = {
//       from: process.env.EMAIL,
//       to: req.body.recipients, // Modified to accept multiple email addresses
//       subject: req.body.subject ? req.body.subject : 'AL Registration Form',
//       text: `${req.body.message}`,
//       attachments: [
//           {
//               filename: req.file.originalname,
//               path: req.file.path
//           }
//       ]
//   };
//   transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//           res.json({
//               status: "fail",
//           });
//       } else {
//           console.log("== Message Sent ==");
//           res.json({
//               status: "success",
//           });
//       }
//   });
// });











// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       pass: process.env.WORD,
//       clientId: process.env.OAUTH_CLIENTID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
// });











// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log("Server listening on port " + port));




// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         pass: process.env.WORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//     },
//   });
//   transporter.verify((err, success) => {
//     err
//         ? console.log(err)
//         : console.log(`=== Server is ready to take messages: ${success} ===`);
//   });
  
//   const upload = multer({ dest: 'uploads/' });
  
//   app.post("/send", upload.single('file'), function (req, res) {
//     let mailOptions = {
//         from: process.env.EMAIL,
//         to: req.body.recipients, // Modified to accept multiple email addresses
//         subject: `AL Registration Form`,
//         text: `${req.body.message}`,
//         attachments: [
//             {
//                 filename: req.file.originalname,
//                 path: req.file.path
//             }
//         ]
//     };
  
//     transporter.sendMail(mailOptions, function (err, data) {
//         if (err) {
//             res.json({
//                 status: "fail",
//             });
//         } else {
//             console.log("== Message Sent ==");
//             res.json({
//                 status: "success",
//             });
//         }
//     });
//   });
  