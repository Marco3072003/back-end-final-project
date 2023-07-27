const Product = require('../repository/productRepository');
const Video = require('../repository/videoRepository');
const mongoose = require('mongoose');


async function checkProduct(){
    const getAllProducts = await Product.getAllProducts();

    if(getAllProducts.length === 0 || getAllProducts === null){
        throw new Error('Product List is Empty');
    }

    return

}


function checkInputString(productURL, title){

    if(!(typeof productURL === "string" && typeof title === "string") ){

        throw new Error('Data type of productURL and title must be String');
    }
    
    return
}

function checkNumber(price){
    if(isNaN(price)){
        throw new Error('Data type of price must be number');
    }
}


async function findAllProducts(){
    await checkProduct();

    const getProducts = await Product.getAllProducts();

    return getProducts

}

async function findProduct(id){
    try{
        await checkProduct();

        const getProduct = await Product.getProduct(id);

        if(getProduct === null ){
            throw new Error("Product doesn't exist")
        }

        return getProduct;

    }catch(error){

        if(error instanceof mongoose.Error.CastError){
            throw new Error("Product doesn't exist");
        }
    }
}



async function setProduct(productURL, title, price){
    const priceNumber = Number(price);
    checkInputString(productURL, title);
    checkNumber(priceNumber);

    const getProducts = await Product.getAllProducts();

    if(!(getProducts === null)){

    const checkProductURL = getProducts.some((product)=> product.productURL === productURL);

    if(checkProductURL){
        throw new Error('URL Product has been added');
    }

    }

    const setProduct = await Product.createProduct(productURL, title, priceNumber);

    return setProduct;

}


async function modifyProduct(id, productURL, title, price){
    await checkProduct();

    await findProduct(id);

    const priceNumber = Number(price);

    checkInputString(productURL, title);
    checkNumber(priceNumber);

    const getProducts = await Product.getAllProducts();

    if(!(getProducts === null)){

    const checkProductURL = getProducts.some((product)=> product.productURL === productURL);

    if(checkProductURL){
        throw new Error('URL Product has been added');
    }

    }

    const updatedProductData =Object.assign({}, {productURL, title, price});

    const updatedData = Product.updateProduct(id, updatedProductData);

    return updatedData;


}


async function unsetProduct(id){
    await checkProduct();

    await findProduct(id);

    const videos = await Video.getAllVideos();

    const deleteProduct = await Product.deleteProduct(id);

     if(deleteProduct === null){
         throw new Error("ProductID dosent't exist");
    }
   
   const checkProductIdinVideo = videos.some(video => video.productId && video.productId.includes(id));

   if(checkProductIdinVideo){
        const choosenVideos =  videos.filter(video => video.productId.includes(id));

        const videosId = choosenVideos.map(video => video._id);
        const productId = deleteProduct._id;

        videosId.forEach((videoId) =>{
        Video.removeProductIdFromVideo(videoId, productId);    
        })
   }

   

    return deleteProduct;
}

module.exports = {checkProduct, findAllProducts, findProduct, setProduct, modifyProduct, unsetProduct}
