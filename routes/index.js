const express = require("express");
const router = express.Router();
const {
  postPost,
  getPosts,
  getPost,
  getRealtimeComments,
  webhook,
} = require("../controller/index.js");
router.post("/post", postPost);
router.get("/post", getPosts);
router.get("/post/:id", getPost);
router.get("/webhook", getRealtimeComments);
router.post("/webhook", webhook);

module.exports = router;
