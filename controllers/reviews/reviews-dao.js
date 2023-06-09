import reviewsModel from './reviews-model.js';

export const findReviews = () => reviewsModel.find();
export const findCriticReviews = (criticUsername) => reviewsModel.find({username: criticUsername});
export const findMovieReviews = (mid) => reviewsModel.find({movieId: mid})
export const createReview = (review) => reviewsModel.create(review);
export const deleteReview = (rid) => reviewsModel.deleteOne({ _id: rid });
export const updateReview = (rid, review) => reviewsModel.updateOne({ _id: rid }, { $set: review });