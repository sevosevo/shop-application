# About this project

### Folder structure

Server:
* src
    * custom
        * authentication
            * authenticate.ts
            * passport.ts
        * helperFunctions
            * errorHandler.ts 
        * validators
            * categoryValidator.ts
            * departmentValidator.ts
            * productValidator.ts
            * profileValidator.ts
    * db
        * conn.ts
    * factories
        * Category.ts
        * Customer.ts
        * Product.ts
        * Review.ts
    * interfaces
        * Error 
    * models
        * product
            * Product.ts
            * ProductComplete.ts
            * ProductDetail.ts
        * review
    * routes
        * authController.ts
        * customerController.ts
        * productController.ts 
        * departmentController.ts
        * attributeController.ts
        * categoryController.ts
    * statics
    * app.ts
    * server.ts
* .gitignore
* package.json
* package-lock.json
* README.md
* tsconfig.json
* types.d.ts


## About Express and app.ts

I used Express.
In app.ts I wrote simple express setup. I used class because I am using Typescript so i thought it's more readable.

## About server.ts

In server.ts I am listening to port and syncing dbs with sequelize. 
I am also doing import statement on ./custom/authentication/passport, not importing anything from there i just want to run that file.

## About statics

I was doing Typescript with Sequelize. I managed to do something and it's located in ./statics/[any_file].
Statics are created from factories in ROOT/factories/[any_file].
I called them statics because they are like static methods in classes.
Statics return Sequelize instances. They also have their methods.
In my ROOT/models I created few files that export classes. These are simple classes mostly using static methods.
**I am using them for readability in my routes. They don't provide anything special and may not even be needed.** 
**I think they are good. If you look in productController you can see that calling some methods from them makes code more readable, clean but also might be too much.**
**For example we know what kind of response (product model) we are going to get if we call ProductDetail.findAll()**

## About db 

I am using Sequelize to make connection to mysql database.

## Error handling

I am using interface for error handling. Interface is found in ROOT/interfaces/Error.ts.
This interface enforces structure of errors.

Also, I created errorHandler function that is located in ROOT/custom/helperFunctions.
This function wraps a lot of routes and it's different based on NODE_ENV.
*If it's development, nicely formatted error is sent in json format, providing exact error information.*
*If It's production, this error handler will not show exact error but instead generic error message.*


Client:
* src
    * actions
        * -> list of actions
    * components
        * -> list of components
    * reducers
        * -> list of reducers 
    * selectors
        * calculate_rating.js
        * product_list_filter.js
    * App.js
    * fetch.js
    * formatData.js
    * index.js
    * store.js
    * types.js
* .gitignore
* package.json
* package-lock.json
* .babelrc
* webpack.config.js


