const express = require('express');
const router = express.Router();
const Video = require('../Service/videoService');
const Comment = require('../Service/commentService')



router.post('/', async (req,res)=>{
    try{
    
    let{title, desc,videoURL, imgURL} = req.body;
    
    if(!title || !desc || !videoURL || !imgURL){
        throw new Error('Insufficient Parameter');
    }

    [title, desc,videoURL, imgURL] = [title.trim(), desc.trim(),videoURL.trim(), imgURL.trim()]

    const video = await Video.setVideo(title, desc,videoURL, imgURL);

    res.status(200).json({Success: video})

    }catch(e){
        
        res.status(400).json({error: e.message});
    }
})

router.get('/', async(req,res) => {
    try{
        const video = await Video.findAllVideos();

        res.status(200).json({Videos: video})
    }catch(e){
        res.status(500).json({error: e.message});
    }
});

router.get('/:id', async(req,res)=>{
    
    try{
 
    const id = req.params.id; 
       
    const video = await Video.findVideo(id);

    res.status(200).json(video)

    }catch(e){

        res.status(500).json({error: e.message});

    }
})

router.patch('/:id', async(req,res)=>{
    try{
        const id = req.params.id;

        const getVideo = await Video.findVideo(id);

        let{title, desc ,videoURL, imgURL} = req.body;
        if(!title && !desc && !videoURL && !imgURL){

        throw new Error('Insufficient Parameter');
        }

        if (!title) title = getVideo.title;
        
        if (!desc) desc = getVideo.desc;
        if (!videoURL) videoURL = getVideo.videoURL;
        if (!imgURL) imgURL = getVideo.imgURL;


        const video = await Video.modifyVideo( id, title, desc, videoURL, imgURL );

        res.status(200).json({SuccessUpdatedData : video});
    }catch(e){
        res.status(400).json({error: e.message});
    }
})

router.delete('/:id', async(req,res)=>{

    try{
        const id = req.params.id;

        const deletedVideoData = await Video.unsetVideo(id);

        res.status(200).json({Message: `Successfully deleted video with title ${deletedVideoData.title}`})
        
    }catch(e){
        
        res.status(500).json({error: e.message});
    }
    
})

router.post('/:id/play', async(req,res)=>{

    try{
        const id = req.params.id;

        const playedVideoData = await Video.playVideo(id);
        
        res.status(200).json({Message: `Successfully play song with the title: '${playedVideoData.title}' `});

    }catch(e){
        res.status(400).json({error: e.message});
    }

});

router.post('/:id/like/:username', async(req,res)=>{
    try{
        const id = req.params.id;

        const username = req.params.username;

        const likedVideoData = await Video.likeVideo(id, username);
        
        res.status(200).json({Message: `${username} successfully liked video with the title ${likedVideoData.title}`});
        
    }catch(e){

        res.status(400).json({error: e.message});
    }
});


router.post('/:videoId/product/:productId', async (req,res)=>{
    try{
        const videoId = req.params.videoId;
        const productId = req.params.productId;

        const videoProduct = await Video.addProductToVideo(videoId, productId);
        
        res.status(200).json({Message: `Success to add product ${videoProduct.productTitle} to video ${videoProduct.title}`});
        
    }catch(e){

        res.status(400).json({error: e.message});
    }

});


router.delete('/:videoId/product/:productId', async (req,res)=>{
    try{
        const videoId = req.params.videoId;
        const productId = req.params.productId;

        const videoProduct = await Video.removeProductFromVideo(videoId, productId);
        
        res.status(200).json({Message: `Success to remove product ${videoProduct.productTitle} from video ${videoProduct.title}`});
        
    }catch(e){

        res.status(400).json({error: e.message});
    }

});


router.get('/:videoId/product', async (req,res)=>{
    try{
        
        const videoId = req.params.videoId;

        const videoProductList = await Video.findVideoProductList(videoId);
        
        res.status(200).json({ProductList: videoProductList})
    }catch(e){

        res.status(500).json({error: e.message});
    }
});


router.post('/:videoId/comment', async(req,res)=>{
    try{
        const videoId = req.params.videoId;
        let {username, comment} = req.body;


        if(!username || !comment){
            throw new Error('Insufficient Parameter');
        }

        [username, comment] = [username.trim(), comment.trim()];

        const commentUpdated = await Comment.addCommentVideo(videoId, username, comment);

        res.status(200).json({Success: {username : commentUpdated.submitComment.username, comment: commentUpdated.submitComment.comment} });

    }catch(e){

        res.status(400).json({Error: e.message});
    }
});

router.get('/:videoId/comment',async (req,res)=>{
    try{
    const id = req.params.videoId;

    const comments = await Comment.getVideoComment(id);

    res.status(200).json({CommentList: comments});
    }catch(e){
        
    res.status(500).json({Error: e.message});    

    }
});



module.exports = router;