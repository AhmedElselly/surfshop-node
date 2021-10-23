const express = require('express');
const router = express.Router({ mergeParams: true });
const {asyncErrorHandler, isReviewAutor} = require('../middleware');
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete
} = require('../controllers/reviews');

//this is the post route
router.post("/", asyncErrorHandler(reviewCreate));

//posting the update route
router.put("/:review_id", isReviewAutor, asyncErrorHandler(reviewUpdate));

//the delete route
router.delete("/:review_id", isReviewAutor, asyncErrorHandler(reviewDelete));

module.exports = router;
