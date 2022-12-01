# Welcome!

In this RESTful API simulating a blog, an authenticated user can post a new blog post with a title, content and related categories. It is also possible to create, delete and list users, create and list categories and create, list, delete and update posts. The API uses Json Web Token for authentication.

In this project, MySQL is used as a database manager, and the communications between it and the app are made with the ORM Sequelize. All models and migrations were made by me.

Like other Back-end projects I did, this project was built with a three-layered software architecture: the Model layer, responsible for communicating with the database, the Service layer in the middle, which validates the business rules, and the Controller layer, which receives and responds HTTP requests.

This project was developed while studying Back-end web development [@betrybe](https://github.com/betrybe). The files I worked on are in the ```/src``` folder. I got approval on 100% of this project's requirements.

<details>
<summary><strong>Database diagram</strong></summary>

![EER Diagram](https://user-images.githubusercontent.com/75266925/203593073-41acb414-3a4e-4bf2-95fc-78aa08276c38.png)

</details>

## Main languages and tools used

- Node.js
- Express.js
- Sequelize
- MySQL
- Joi for input data validation
- Json Web Token (JWT) for authentication
- Docker
- Layered Software Architecture

## Installation

<details>
<summary><strong>With Docker</strong></summary>

- Start the `blogs_api` and `blogs_api_db` containers with the `docker-compose up -d --build` command
- Access the `blogs_api` container terminal with `docker exec -it blogs_api bash`
- In the terminal, install the dependencies with `npm install`
- **All other node commands must be run inside the container**

</details>

<details>
<summary><strong>Without Docker</strong></summary>

- Install the dependencies with ``` npm install ``` (requires node on version 16)
- Configure a `.env` file based on the `.env.example` avaliable.

</details>

<details>
<summary><strong>Commands</strong></summary>

- Run the app with `npm start` or `npm run debug` (live reload)
- To run the project's requirements tests, use `npm test` for all tests or `npm test <test-name>` for a specific requirement (ex. `npm test req01`)
- Use `npm run drop` to delete the database
- Use `npm run prestart` to create the database and its tables
- Use `npm run seed` to populate the tables

</details>

## Endpoints

<details>
<summary><strong>POST</strong> <code>/login</code></summary>

<br />

- Validates the sent email and password and returns a JWT token.

<br />

- Example request body:

```json
  {
    "email": "string",
    "password": "string"
  }
```

- Example of returned token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

Examples of *invalid* requests:
  
- Response for request without any of the required fields (status 400):

```json
{ "message": "Some required fields are missing" }
```
  
- Response for request where "email" and/or "password" are incorrect or do not exist (status 400):
  
  ```json
  { "message": "Invalid fields" }
  ```

</details>

<details>
<summary><strong>GET</strong><code>/user</code></summary>

<br />

- Returns an array with all the registered users ordered by their id, or an empty array if there are no users. **Requires a valid token**

<br />

- Example:

```json
[
  {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  {
      "id": 2,
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  },
]
```

</details>

<details>
<summary><strong>POST</strong> <code>/user</code></summary>

<br />

- Creates a new user returns a valid Json Web Token. Validations are done in the request body. 

<br />

- Example request body:

```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  // image is not requireed
}
```

- Example of response for valid entry:

```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
```

Examples of *invalid* requests:
  
- Response for request with the "displayName" field with less than 8 characters (status 400):

```json
{
  "message": "\"displayName\" length must be at least 8 characters long"
}
```
  
- Response for request with invalid "email" (status 400):
  
```json
{
  "message": "\"email\" must be a valid email"
}
```

- Response for request with an invalid "password" length (status 400):

```json
{
  "message": "\"password\" length must be at least 6 characters long"
}
```

- Response for request with an existing user (status 409):

```json
{
  "message": "User already registered"
}
```

</details>
  
<details>
<summary><strong>GET</strong> <code>/user/:id</code></summary>

<br />

- Returns the user with the specified id. **Requires a valid token**

<br />

- Example of response for valid entry:

```json
{
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
}
```
 
- Response for invalid id (status 404):

```json
{
  "message": "User does not exist"
}
```

</details>

<details>
<summary><strong>DELETE</strong> <code>/user/me</code></summary>

<br />

- Deletes the logged in user according to the id in the token. **Requires a valid token**

<br />

</details>
  
<details>
<summary><strong>GET</strong> <code>/categories</code></summary>

<br />

- Returns an array with all the registered categories, or an empty array if there are none. **Requires a valid token**

<br />

- Example:

```json
[
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

  /* ... */
]
```

</details>

<details>
<summary><strong>POST</strong> <code>/categories</code></summary>

<br />

- Adds a new category in the database and returns it with an inserted id. **Requires a valid token**

<br />

- Example request body:

```json
{
  "name": "Typescript"
}
```

- Example of response for valid entry:

```json
{
  "id": 3,
  "name": "Typescript"
}
```

- Response for request without a "name" field (status 400):

```json
  { "message": "\"name\" is required" }
```

</details>

<details>
<summary><strong>GET</strong> <code>/post</code></summary>

<br />

- Returns an array with all the registered posts, or an empty array if there are none. **Requires a valid token**

<br />

- Example:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  },
  
  /* ... */
]
```

</details>

<details>
<summary><strong>POST</strong> <code>/post</code></summary>

<br />

- Adds a new post and links it with its respective categories. Returns it with an inserted id. **Requires a valid token**

<br />

- Example request body:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```

