# 2024 MBDS project PixelBoard

## Introduction
this is a mono-repo project for the 2024 MBDS project PixelBoard. It contains the following packages:
- `client`: the frontend of the project
- `api`: the backend of the project


## Installation
To install the project, you need to clone the repository and install the dependencies. You can do this by running the following commands in the root directory of the project:
```shell
yarn install
```
You also need to pull the docker images
```shell
docker compose up --build -d
```

For database access to work, you'll need to create a `.env` file in the `packages/api` folder, containing these informations: 
```
MONGO_HOST = 'localhost'
MONGO_PORT = 27017
MONGO_DBNAME = 'react_place'
MONGO_USERNAME = 'user'
MONGO_PASSWORD = 'pass'

JWT_SECRET = '0d96d53c2b02879f1d5a1dd7e7f9f06174891649dd1682a47311e83ebfb7d6d5'
```


## Usage
To start the project, you need to run the following commands in the root directory of the project (in two separate terminals):
```shell
yarn start:client 
```
*call start script in ./packages/client package.json (to start the react client)*  

```shell
yarn start:api 
```
*call start script in ./packages/api package.json (to start the api)*

Don't forget to run the docker container, it contains the MongoDB database.


## Contributors and Tasks

- AARJI Yahya [@aarjinho](https://github.com/aarjinho)
- ADMESSIEV Ayoub [@AyoubAdm](https://github.com/AyoubAdm)
  - Navbar Creation
  - Dark Theme
  - Profile Page
    - Display User name, user email
    - List contributions to boards 
  - Login / Signup Page
- BELLET Maxime [@PandaShad](https://github.com/PandaShad)
  - Backend
    - Routes, Services and Models creation for Board / User / Pixel / Auth
  - PixelBoard
    - Time remaining
    - Title, dimensions, waiting time
    - Possibility (or not) to override a pixel
    - Can draw a pixel for anonymous users
  - Admin Panel
    - Display, Filter, Sort all Boards
  - Sockets   
- BERNAUD Benjamin [@benj-b](https://github.com/benj-b)
  - HomePage
    - User Count
    - Number of boards created
    - List of boards (ongoing, upcoming and finished)
  - Admin Panel
    - Create Board
    - Update, Delete a Board  
  - Board visualization
- GUO Yue [@Yue-laure](https://github.com/Yue-laure)
  - Profile Page

## Testing

We created an admin user for the tests to be easier : 
```
mail:admin@admin.com
pass:admin
```
(The admin user can create boards and manage them)

To create a simple user, you can sign up through the signup form.
