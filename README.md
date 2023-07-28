**FERNANDO MARCO GG3FSGP0329 FULLSTACK ENGINEERING Generasi GIGIH 3.0 Mid Term assignment Video API**
----

This is my project to fullfill Mid Term assignment from Generasi GIGIH 3.0. I am using mongoDB as database and NodeJs, expressJs as backend. Make sure your PC has mongoDB installed and can run it.


**DATABASE STRUCTURE**
----
I use mongoDB as Database

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

- http://API_URL/video/:videoId/product/:productId POST Associate an existing Product to an existing video (add productId to video.productId)

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
#video
* video object
```
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
}

    

```
**GET /video**
----
  Returns all videos in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  videos: [
           {<video_object>},
           {<video_object>},
           {<video_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`
  

**GET /video/:id**
----
  Returns the specified video.
* **URL Params**  
  *Required:* `id=[ObjectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <video_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`  


**GET /video/:videoId/product**
----
  Returns all product associated with the specified video.
* **URL Params**  
  *Required:* `videoId=[ObjectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  ProductList: [
           {<product_object>},
           {<product_object>},
           {<product_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`  
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }`  

**GET /video/:videoId/comment**
----
  Returns all comments with the specified video.
* **URL Params**  
  *Required:* `videoId=[ObjectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  CommentList: [
           {<comment_object>},
           {<comment_object>},
           {<comment_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`  
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Comment List is Empty" }`
    

**POST /video**
----
  Creates a new Video and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    title: String,
    desc: String,
    videoURL: String,
    imgURL: String
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <video_object> }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video or Image URL has been added" }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : error : "Insufficient Parameter" }`
    

**POST /video/:id/play**
----
  Make Play Video or video.views++.
* **URL Params**  
*Required:* `id=[ObjectId]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{  Message: Successfully play song with the title: $Video.title'  }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`  

**POST /video/:id/like/:username**
----
  Create/Add like with Data Params object.
* **URL Params**  
*Required:* `id=[ObjectId]`
*Required:* `username=[String]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{  Message: $username Successfully liked video with the title: $Video.title'  }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }`  

**POST /video/:videoId/product/:productId**
----
  Associate an specified existing Product to an specified existing video (add productId to video.productId).
* **URL Params**  
*Required:* `videoId=[ObjectId]`
*Required:* `productId=[ObjectId]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
  None
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{  Message: Success to add product $product.title to video $video.title'  }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }` 
  OR
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }` 
  OR
  * **Code:** 404  
  **Content:** `{ error : "Product doesn't exist" }`
  
**POST /video/:id/comment**
----
Create/Add Comment to specified video (add Data Params value and timestamp to video.comment )
* **URL Params**  
*Required:* `id=[ObjectId]`
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
 ```
  {
    comment: String,
    username: String,
  }
```
  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{  <commnet_object>  }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }` 
  

**PATCH /video/:id**
----
  Updates fields on the specified video and returns the updated object.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
```
  {
  	username: string,
    email: string
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <user_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : error : "Insufficient Parameter" }` 
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video or Image URL has been added" }`

**DELETE /video/:id**
----
  Delete the specified video.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
  * **Code:** 200 
  **Content:**  `{Message: Successfully deleted video with title $video.title}` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : Video List is Empty." }`

**DELETE /video/:videoId/product/:productId**
----
  Remove specified productId Video that reference Product 
* **URL Params**  
  *Required:* `videoId=[objectId]`
  *Required:* `productId=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
  * **Code:** 200 
  **Content:**  `{Message: Success to remove product $product.title from video $video.title` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "There is no productID in Video" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : Video List is Empty." }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : Video doesn't Exist." }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : Product List is Empty." }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : Product doesn't Exist." }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : There is no ProductID in video" }`

#Products
* Product object
```
{
    
    _id: String,
    productURL: String,
    title: String,
    price: Number

}
```
**GET /product**
----
  Returns all products in the system.
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  
```
{
  products: [
           {<product_object>},
           {<product_object>},
           {<product_object>}
         ]
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }` 

**GET /product/:id**
----
  Returns the specified product.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Product doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }`


**POST /products**
----
  Creates a new Product and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
    productURL : String,
    title : String,
    price: Number
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Url product has been added" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : error : "Insufficient Parameter" }`  


**PATCH /products/:id**
----
  Updates fields on the specified product and returns the updated object.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
```
  {
  	productURL : String,
    title : String,
    price: Number
  }
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <product_object> }`  
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Product doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }`
  OR  
  * **Code:** 404  
  **Content:** `{ error : "URL product has been added" }`

**DELETE /products/:id**
----
  Deletes the specified product.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Product doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }`


**HOW TO RUN** 
----
**Make sure Make sure your PC has mongoDB installed. 

**Make sure your PC has mongoDB installed. Because this App use the mongoDB database

1. CLONE THE REPOSITORY

2. INSTALL THE DEPENDENCIES:
- express
- body-parser
- mongoose
- dotenv
- nodemon

3. .env CONFIGURATION:
- make a file name .env
- in this file add DATABASE_URL = 'mongodb://your database url'

- This apps default run on PORT 3000. If you want to custom PORT, you can add PORT='customport' in this file 

- for your information my .env file contains: 

  PORT = 3000

  DATABASE_URL = mongodb://127.0.0.1:27017/videos


4. RUN THE APPLICATION: 

- run command 'npm start' in terminal