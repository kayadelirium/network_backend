import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const Middlewares = {
    verifyToken: (req: Request, res: Response, next) => {
        const token = req.headers["Authorization"];

        if (!token) {
            res.status(401).send();
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.body.user = decoded;
        } catch (err) {
            return res.status(401).send();
        }
        return next();
    },
};

export default Middlewares;
