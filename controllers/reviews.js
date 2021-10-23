const Post = require("../models/post");
const Review = require('../models/review');

module.exports = {
    //Reviews create
    async reviewCreate(req, res, next){
       //find the post by it's id
       let post = await Post.findById(req.params.id);
       //create the review
       req.body.review.author = req.user._id;
       let review = await Review.create(req.body.review);
       //sign the review to the post
       post.reviews.push(review);
       //save the post
       post.save();
       //redirect to the post
       req.session.success = 'Review created successfully!';
       res.redirect(`/posts/${post.id}`);
    },
    //review update
    async reviewUpdate(req, res, next){
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
        req.session.success = 'Review Updated Successfully';
        res.redirect(`/posts/${req.params.id}`);
    },

    //review delete
    async reviewDelete(req, res, next){
       await Post.findByIdAndUpdate(req.params.id, {
           $pull: {reviews: req.params.review_id}
       });
       await Review.findByIdAndRemove(req.params.review_id);
       req.session.success = 'Review deleted successfully';
       res.redirect(`/posts/${req.params.id}`);
    }
}

