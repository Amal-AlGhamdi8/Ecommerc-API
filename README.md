
# Full-stack e-commerce app
1. Concept of middleware

2. create a basic server
- create a simple server
- add .gitignore for node.js
- create a simple get route for health checkups
- run the project with Nodemon
- setup the env variable
- create a config folder and access the env variables
- add express error handler middleware

3. Testing API and Security
- create a Postman collection and check the health
- morgan setup
- cors setup
- express-rate-limit to limit the response

4. Create Product CRUD API
- GET: /products -> return all the products
- organize everything following MVC Architecture
  - create models -> productModel.js
  - create routers -> productRouter.js
  - create controllers -> productController.js
- create errorResponse and successResponse
- GET: /products/:id -> return as single product
- Validation: express-validator validation
- DELETE: /products/:id -> delete a product
- POST: /products -> create a product

5. Front-end
- create a basic React app
- etch the products from the server
- delete product from the server

# improve Full-stack e-commerce app

1- Backend (Product CRUD API)
- Follow MVC Architecture
- handle client and server errors with express error middleware
- setup the cors, dev setup: nodemon, morgan
- HTTP Requests
  - GET: /products -> get All products
  - GET: /products/:id -> get a single product
  - DELETE: /products/:id -> delete single product based on id
  - POST: /products -> create the product
  - PUT: /products/:id -> update the product
  - Add express-validator validation

2- Front-end (Do not focus on design but functionality)
- Read all the products from the API
- create a product (call the API)
- Delete a product (call the API)
- Update product (call the API)