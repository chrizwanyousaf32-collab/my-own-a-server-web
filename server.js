import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store uploads in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my_photos",
  },
});

const upload = multer({ storage });

// Home Page
app.get("/", (req, res) => {
  res.send(`
    <h1>Upload Photo</h1>

    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="photo" required>
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload Route
app.post("/upload", upload.single("photo"), (req, res) => {
  res.send(`
    <h1>Photo Uploaded Successfully ✅</h1>

    <img src="${req.file.path}" width="300">

    <br><br>

    <a href="/">Upload Another Photo</a>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running...");
});