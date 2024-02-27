# 2024 MBDS project PixelBoard

## Introduction
this is a mono-repo project for the 2024 MBDS project PixelBoard. It contains the following packages:
- `client`: the frontend of the project
- `api`: the backend of the project

You can use this skeleton to start your project.    
You have to edit the root package.json file : 
- replace the name property (replace xxxx by the first letter of each member of your group)
- set the repository by setting the url of your project  


## Installation
To install the project, you need to clone the repository and install the dependencies. You can do this by running the following commands in the root directory of the project:
``` js
yarn
```

## Usage
To start the project, you need to run the following commands in the root directory of the project (in two separate terminals):
``` js
yarn start:client 
```
*call start script in ./packages/client package.json (to start the react client)*  

``` js
yarn start:api 
```
*call start script in ./packages/api package.json (to start the api)*


## Adding libraries

If you want to add library you can use the following commands (in the root directory of the project) :
``` js
yarn workspace <client|api> add <package-name> 
```
For example to add `express` to the api package you can run:
``` js
yarn workspace api add express
```

For example to add a librairy for devDependencies to the client package you can run:
``` js
yarn workspace client add -D <package-name>
```
