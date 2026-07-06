import express from "express";
import multer from "multer";

const app = express();

const upload = multer({ dest: "uploads/" });

app.use("/uploads", express.static("uploads"));

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
    <h2>Photo Uploaded!</h2>

    <img src="/uploads/${req.file.filename}" width="300">

    <br><br>

    <a href="/">Upload Another</a>
  `);
});

app.listen(3000, () => {
  console.log("Server running...");
});