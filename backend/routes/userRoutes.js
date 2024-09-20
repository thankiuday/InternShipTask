// /routes/userRoutes.js
import express from 'express';
import bcrypt  from 'bcryptjs';
import toast from 'react-hot-toast'
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import multer from 'multer';
import Employee from '../models/Employee.js';
import upload from '../middleware/upload.js'; 
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
   const email = req.body.email;
   const password = req.body.password;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      user = new User({
        email : email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
  
// Login
router.post('/login', async (req, res) => {
  const email =req.body.email;
  const password = req.body.password;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if(password.length < 3)
    {
      toast.error('Password must be at least 3 characters')
    }
    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token back
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
 });
// getting token
 router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);  // Respond with JSON data
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Route for creating a new employee
router.post('/create-employee', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: req.file ? req.file.filename : null,  // Save the uploaded image name
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Update an employee by ID
router.put('/employees/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Update employee details
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.mobile = mobile || employee.mobile;
    employee.designation = designation || employee.designation;
    employee.gender = gender || employee.gender;
    employee.course = course || employee.course;
    if (req.file) {
      employee.image = req.file.filename; // Update image if a new one is uploaded
    }

    await employee.save();
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// /routes/userRoutes.js
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default  router;
