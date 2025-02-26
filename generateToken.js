const { google } = require("googleapis");
const readline = require("readline");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/gmail.send"],
});

console.log("Authorize this app by visiting this URL:", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    console.log("Your refresh token:", token.refresh_token);
  });
});
