import express, { json } from "express";
import { db } from "./models/db-connection";
import { router } from "./routes";
var cors = require("cors");

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(3001, async () => {
    try {
        await db.sync(); //Cria a tabela se ela já não existir
        console.log("Connected to the database");
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
});
