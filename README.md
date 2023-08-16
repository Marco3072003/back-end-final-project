**FERNANDO MARCO GG3FSGP0329 FULLSTACK ENGINEERING Generasi GIGIH 3.0 FINAL PROJECT assignment Video TOKOPEDIA PLAY CLONE**
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
            videoId: String,
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
            imgURL: String,
            title: String,
            price: Number
        },
        {<product_object>}
    ]
}
```

- users
```
{
    [
        {
            _id: String,
            username: String,
            password: String,
        },
        {<username_object>}
    ]
}
```

**API STRUCTURE**
----

*METHOD GET*
- https://back-end-final-project-gg30.vercel.app/video/  GET All Videos
- https://back-end-final-project-gg30.vercel.app/video/:id  GET Detail Videos By id
- https://back-end-final-project-gg30.vercel.app/video/:videoId/product/  GET ProductList
- https://back-end-final-project-gg30.vercel.app/video/:videoId/comment/  GET Comment List

- https://back-end-final-project-gg30.vercel.app/product/ GET All Product
- https://back-end-final-project-gg30.vercel.app/product/:id GET Product By id

*METHOD POST*
- https://back-end-final-project-gg30.vercel.app/login/ LOGIN
- https://back-end-final-project-gg30.vercel.app/register/ REGISTER
- https://back-end-final-project-gg30.vercel.app/video/ POST video
  body: {title: String, desc: String, videoId: String, imgURL: String}

- https://back-end-final-project-gg30.vercel.app/video/:Id/play POST Play Video (video.views++)

- https://back-end-final-project-gg30.vercel.app/video/:videoId/like/:username POST Like Video (add username to video.likes)

- https://back-end-final-project-gg30.vercel.app/video/:videoId/product/:productId POST Associate an existing Product to an existing video (add productId to video.productId)

- https://back-end-final-project-gg30.vercel.app/video/:videoId/comment POST Comment to Video (add body value and timestamp to video.comment )
  body: {username: String, comment: String}

- https://back-end-final-project-gg30.vercel.app/product POST Product 
  body: {productURL: String, imgURL:String,  title: String, price: Number}

*METHOD PATCH*
- https://back-end-final-project-gg30.vercel.app/video/ PATCH Modify Video 
  body: {title: String, desc: String, videoId: String, imgURL: String}

- https://back-end-final-project-gg30.vercel.app/product/ PATCH Modify Product
  body: {productURL: String, imgURL:String,  title: String, price: Number}

*METHOD DELETE*
- https://back-end-final-project-gg30.vercel.app/video/:id DELETE Video By id
- https://back-end-final-project-gg30.vercel.app/product/:id DELETE Product By id
- https://back-end-final-project-gg30.vercel.app/video/:videoId/product/:productId DELETE remove reference Product By ProductId From Video By Id (Delete video.productId by productId)

**AUTH / REGISTER AND LOGIN TO GET TOKEN FOR MORE ACCESS**
#REGISTER

**POST /register**
Creates a new User and returns the object and token.

* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    username: string,
    password: String,
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:** 
```
{
    "success": {
        "username": String,
        "password": String,
        "_id": String,
        "__v": 0
    }
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** 
  ```
  {
    "error": "Username has been used"
  }
  ```


  **POST /login**
  Login and get the Token

* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Data Params**  
```
  {
    username: string,
    password: String,
  }
```
* **Success Response:**  
* **Code:** 200  
  **Content:** 
```
{
    {
    "accessToken": String,
    "username": String
}
}
```
* **Error Response:**  
  * **Code:** 404  
  **Content:** 
  ```
  {
    "error": "Invalid Username"
  }
  ```
    



**LIST API REQUEST AND RESPONSE**
----
#video
* video object
```
{
        _id: String,
        title: String,
        desc: String,
        videoId: String,
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
  Authorization: Bearer accessToken
* **Success Response:** 
* **Code:** 200  
  **Content:**  `{ <video_object> }` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`
  OR
  * **Code:** 404  
  **Content:** `{ error : "Video List is Empty" }` 
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 



**GET /video/:videoId/product**
----
  Returns all product associated with the specified video.
* **URL Params**  
  *Required:* `videoId=[ObjectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 

**GET /video/:videoId/comment**
----
  Returns all comments with the specified video.
* **URL Params**  
  *Required:* `videoId=[ObjectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 
    

**POST /video**
----
  Creates a new Video and returns the new object.
* **URL Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
* **Data Params**  
```
  {
    title: String,
    desc: String,
    videoId: String,
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 
    

**POST /video/:id/play**
----
  Make Play Video or video.views++.
* **URL Params**  
*Required:* `id=[ObjectId]`
* **Headers**  
  Content-Type: application/json
  Authorization: Bearer accessToken  
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 

**POST /video/:id/like/:username**
----
  Create/Add like with Data Params object.
* **URL Params**  
*Required:* `id=[ObjectId]`
*Required:* `username=[String]`
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 

**POST /video/:videoId/product/:productId**
----
  Associate an specified existing Product to an specified existing video (add productId to video.productId).
* **URL Params**  
*Required:* `videoId=[ObjectId]`
*Required:* `productId=[ObjectId]`
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 
  
**POST /video/:id/comment**
----
Create/Add Comment to specified video (add Data Params value and timestamp to video.comment )
* **URL Params**  
*Required:* `id=[ObjectId]`
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 
  

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
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 

**DELETE /video/:id**
----
  Delete the specified video.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
* **Success Response:** 
  * **Code:** 200 
  **Content:**  `{Message: Successfully deleted video with title $video.title}` 
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Video doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : Video List is Empty." }`
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 

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
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}`

#Products
* Product object
```
{
    
    _id: String,
    productURL: String,
    imgURL:String,
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
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}

**GET /product/:id**
----
  Returns the specified product.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
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
  **Content:** `{"error": "no token and unauthorize"}` 


**POST /products**
----
  Creates a new Product and returns the new object.
* **URL Params**  
  None
* **Data Params**  
```
  {
    productURL : String,
    imgURL:String,
    title : String,
    price: Number
  }
```
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
* **Success Response:**  
* **Code:** 200  
  **Content:**  `{ <product_object> }`
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Url product has been added" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : error : "Insufficient Parameter" }`  
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 


**PATCH /products/:id**
----
  Updates fields on the specified product and returns the updated object.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
```
  {
  	productURL : String,
    imgURL:String,
    title : String,
    price: Number
  }
```
* **Headers**  
  Content-Type: application/json
  Authorization: Bearer accessToken
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
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 
  

**DELETE /products/:id**
----
  Deletes the specified product.
* **URL Params**  
  *Required:* `id=[objectId]`
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
  Authorization: Bearer accessToken
* **Success Response:**  
  * **Code:** 200
* **Error Response:**  
  * **Code:** 404  
  **Content:** `{ error : "Product doesn't exist" }`  
  OR  
  * **Code:** 404  
  **Content:** `{ error : "Product List is Empty" }`
  OR
  * **Code:** 404  
  **Content:** `{"error": "no token and unauthorize"}` 


⚙️ How to Run Locally
Clone the repository.

Install the required dependencies:

express
body-parser
mongoose
dotenv
nodemon
Configure .env:

Create a .env file.
Add DATABASE_URL='mongodb://your_database_url'.
Optionally, set PORT='custom_port' (default is 3000).
Run the application:

Use the command npm start in the terminal.