const Comment = require('../repository/commentRepository');
const Video = require('./videoService')

async function addCommentVideo(id, username, comment){
    await Video.checkVideo();
    await Video.findVideo(id);

    if(!(typeof username === 'string' && typeof comment === 'string')){
        throw new Error('Username and comment must be string');
    }
    
    const currentDate = new Date();

    const timestamp = currentDate.getTime();

    const commentData = Object.assign({},{username, comment,timestamp});

    const updatedComment = await Comment.createComment(id, commentData);

    updatedComment.submitComment = commentData;
    return updatedComment;


}

async function getVideoComment(videoId){
    await Video.checkVideo();
    
    const video = await Video.findVideo(videoId);

    const comments = [...video.comments];

    return comments;
}

module.exports = {addCommentVideo, getVideoComment}