import express from "express";
import UserController from "./controllers/UserController";
import { db } from "./models/db-connection";

const router = express.Router();

router.post("/users", UserController.create);

router.get("/users/:userID", UserController.findOne);
router.get("/users/userName/:userName", UserController.findOneByName);
router.get("/users/email/:email", UserController.findOneByEmail);
router.get("/users/login/:login", UserController.findLogin);

/*
router.get("/users", UserController.findAll);
router.put("/users/:userID", UserController.update);
router.delete("/users/:userID", UserController.delete);
*/

export { router };
