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

function checkInputString(title, desc,videoURL, imgURL){

    if(!(typeof title === "string" && typeof desc === "string" && typeof videoURL === "string" && typeof imgURL === "string") ){

        throw new Error('Data type of title, desc, videoURL, imgURL must be String');
    }
    
    return
}


async function findAllVideos(){
    await checkVideo();

    const getVideos = await Video.getAllVideos();

    const generalInfo = getVideos.map(({_id, title, desc, imgURL,videoURL}) => ({
        _id,
        title,
        desc,
        imgURL,
        videoURL
    }))
    
    return generalInfo
}


async function findVideo(id){
    try{
        await checkVideo();

        const getVideo = await Video.getVideo(id);

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

async function setVideo(title, desc, videoURL, imgURL){
    checkInputString(title, desc,videoURL, imgURL);

    const videos = await Video.getAllVideos();

    if(!(videos === null)){

    const checkVideoImgURL = videos.some((video) => video.videoURL === videoURL || video.imgURL === imgURL);

    if(checkVideoImgURL){
        throw new Error('Video or Image URL has been added');
    }

    }   

    const video =  await Video.createVideo(title,desc,videoURL, imgURL);
    
    return video;
}

async function modifyVideo(id, title, desc, videoURL, imgURL){
    await checkVideo();

    await findVideo(id);

    checkInputString(title, desc,videoURL, imgURL);

    const updateVideoData = Object.assign({}, {title, desc, videoURL, imgURL});

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

async function findVideoProductList(id){
    await checkVideo();
    await findVideo(id);

    const video = await Video.getVideoProductList(id);

    const productList = [...video.productId];

    return productList;
}




module.exports = {setVideo, findAllVideos,findVideo, modifyVideo, unsetVideo, playVideo, 
                likeVideo,addProductToVideo , removeProductFromVideo, findVideoProductList
                , checkVideo};