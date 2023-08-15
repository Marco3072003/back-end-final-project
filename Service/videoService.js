const mongoose = require('mongoose');
const Video = require('../repository/videoRepository');
const Product = require('./productService');

async function checkVideo(){
    const getAllVideos = await Video.getAllVideos();

    if(getAllVideos.length === 0 || getAllVideos === null){
        throw new Error('Video List is Empty');
    }

    return

}

function checkInputString(title, desc,videoId, imgURL){

    if(!(typeof title === "string" && typeof desc === "string" && typeof videoId === "string" && typeof imgURL === "string") ){

        throw new Error('Data type of title, desc, videoId, imgURL must be String');
    }
    
    return
}


async function findAllVideos(){
    await checkVideo();

    const getVideos = await Video.getAllVideos();

    const generalInfo = getVideos.map(({_id, title, desc, views,imgURL,videoId}) => ({
        _id,
        title,
        desc,
        views,
        imgURL,
        videoId
    }))
    
    return generalInfo
}


async function findVideo(videoId){
    try{
        await checkVideo();

        const getVideo = await Video.getVideo(videoId);

        if(getVideo === null ){
            throw new Error("Video doesn't exist")
        }

        return getVideo;

    }catch(error){

        if(error instanceof mongoose.Error.CastError) {
            throw new Error("Video doesn't exist");
        }

        throw error;

    }
}

async function setVideo(title, desc, videoId, imgURL){
    checkInputString(title, desc, videoId, imgURL);

    const videos = await Video.getAllVideos();

    if(!(videos === null)){

    const checkVideoImgURL = videos.some((video) => video.videoId === videoId || video.imgURL === imgURL);

    if(checkVideoImgURL){
        throw new Error('Video or Image URL has been added');
    }

    }   

    const video =  await Video.createVideo(title,desc,videoId, imgURL);
    
    return video;
}

async function modifyVideo(id, title, desc, videoId, imgURL){
    await checkVideo();

    await findVideo(id);

    checkInputString(title, desc,videoId, imgURL);

    const updateVideoData = Object.assign({}, {title, desc, videoId, imgURL});

    const updatedData = await Video.updateVideo(id, updateVideoData);

    return updatedData;

}

async function unsetVideo(id){
    await checkVideo();
    await findVideo(id);

    const deletedVideo = await Video.deleteVideo(id);

    return deletedVideo;
}


async function playVideo(id){
    await checkVideo();
    await findVideo(id);

    const playedVideoData = await Video.playVideoById(id);

    return playedVideoData;
}

async function likeVideo(id, username){
    await checkVideo();

    const likedVideo = await findVideo(id);

    const userHasLiked = likedVideo.likes.some((like) => like.username === username);

    if(userHasLiked){
        throw new Error('user has already liked this video');
    }

    const updatedVideo = await Video.likeVideoById(id, username);

    return updatedVideo
}


async function addProductToVideo(videoId, productID){

        await checkVideo();
        await Product.checkProduct();

        await findVideo(videoId);
        const product =  await Product.findProduct(productID); 

        const videos = await Video.getAllVideos();
   

        const checkProductIdinVideo = videos.some(video => video.productId && video.productId.includes(productID));



        if(checkProductIdinVideo){
            throw new Error('Product ID has been added to this video');
        }

        const updatedVideo = await Video.addProductIdToVideo(videoId, productID);

        updatedVideo.productTitle =  product.title;

        
        return updatedVideo;
    
   
}

async function removeProductFromVideo(videoId, productID){
    await checkVideo();
    await Product.checkProduct();

    const video = await findVideo(videoId);
    const product = await Product.findProduct(productID); 

        if(!(video.productId.includes(productID)) ){
            throw new Error('There is no ProductID in video');;
        }

    const updatedVideo = await Video.removeProductIdFromVideo(videoId,productID);

    updatedVideo.productTitle = product.title;

    return updatedVideo;


}

async function findVideoProductList(videoId){
    await checkVideo();
    await findVideo(videoId);

    const video = await Video.getVideoProductList(videoId);

    const productList = [...video.productId];

    if(productList.length === 0){
        throw new Error('Product List is Empty');
    }

    return productList;
}




module.exports = {setVideo, findAllVideos,findVideo, modifyVideo, unsetVideo, playVideo, 
                likeVideo,addProductToVideo , removeProductFromVideo, findVideoProductList
                , checkVideo};