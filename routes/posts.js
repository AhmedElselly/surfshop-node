const express = require('express');
const router = express.Router();
const multer = require("multer");
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {asyncErrorHandler, isLoggedIn, isAuthor, searchAndFilterPosts} = require("../middleware");
const {
        postIndex,
        postNew,
        postCreate,
        postShow,
        postEdit,
        postUpdate,
        postDelete
      } = require("../controllers/posts");

/* GET posts index /posts. */
router.get('/', asyncErrorHandler(searchAndFilterPosts), asyncErrorHandler(postIndex));

//this is the new post page
router.get("/new", isLoggedIn, postNew);

//this is the post route
router.post("/", isLoggedIn, upload.array("images", 4), asyncErrorHandler(postCreate));

//this is the show route
router.get("/:id", asyncErrorHandler(postShow));

//this is the edit page
router.get("/:id/edit", isLoggedIn, asyncErrorHandler(isAuthor), postEdit);

//posting the update route
router.put("/:id", isLoggedIn, asyncErrorHandler(isAuthor), upload.array("images", 4), asyncErrorHandler(postUpdate));

//the delete route
router.delete("/:id", isLoggedIn, asyncErrorHandler(isAuthor), asyncErrorHandler(postDelete));

module.exports = router;
