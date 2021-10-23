const mongoose = require("mongoose");
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    images: [ 
        {
            url : String,
            public_id: String
        }
    ],
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    properties: {
        description: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    avgRating: {type: Number, default: 0}
});

PostSchema.pre('remove', async function(){
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    });
});

PostSchema.methods.calculateAvgRating = function(){
    let ratingsTotal = 0;
    //PostSchema has two proprties the first is reviews, and the second is avgRating calling them with "this" keyword
    //the key word this referes to Postschema.method.calculateAvgRating 
    if(this.reviews.length){
        this.reviews.forEach(review => {
            //asign every review rating into the ratingsTotal
            ratingsTotal += review.rating;
        });
        //calling average rating (avgRating) from PostSchema and getting the average
        this.avgRating = Math.round((ratingsTotal / this.reviews.length) * 10) / 10;
    } else {
        this.avgRating = ratingsTotal;
    }
    //flooring the average rating (avgRating)
    const floorRating = Math.floor(this.avgRating);
    this.save();
    return floorRating;
}

PostSchema.plugin(mongoosePaginate);
PostSchema.index({geometry: '2dsphere'});

module.exports = mongoose.model("Post", PostSchema);

/*
Post: 
- title - string
- price - string
- description - string
- images - array of string
- location - string
- lat - number
- lng - number
- author - object id (ref user)
- reviews - array of objects
*/