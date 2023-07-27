const Video = require('../model/video');

async function createComment(videoId, commentData){

        const video = await Video.findById(videoId);


        video.comments.push(commentData);

        const updatedData = await video.save();
        
        return updatedData;

       
  
}





module.exports = {createComment};