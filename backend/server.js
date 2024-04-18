const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const contactRoutes = require('./Router/contactRoutes');
const vehicleRouter = require('./Router/vehicleRouter');
const tourFormRoutes = require('./Router/tourFormRoutes'); // Adjusted import path
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies in a middleware
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Routes
app.use('/tourform', tourFormRoutes);
app.use('/vecform', vehicleRouter);
app.use('/contacts', contactRoutes);
// Connect to MongoDB
mongoose.connect("mongodb+srv://dhanalakshmihellotech:SIsXafSMfzzbw46A@saran.9hvu8ly.mongodb.net/saran", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


  
const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
      user: 'hrhellowtec@gmail.com', // Replace with your Gmail email address
      pass: 'hgvg nmis mcnf egxq' // Replace with your Gmail password
    }
  });

  app.post('/api/send-reset-email', async (req, res) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: 'Email address is required' });
    }
  
    const mailOptions = {
      from: 'hrhellowtec@gmail.com',
      to: email,
      subject: 'Hello',
      text: `Mailid: ${username}\nPassword: ${password}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ error: 'Failed to send reset password email' });
      } else {
        console.log('Reset email sent:', info.response);
        res.status(200).json({ message: 'Reset password email sent successfully' });
      }
    }); 
  });
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Perform authentication logic here
    const validUsername = 'shafichannel123@gmail.com'; // Use the username defined at the top
    const validPassword = 'shafi123'; // Use the password defined at the top
  
    if (email === validUsername && password === validPassword) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  















// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
