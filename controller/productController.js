const express = require('express');
const router = express.Router();
const Product = require('../Service/productService');

router.post('/',async(req,res)=>{
    try{
    
        let{productURL, title, price} = req.body;
        
        if(!title || !productURL || !price){
            throw new Error('Insufficient Parameter');
        }
    
        [productURL, title, price] = [productURL.trim(), title.trim(),price.trim()]
    
        const product = await Product.setProduct(productURL, title, price);
    
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

        let{productURL, title, price} = req.body;
    
        if(!title || !productURL || !price){
            throw new Error('Insufficient Parameter');
        }
    
        if (!title) title = getProduct.title;
        if (!productURL) productURL = getProduct.productURL;
        if (!price) price = getProduct.price;

        const product = await Product.modifyProduct( id, productURL, title, price);

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