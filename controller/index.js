const {
  createPost,
  getPostsService,
  getPostService,
} = require("../service/index");

const postPost = async (req, res) => {
  const msg = req.body.message;

  console.log(msg);

  const id = await createPost(msg);
  res.status(200).send(id);
};
const getPosts = async (req, res) => {
  const data = await getPostsService();
  res.status(200).send(data);
};
const getPost = async (req, res) => {
  const id = req.params.id;
  const data = await getPostService(id);
  res.status(200).send(data);
};
const webhook = (req, res) => {
  console.log(req.body);
  console.log(req.body.entry[0].changes);
  console.log(typeof req.body.entry);

  req.body.entry.forEach((entry) => {
    entry.messaging.forEach((event) => {
      if (event.message && event.message.text) {
        sendMessage(event);
      }
    });
  });

  res.status(200);
};
const getRealtimeComments = (req, res) => {
  console.log("helloo webhook");
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "ertdfgcvb12345";

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
module.exports = { postPost, getPosts, getPost, getRealtimeComments, webhook };
