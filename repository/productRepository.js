const Product = require('../model/product');

async function createProduct(productURL, title, price){


        const newProduct = new Product(
            {
              productURL: productURL,
              title: title,
              price: price
            }
            );
    
        const savedProduct = await newProduct.save();
        return savedProduct;
    
       

}

async function getAllProducts(){
    
        const products = await Product.find();
        return products;

}

async function getProduct(id){


            const product = await Product.findById(id);
            return product;

}

async function updateProduct(id, updateProductData){
 
        const options = {new:true}
        const updatedProduct =  await Product.findByIdAndUpdate(
            id, updateProductData, options
        );
        return updatedProduct

   
}

async function deleteProduct(id){

        const deletedProduct = await Product.findByIdAndDelete(id);
        
        return deletedProduct;

    

}



module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct};