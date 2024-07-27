const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/user');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log(error);
  });

const jobs = [
  { companyName: "Tech Solutions", role: "Software Engineer", experience: "3 years", place: "Bangalore" },
  { companyName: "Innovatech", role: "Front End Developer", experience: "2 years", place: "Hyderabad" },
  { companyName: "WebCrafters", role: "Full Stack Developer", experience: "4 years", place: "Chennai" },
  { companyName: "AppDynamics", role: "React Developer", experience: "1 year", place: "Pune" },
  { companyName: "CodeWorks", role: "UI/UX Designer", experience: "5 years", place: "Mumbai" }
];

app.get('/getuser/:id', async (req, res) => {
    const { id } = req.params; // Correctly destructure id from req.params
  
    try {
      const user = await UserModel.findById(id); // Use findById method to find the user
  
      if (user) {
        res.send({ user }); // Send user data if found
      } else {
        res.status(404).send({ message: 'User not found' }); // Send 404 if user is not found
      }
    } catch (error) {
      console.error(error); // Log error
      res.status(500).send({ message: 'An error occurred', error }); // Send error response
    }
  });
  

app.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ name });

    if (existingUser) {
      res.send({ message: 'Username already taken' });
    } else {
      const newUser = new UserModel({ name, password });
      await newUser.save();
      res.send({ message: 'Signup successful', user: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An error occurred during signup', error });
  }
});

app.post('/apply/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (user) {
    user.applications.push(req.body);
    await user.save();
    res.send({ message: 'Application successful', user });
  } else {
    res.send({ message: 'Application failed' });
  }
});

app.get('/jobs', (req, res) => {
  res.send(jobs);
});

app.get('/applied/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  res.send(user.applications);
});

app.post('/search', (req, res) => {
  const { role } = req.body;
  const filteredJobs = jobs.filter((job) => job.role === role);
  res.send(filteredJobs);
});

app.listen(2000, () => {
  console.log('Server started on port 2000');
});