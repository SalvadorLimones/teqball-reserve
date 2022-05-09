const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send("All inputs are required");
  const resp = await axios.post("https://oauth2.googleapis.com/token", {
    code: code,
    client_id:
      "940759968390-adatai7857f9o4vu7e5u53i6g4bk0rfl.apps.googleusercontent.com",
    client_secret: "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",
    redirect_uri: "http://localhost:3000/callback",
    grant_type: "authorization_code",
  });
  const accessToken = resp.data.access_token;
  console.log("RESPDATA", resp.data);

  /*   const token = jwt.sign({ user_id: decoded.sub }, process.env.TOKEN_KEY, {
    expiresIn: 60 * 60,
  }); */

  //return res.json(resp.data);

  const response = await axios.post(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      summary: "Teqball game",
      description: `Game time at Akárhol.`,
      location: `Budapest`,
      colorId: "6",
      start: {
        dateTime: "2022-05-10T16:00:00+02:00",
      },

      end: {
        dateTime: "2022-05-10T19:00:00+02:00",
      },
    },
    {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    }
  );

  /*   const user_id = decoded.sub;
  const token = jwt.sign({ id: user_id }, "secret", {
    expiresIn: 60 * 60,
  });
  res.json(token); */
});

module.exports = router;

//Client ID:
// 940759968390-adatai7857f9o4vu7e5u53i6g4bk0rfl.apps.googleusercontent.com

//Client secret:

// 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

/* const response = await calendar.events.insert({
  auth: oauth2Client,
  calendarId: 'primary',
  requestBody: {
      summary: "Teqball game",
      description: `Game time at ${eventVenue}.`,
      location: `${eventCity}, ${eventAddress}`,
      colorId: '6',
      start: {
          dateTime: new Date(`${eventDate} ${eventTime}`),
      },

end: {
          dateTime: new Date(`${eventDate} ${eventTime}`),
      }

  }
});
res.send(response);
} catch (error) {
console.log(error); */

/* Áron Tombácz11:31
const {google} = require('googleapis');
const calendar = google.calendar('v3');
 */
