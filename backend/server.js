// /server.js
import express from 'express'
import dotenv  from 'dotenv'
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'; // Import CORS middleware

const app = express();
// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173' // Allow only this origin
  }));


dotenv.config();
connectDB();

  
app.use(express.json());

app.use('/login', userRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
