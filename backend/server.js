const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const contactRoutes = require('./Router/contactRoutes');
const packageDetailRoutes = require('./Router/packageDetailsRouter')
const packageRoutes  = require('./Router/packageRouter');
const vehicleRouter = require('./Router/vehicleRouter');
const tourFormRoutes = require('./Router/tourFormRoutes');
const serviceRoutes = require('./Router/serviceRouter')
const TopcontactRoutes = require('./Router/TopcontactRouter')
const PopupRoutes = require('./Router/popupRouter')
const TopbarRoutes = require('./Router/TopbarRoutes');
const TripRoutes = require('./Router/TripRouter');
const onewayRoutes = require('./Router/onewayRouter')
const RoundRoutes = require('./Router/roundTripRoutes')
const username = 'sarantours'; 
const password = 'saran123';
 // Adjusted import path
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello World!'); // Example route
});
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
app.use('/package', packageRoutes);
app.use('/packagedetail', packageDetailRoutes);
app.use('/services', serviceRoutes);
app.use('/topcontact', TopcontactRoutes)
app.use('/topbar',TopbarRoutes );
app.use('/popup',PopupRoutes );
app.use('/trip',TripRoutes );
app.use("/oneway", onewayRoutes)
app.use("/roundtrip",RoundRoutes)
// Merge route for fetching package details
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
    const validUsername = 'sarantours'; // Use the username defined at the top
    const validPassword = 'saran123'; // Use the password defined at the top
  
    if (email === validUsername && password === validPassword) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  
// contact

app.post('/api/contact', async (req, res) => {
  console.log('Contact form submitted');
  try {
    const formData = req.body;
    console.log('Form data:', formData); // Log the form data to check if it's received correctly

    // Save the form data to the database


    // Send email with form details
    await sendContactEmail(formData);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting Franschise form:', error);
    res.status(500).json({ error: 'Failed to submit franschise form' });
  }
}); 
async function sendContactEmail(formData) {
  try {
    const mailOptions = {
      from: 'hrhellowtec@gmail.com',
      to: 'dhanalakshmihellotech@gmail.com', // Replace with recipient email address
      subject: 'New Contact Form Submission',
      text: `Form Details:\nUsername: ${formData.name}\nEmail: ${formData.email}\nPhone Number: ${formData.phoneNumber}\nSubject: ${formData.subject}\nMessage: ${formData.message}\nCategory: ${formData.category}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact email');
  }
}



// enquiry

app.post('/api/enquiry', async (req, res) => {
  console.log('Contact form submitted');
  try {
    const formData = req.body;
    console.log('Form data:', formData); // Log the form data to check if it's received correctly

    // Save the form data to the database


    // Send email with form details
    await sendEnquiryEmail(formData);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting Franschise form:', error);
    res.status(500).json({ error: 'Failed to submit franschise form' });
  }
}); 
async function sendEnquiryEmail(formData) {
  try {
    const mailOptions = {
      from: 'hrhellowtec@gmail.com',
      to: 'dhanalakshmihellotech@gmail.com', // Replace with recipient email address
      subject: 'New Contact Form Submission',
      text: `Form Details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone Number: ${formData.phoneNumber}\nSubject: ${formData.subject}\nMessage: ${formData.message}\nDate of Birth: ${formData.dateOfBirth}\nAddress: ${formData.address}\nPreferred Appointment Date & Time: ${formData.preferredAppointmentDateTime}\nPreferred Days: ${formData.preferredDays.join(', ')}\nBest Time To Call: ${formData.bestTimeToCall}\nAppointment Type: ${formData.appointmentType}`
      };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact email');
  }
}











// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
