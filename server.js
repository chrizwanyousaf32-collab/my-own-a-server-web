import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my_photos",
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send(`
    <h1>Upload a Photo</h1>

    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="photo">
      <button>Upload</button>
    </form>
  `);
});

app.post("/upload", upload.single("photo"), (req, res) => {
  res.send(`
    <h2>Photo Uploaded Successfully!</h2>

    <img src="${req.file.path}" width="300">

    <br><br>

    <p>Image URL:</p>

    <a href="${req.file.path}" target="_blank">${req.file.path}</a>

    <br><br>

    <a href="/">Upload Another</a>
  `);
});

app.listen(3000, () => {
  console.log("Server running...");
});