# Final Project Online Music Platform

This is an online music platform implemented with [React](https://reactjs.org/) and [MongoDB](https://www.mongodb.com/).

## Clone Project

### `git clone ${git_url}` 

To clone the entire project.

## Install Packages

In the project directory /final/, you could run:

### `cd frontend`

### `yarn install`

To install packages needed for frontend.

Similarly, you could run:

### `cd backend`

### `yarn install`

To install packages needed for backend.

## Store Data in MongoDB

After adding an entry by clicking ADD button, the website would send the data to MongoDB for fear of losing data when server shutdowns accidentally.

In order to work with MongoDB successfully, one should apply an account on [MongoDB Atlas](https://www.mongodb.com/atlas/database) to have access to the database.

After successfully creates an account, one should put the log in URL in the .env file under /hw6/backend/ with the format of:

### `MONGO_URL=${mongodb+srv://<user_name>:<password>@<cluster_name>.kut62cp.mongodb.net/?retryWrites=true&w=majority}`

Note that sometimes you would have to go to Network Access in the MongoDB website in order to add an valid IP address into whitelist.

![MongoDB Network Access](https://i.imgur.com/bz57suX.png)

## Start Online Music Platform with Server

In the project directory /final/, you could run:

### `yarn start`

To start the website at [http://localhost:3000/](http://localhost:3000/).

Similarly, you could run:

### `yarn server`

To start the server needed for the website at [http://localhost:4000/](http://localhost:4000/).

## About Basic Functionalities

To be added after finishing the entire final project.


