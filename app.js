//https://www.youtube.com/watch?v=cl186ePedMg&ab_channel=Helpfolder -> instalare curl
//https://medium.com/@vikas.taank_40391/everything-that-you-need-to-know-about-oauth2-fb6a29b59e46 -> OAuth
//https://www.youtube.com/watch?v=ZV5yTm4pT8g&ab_channel=ByteByteGo -> despre OAuth , despre proces
// https://frontegg.com/blog/oauth-vs-jwt

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
