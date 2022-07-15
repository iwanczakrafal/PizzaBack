<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
  
  
## Description
This is a simple rest api for pizza portal.
As a guest you can only see the basic products, but after creating an account and logging in, you also get access to special products and the possibility of placing them in the basket.
As an administrator, you can do what the user can do with the extension of the ability to add new products, delete, edit and view all baskets.
In the directory test_database is database for testing with some records.
As admin you can login as email: admin@gmail.com pass: admin123.

## Guide
#### /user
As Admin
* `GET` : Get all users 

As All
* `POST` : Create a new account.
Example body {"name": "Tom", "lastName": "ToMmm", "email": "tomtom@gmail.com", "password": "tom123"}

As User
* `PUT` : Update password. 
Example {"password": "123"}
* `DELETE` : Delete a account

#### /user/find/:id
As Admin
* `GET` : Get a user


#### /product
As Admin
* `POST` : Create a new product. Multipart: name, price, description, photo : some file, isSecial: true/false

As All
* `GET` : Get all product without special

#### /product/:id
As All
* `GET` : Get a product

As Admin
* `DELETE` : Delete a product

#### /product/special
As User
* `GET` : Get all products with special products

#### /product/special/:id
As User
* `GET` : Get one product inculdes special porducts

#### /product/photo/:id
* `GET` : Get product photo

#### /option
As Admin
* `POST` : Create a new addon. Example {"name": "Cheese", "price": 2 }

As All
* `GET` : Get all addons

#### /option/:id
As Admin
* `PUT` : Change price of addon. Example {"price": 1 }
* `DELETE` : Delete addon

As User
* `GET` : Get addon

#### /basket
As User
* `POST` : Add product to basket. Example { "productId" : product id, "count": 1, "optionId": addon id}
* `GET` : Get all products in basket

### /basket/admin
As Admin
* `GET` : Get all baskets

### /basket/stats
As Admin
* `GET` : Get average price of products in baskets

### /basket/total-price
As User
* `GET` : Get total price of basket 

### /basket/all
As User
* `DELETE` : Clear user basket

### /basket/:basketProductId
As User
* `DELETE` : Remove one product from basket

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## License

Nest is [MIT licensed](LICENSE).
