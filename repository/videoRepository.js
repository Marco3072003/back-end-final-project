
const Video = require('../model/video');


async function createVideo(title, desc, videoURL, imgURL){
  

    const newVideo = new Video(
        {
          
            title: title,
            desc: desc,
            videoURL: videoURL,
            imgURL: imgURL

        }
        );

    const savedVideo = await newVideo.save();
    return savedVideo;


}

async function getAllVideos(){

    
        const videos = await Video.find();
        return videos;

    
}


async function getVideo(id){
    

        const video = await Video.findById(id);
        return video;
  
    
}

async function updateVideo(id, updateVideoData){
    
        const options = {new:true}
        const updatedVideo =  await Video.findByIdAndUpdate(
            id, updateVideoData, options
        );
        return updatedVideo
   
}

async function deleteVideo(id){


        const deletedVideo = await Video.findByIdAndDelete(id);
        
        return deletedVideo;

   
}

async function getVideoProducts(id){
    
        const productsByVideo = await Video.findById(id).populate('productId');

        return productsByVideo;
  
}

async function getVideoComments(id){

 
        const video = await getVideo(id);

        const commentsVideo = video.comments;

        return commentsVideo;

   
}

async function playVideoById(id){
        const video = await getVideo(id);

        video.views += 1;

        const updatedVideo = await video.save();

        return updatedVideo;

}

async function likeVideoById(id, username){
        const video = await getVideo(id);

        video.likes.push({username});

        const updatedVideo = await video.save()

        return updatedVideo;

}

async function addProductIdToVideo(videoId, productId){
    const video = await getVideo(videoId);

    video.productId.push(productId);

    const updatedVideo = await video.save();
   
    return updatedVideo;

    
}

async function removeProductIdFromVideo(videoId, productId){

    const video = await Video.findByIdAndUpdate(
        videoId,
        { $pull: { productId: productId } },
        {new:true}
    );

    return video;

    
}


async function getVideoProductList(id){

    const video = await Video.findById(id).populate('productId');
    
    return video;
}

module.exports = {createVideo, getAllVideos, getVideo,updateVideo, deleteVideo, 
                 getVideoProducts, getVideoComments, playVideoById, likeVideoById
                 ,addProductIdToVideo , removeProductIdFromVideo, getVideoProductList};