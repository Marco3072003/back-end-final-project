const express = require('express');
const router = express.Router();
const Product = require('../Service/productService');

/* const utility = require('../utility/autenticateToken');

router.use(utility.authenticateToken); */

router.post('/',async(req,res)=>{
    try{
    
        let{productURL,imgURL, title, price} = req.body;
        
        if(!title || !productURL || !imgURL || !price){
            throw new Error('Insufficient Parameter');
        }
    
        [productURL,imgURL, title, price] = [productURL.trim(),imgURL.trim(), title.trim(),price.trim()]
    
        const product = await Product.setProduct(productURL,imgURL, title, price);
    
        res.status(200).json({Success: product})
    
        }catch(e){
            
            res.status(400).json({error: e.message});
        }
});

router.get('/',async(req,res)=>{

    try{
        const products = await Product.findAllProducts();

        res.status(200).json({Products: products})
    }catch(e){
        res.status(500).json({error: e.message});
    }

});


router.get('/:id', async(req,res)=>{
    try{
 
        const id = req.params.id; 
           
        const product = await Product.findProduct(id);
    
        res.status(200).json(product)
    
        }catch(e){
    
            res.status(500).json({error: e.message});
    
        }
});


router.patch('/:id',async(req,res)=>{

    try{
        const id = req.params.id;

        const getProduct = await Product.findProduct(id);

        let{productURL,imgURL, title, price} = req.body;
    
        if(!title || !productURL || !imgURL || !price){
            throw new Error('Insufficient Parameter');
        }
    
        if (!title) title = getProduct.title;
        if (!imgURL) imgURL = getProduct.imgURL;
        if (!productURL) productURL = getProduct.productURL;
        if (!price) price = getProduct.price;

        const product = await Product.modifyProduct( id, productURL,imgURL, title, price);

        res.status(200).json({SuccessUpdatedData: product});

    }catch(e){
        res.status(400).json({error: e.message});
    }

});


router.delete('/:id',async(req,res) =>{
    try{
        const id = req.params.id;

        const deletedProductData = await Product.unsetProduct(id);

        res.status(200).json({Message: `Successfully deleted product with title ${deletedProductData.title}`})
        
    }catch(e){
        
        res.status(400).json({error: e.message});
    }
});

module.exports = router;
