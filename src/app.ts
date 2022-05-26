import express from "express";
import cors from "cors";
import router from "./router";
import UserController from "./controllers/UserController";
import Middlewares from "./middleware";
import PostController from "./controllers/PostController";
import FriendsController from "./controllers/FriendsController";
import SubscribersController from "./controllers/SubscribersController";
import fileUpload from "express-fileupload";
import MediaController from "./controllers/MediaController";
import ChatController from "./controllers/ChatController";
import MessageController from "./controllers/MessageController";
import LikeController from "./controllers/LikeController";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));

app.get("/", (req, res) => {
    res.send("The sedulous hyena ate the antelope!");
});

app.post("/login", UserController.auth);
app.post("/users", UserController.create);
app.get("/users", UserController.readAll);
app.get("/users/:id", UserController.readOne);
app.put("/users/:id", UserController.update);
app.delete("/users/:id", UserController.delete);

app.get("/posts", PostController.readAll);
app.get("/posts/:id", PostController.readOne);
app.post("/posts", PostController.create);
app.patch("/posts/:id", PostController.update);
app.delete("/posts/:id", PostController.delete);

app.post("/friends", FriendsController.create);
app.get("/friends", FriendsController.readAll);
app.get("/friends/:id", FriendsController.readOne);
app.delete("/friends/:id", FriendsController.delete);

app.post("/subscribers", SubscribersController.create);
app.get("/subscribers", SubscribersController.readAll);
app.get("/subscribers/:id", SubscribersController.readOne);
app.delete("/subscribers/:id", SubscribersController.delete);

app.post("/chats", ChatController.create);
app.get("/chats", ChatController.readAll);
app.get("/chats/:id", ChatController.readOne);
app.patch("/chats/:id", ChatController.update);
app.delete("/chats/:id", ChatController.delete);

app.post("/messages", MessageController.create);
app.get("/messages", MessageController.readAll);
app.get("/messages/:id", MessageController.readOne);
app.put("/messages/:id", MessageController.update);
app.delete("/messages/:id", MessageController.delete);

app.post("/likes", LikeController.create);
app.get("/likes", LikeController.readAll);
app.get("/likes/:id", LikeController.readOne);
app.delete("/likes/:id", LikeController.delete);

app.post("/media", MediaController.create);
app.get("/media", MediaController.readAll);
app.delete("/media/:id", MediaController.delete);

app.listen(port, () => console.log(`server is listening on ${port}`));
