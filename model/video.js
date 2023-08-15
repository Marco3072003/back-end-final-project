const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true 
    },
    videoId: {
        type: String,
        required: true 
    },
    imgURL : {
        type: String,
        required: true 
    },
    views:{
        default: 0,
        type: Number
        
    },
    likes: {
        type: [
            {
                username: {
                    type:String, 
                    required: true
                }
            }
        ],
    default: []
    },
    comments:{
        type: [
                {
                    username: {
                                type:String, 
                                required: true
                            },
                    comment: {
                                type:String, 
                                required: true
                            },
                    timestamp: {
                                type:Date, 
                                Default: Date.now
                            }
                }
            ],
        default: []
    },
    productId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    }

});


module.exports = mongoose.model('Video',videoSchema)