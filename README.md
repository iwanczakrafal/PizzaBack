#  Pizza portal v1.0.0 backend 

## Description

This is a simple rest api for pizza portal.
As a guest you can only see the basic products, but after creating an account and logging in, you also get access to special products and the possibility of placing them in the basket.
As an administrator, you can do what the user can do with the extension of the ability to add new products, delete, edit and view all baskets.
In the directory test_database is database for testing with some records.
As admin you can login as email: admin@gmail.com pass: admin123.

##  Resources
**Live demo:** IN PROGRESS \
**Github backend:** https://github.com/iwanczakrafal/PizzaBack \
**Github frontend:** https://github.com/iwanczakrafal/PizzaFront 

## Tech Stack
<p align="left"><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>&nbsp;&nbsp;&nbsp;&nbsp;<img height="40" width="40" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" alt="express"/>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://nestjs.com" target="_blank" rel="noreferrer"> <img src="https://user-images.githubusercontent.com/100524322/191305250-04a0e23d-eae2-48fc-9c47-eed322a478b2.svg" alt="nestjs" width="40" height="40"/></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> </p>

##  Project structure
```
PizzaBack/
├── src/
│   ├── auth/
│   │   └── dto
│   ├── basket/
│   │   ├── dto
│   │   └── entities
│   ├── decorators/
│   │   └── user-obj.decorator.ts
│   ├── option/
│   │   ├── dto
│   │   └── entities
│   ├── products/
│   │   ├── dto
│   │   └── entities
│   ├── types/
│   │   ├── basket
│   │   ├── files
│   │   ├── option
│   │   ├── product
│   │   └── user
│   ├── user/
│   │   ├── dto
│   │   └── entities
│   └── utils/
│       ├── hash-password.ts
│       └── storage.ts
├── storage/
│   └── products-photos/
│       ├── 0b7a9328-4cec-479b-bb38-a9b0fbe70a5a.png
│       ├── 2cbc5ab8-bbd5-4963-ba64-ea36dbef4307.png
│       ├── 4a9871a2-70e7-409d-ba6c-7cc681a43835.png
│       ├── 6bd18e4e-b18a-4d56-bcbf-dbb46e51aa31.png
│       ├── 8734dbf0-c339-496a-8226-aba10cc66e6f.png
│       ├── 026057c6-cb5a-4b6e-8ad3-2f0c18d44b9a.png
│       ├── abcbbef8-0c92-4622-8dd0-bdd738db6934.png
│       └── cc011a30-c216-4955-853b-b3e733d5234a.png
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── test_database/
│   └── _NEST_PIZZA_.sql
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

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


##  Installation project

**Clone the project:**
```
git clone https://github.com/iwanczakrafal/PizzaBack.git
```
**Go to the project directory:**
```
cd PizzaBack
```
**Install dependencies:**
```
npm install
```
**Start the server:**
```
npm start 
npm start:dev (for developer)
```

## The application is currently being expanded to include functionality:
* implement mailer system,
* online order fulfillment,
* payment execution,