- Example of response for valid entry:

```json
{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "updated": "2022-05-18T18:00:01.196Z",
  "published": "2022-05-18T18:00:01.196Z"
}
```

Examples of *invalid* requests:
  
- Response for request without any of the required felds (status 400):

```json
{
  "message": "Some required fields are missing"
}
```
  
- Response for request with non existant "categoryId" (status 400):
  
  ```json
{
  "message": "one or more \"categoryIds\" not found"
}
```

</details>

<details>
<summary><strong>GET</strong> <code>/post/:id</code></summary>

<br />

- Returns the post with the specified id. **Requires a valid token**

<br />

- Example of response for valid entry:

```json
{
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Inovação"
      }
  ]
}
```
 
- Response for invalid id (status 404):

```json
{
  "message": "Post does not exist"
}
```

</details>

<details>
<summary><strong>PUT</strong> <code>/post/:id</code></summary>

<br />

- Updates and returns the post with the specified id. Only the user that is the author of the post can update it, and only the "title" and "content" fields are updatable. **Requires a valid token**

<br />

- Example request body:

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

- Example of response for valid entry:

```json
{
  "id": 3,
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "userId": 1,
  "published": "2022-05-18T18:00:01.000Z",
  "updated": "2022-05-18T18:07:32.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    },
    {
      "id": 2,
      "name": "Escola"
    }
  ]
}
```
Examples of *invalid* requests:
  
- Response for request without any of the required felds (status 400):

```json
{
  "message": "Some required fields are missing"
}
```
  
- Response for request to update post of unauthorized user (status 401):
  
```json
  {
    "message": "Unauthorized user"
  }
```

</details>

<details>
<summary><strong>DELETE</strong> <code>/post/:id</code></summary>

<br />

- Deletes the post with the specified id. Only the user that is the author of the post can delete it. **Requires a valid token**

<br />

Examples of *invalid* requests:
  
- Response for request to delete post of unauthorized user (status 401):
  
  ```json
  {
    "message": "Unauthorized user"
  }
```

- Response for request with invalid id (status 404):
  
  ```json
{
  "message": "Post does not exist"
}
```

</details>

<details>
<summary><strong>GET</strong> <code>/post/search?q=:searchTerm</code></summary>

<br />

- Returns an array of posts matching the searchTerm in their titles and/or content. Returns an empty array if there are no matches. **Requires a valid token**

<br />

- Example of response for valid entry:

```json
// GET /post/search?q=Vamos que vamos

[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
```

</details>
