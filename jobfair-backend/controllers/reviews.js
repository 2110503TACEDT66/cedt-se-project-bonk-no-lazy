const Review = require('../models/Review');
const Company = require('../models/Company')
//@desc Get all reviews
//@route Get /api/v1/reviews
//@access Public
exports.getReviews= async (req,res,next)=>{
    let query;
    //you can see all
      if (req.params.companyId) {
        console.log(req.params.companyId);
        query=Review.find({company:req.params.companyId});
    } else {
        query=Review.find().populate({
        path:'company', 
        select:'name address website description tel quote'});
    }
    try {
        const reviews = await query.populate({
            path:'user',
            select:'name tel email profile_picture'
        });
        res.status(200).json({
            success:true,
            count:reviews.length,
            data:reviews
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            seccess:false,
            message:'Cannot find Review'
        });
    }
};



//@desc Get single Review
//@route Get /api/v1/reviews/:id
//@access Public
exports.getReview= async (req,res,next)=>{
    try {
        const review = await Review.findById(req.params.id)
            .populate({
                path: 'company',
                select: 'name address website description tel quote'
            })
            .populate({
                path: 'user',
                select: 'name tel email profile_picture'
            });
        if (!review) {
            return res.status(404).json({success:false,massage:`No review with the id of ${req.params.id}`});
    
        }
        return res.status(200).json({
            seccess:true,
            data:review
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            seccess:false,
            message:'Cannot find Review'
        });
    }
};

//@desc Add review
//@route Post /api/v1/companys/:companyId/review
//@access Private
exports.addReview= async (req,res,next)=>{
    try {
        //add user Id to req.body
        req.body.user = req.user.id;
        req.body.company=req.params.companyId;
        const company = await Company.findById(req.params.companyId);
        if (!company) {
            return res.status(404).json({
                success:false,
                massage:`No company with the id of ${req.params.companyId}`
            });
        }
        const review = await Review.create(req.body);
        res.status(200).json({
            seccess:true,
            data:review
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            seccess:false,
            message:"Cannot create Review"
        });
    }
};

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private
exports.updateReview = async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                massage: `No review with the id of ${req.params.id}`
            });
        }
        //Make sure user is the review owner
        if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                massage: `User ${req.user.id} is not authorized to update this review`
            });
        }
        // Update company field
        if (req.body.company) {
            review.company = req.body.company;
        }

        // Update checkIn field
        if (req.body.rating) {
            review.rating = req.body.rating;
        }
        
        // Update checkOut field
        if (req.body.comment) {
            review.comment = req.body.comment;
        }

        review = await review.save();

        res.status(200).json({
            success: true,
            data: review
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot update Review"
        });
    }
};

//@desc Delete review
//@route Delete /api/v1/reviews/:id
//@access Private
exports.deleteReview= async (req,res,next)=>{
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                success:false,
                massage:`No review with the id of ${req.params.id}`});
        }
        //Make sure user is the review owner
        if (review.user.toString()!==req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success:false,
                massage:`User ${req.user.id} is not authorized to delete this review`
            });
        }
        await review.deleteOne();
        res.status(200).json({
            seccess:true,
            data:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            seccess:false,
            message:"Cannot dalete Review"
        });
    }
};