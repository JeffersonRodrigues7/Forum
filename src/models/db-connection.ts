import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE_NAME || "forum", process.env.DATABASE_USER || "root", process.env.DATABASE_PASS || "root", {
    dialect: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: +process.env.DATABASE_PORT! || 3306,
});

export { db };
