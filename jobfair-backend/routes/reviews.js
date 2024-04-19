const express = require('express');
const {getReviews,getReview,addReview,updateReview,deleteReview} = require('../controllers/reviews')

const {protect,authorize} = require('../middleware/auth');

const router = express.Router({mergeParams:true});

router.route('/').get(getReviews).post(protect,authorize('admin','user','company'),addReview);
router.route('/:id').get(getReview).put(protect,authorize('admin','user','company'),updateReview).delete(protect,authorize('admin','user','company'),deleteReview);

module.exports = router;