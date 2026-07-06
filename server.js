import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

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
  cloudinary,
  params: {
    folder: "my_photos",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// Home
app.get("/", (req, res) => {
  res.redirect("/upload");
});

// Upload Page
app.get("/upload", (req, res) => {
  res.send(`
    <h1>Upload Photo</h1>

    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="photo" required>
      <br><br>
      <button type="submit">Upload</button>
    </form>
  `);
});

// Upload Image
app.post("/upload", upload.single("photo"), (req, res) => {
  res.send(`
    <h1>Photo Uploaded ✅</h1>

    <img src="${req.file.path}" width="300">

    <p>
      <a href="${req.file.path}" target="_blank">Open Image</a>
    </p>

    <p>
      <a href="/upload">Upload Another</a>
    </p>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});