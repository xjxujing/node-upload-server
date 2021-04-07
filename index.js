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

  // console.log(req.file)
  const { filename, originalname } = req.file
  res.send({ filename, originalname, url: `/preview/${filename}` })
})

app.get("/preview/:key", cors(), (req, res) => {
  // console.log(req.params.key)
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      // eslint-disable-next-line no-undef
      root: __dirname,
      headers: {
        "Content-Type": "image/*"
      },
    },
    error => {
      console.log(error)
    })
})

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000
// console.log(port)
app.listen(port)
