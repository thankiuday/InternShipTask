import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  image: { type: String }, // Store image filename
}, { timestamps: true });

const Employee = mongoose.model('t_Employee', employeeSchema);

export default Employee;
