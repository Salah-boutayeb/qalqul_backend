const axios = require("axios");

const instance = axios.create({
  baseURL: "https://graph.facebook.com/",
  headers: { Authorization: "Bearer " + process.env.ACCESS_TOKEN },
});

const createPost = async (mssg) => {
  let id = null;
  await instance
    .post("106383002364551/feed", { message: mssg })
    .then((res) => {
      console.log(res.data);
      id = res.data.id;
    })
    .catch((err) => console.log(err));
  return id;
};

const getPostsService = async () => {
  let data = null;
  await instance
    .get("106383002364551/feed")
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err));
  return data;
};

const deletePostService = async (id) => {
  let data = null;
  await instance
    .delete(id)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err));
  return getPostsService();
};

const getPostService = async (id) => {
  let data = null;
  await instance
    .get("" + id)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err));
  await instance
    .get(id + "/comments")
    .then((response) => {
      data["comments"] = response.data.data;
    })
    .catch((err) => console.log(err));
  console.log(data);
  return data;
};
module.exports = {
  createPost,
  getPostsService,
  getPostService,
  deletePostService,
};
