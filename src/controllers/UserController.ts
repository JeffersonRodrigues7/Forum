import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
const bcrypt = require("bcryptjs");

class UserController {
    async findAll(req: Request, res: Response) {}
    async findOne(req: Request, res: Response) {}

    async findLogin(req: Request, res: Response) {
        const email = req.query.email?.toString();
        const password = req.query.password?.toString();

        try {
            const user: any = await UserModel.findOne({
                where: {
                    email: email,
                },
            });

            if (user) {
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    return res.status(204).json(user);
                } else {
                    return res.status(200).send("Senha inválida");
                }
            } else {
                return res.status(201).send("Usuário não encontrado");
            }
        } catch (error: any) {
            console.error("Erro ao tentar fazer login: ", error);
            return res.send(error.message);
        }
    }

    async findOneByName(req: Request, res: Response) {
        const userName = req.query.userName?.toString();

        try {
            const user = await UserModel.findOne({
                where: {
                    userName: userName,
                },
            });

            return user ? res.status(204).send() : res.status(200).json(user);
        } catch (error: any) {
            console.error("Erro ao encontrar usuário pelo nome: ", error);
            return res.send(error.message);
        }
    }

    async findOneByEmail(req: Request, res: Response) {
        const email = req.query.email?.toString();

        try {
            const user = await UserModel.findOne({
                where: {
                    email: email,
                },
            });
            return user ? res.status(204).send() : res.status(200).json(user);
        } catch (error: any) {
            console.error("Erro ao encontrar usuário pelo e-mail: ", error);
            return res.send(error.message);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { userName, email, password } = req.body;
            const user = await UserModel.create({
                userName,
                email,
                password,
            });
            return res.status(201).json(user);
        } catch (error: any) {
            console.error(error);
            return res.send(error.message);
        }
    }

    async update(req: Request, res: Response) {}
    async delete(req: Request, res: Response) {}
}

export default new UserController();
