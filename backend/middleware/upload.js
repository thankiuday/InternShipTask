import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the uploads directory
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid conflicts
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
