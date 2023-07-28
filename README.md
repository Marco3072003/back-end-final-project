**FERNANDO MARCO Generasi GIGIH 3.0 Mid Term assignment Video API**
----

This is my project to fullfill Mid Term assignment from Generasi GIGIH 3.0


**DATABASE STRUCTURE**
----
Collection:
- videos
```
{
    [   
        {
            _id: String,
            title: String,
            desc: String,
            videoURL: String,
            imgURL: String,
            views: Number,
            productId: ['reference with ObjectId product collection'],
            likes: Number,
            comments: [
                    {username: String,
                    comment: String,
                    timestamp: Date},
                    {<comment_object>}
                    ]
        },
        {<video_object>}
    ]
}
```
- products
```
{
    [
        {
            _id: String,
            productURL: String,
            title: String,
            price: Number
        },
        {<product_object>}
    ]
}
```

**API STRUCTURE**
----

You can replace API_URL by localhost:YOUR_RUNNING_PORT. 

*METHOD GET*
- http://API_URL/video/  GET All Videos
- http://API_URL/video/:id  GET Detail Videos By id
- http://API_URL/video/:videoId/product/  GET ProductList
- http://API_URL/video/:videoId/comment/  GET Comment List

- http://API_URL/product/ GET All Product
- http://API_URL/product/:id GET Product By id

*METHOD POST*
- http://API_URL/video/ POST video
  body: {title: String, desc: String, videoURL: String, imgURL: String}

- http://API_URL/video/:Id/play POST Play Video (video.views++)

- http://API_URL/video/:videoId/like/:username POST Like Video (add username to video.likes)

- http://API_URL/video/:videoId/product/:productId POST Associate an Existing Product to an Existing video (add productId to video.productId)

- http://API_URL/video/:videoId/comment POST Comment to Video (add body value and timestamp to video.comment )
  body: {username: String, comment: String}

- http://API_URL/product POST Product 
  body: {productURL: String, title: String, price: Number}

*METHOD PATCH*
- http://API_URL/video/ PATCH Modify Video 
  body: {title: String, desc: String, videoURL: String, imgURL: String}

- http://API_URL/product/ PATCH Modify Product
  body: {productURL: String, title: String, price: Number}

*METHOD DELETE*
- http://API_URL/video/:id DELETE Video By id
- http://API_URL/product/:id DELETE Product By id
- http://API_URL/video/:videoId/product/:productId DELETE remove reference Product By ProductId From Video By Id (Delete video.productId by productId)


**LIST API REQUEST AND RESPONSE**
----



**HOW TO RUN** 
----
1. CLONE THE REPOSITORY
2. INSTALL THE DEPENDENCIES
- express
- body-parser
- mongoose
- dotenv
- nodemon
- swagger-ui-express

3. .env CONFIGURATION:
- make a file name .env
- in this file add DATABASE_URL = 'mongodb://your database url'

- if you want to custom PORT, you can add PORT='customport' in this file 

- for your information my .env file contains: 
PORT = 3000
DATABASE_URL = mongodb://127.0.0.1:27017/videos


4. RUN THE APPLICATION: 

- run command 'npm start' in terminal