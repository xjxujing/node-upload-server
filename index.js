const express = require("express")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
const cors = require("cors")
const app = express()


app.options("/upload", cors())
app.get("/", (req, res) => {
  res.send("hello")
})

app.post("/upload", cors(), upload.single("file"), (req, res) => {

  console.log(req.file)
  const { filename, originalname } = req.file
  res.send({ filename, originalname })
})

app.get("/preview/:key", (req, res) => {
  res.sendFile()
})

app.listen(3000)
