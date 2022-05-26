import jwt from "jsonwebtoken";

const TokenHelper = {
    generateToken: (userId: number) =>
        jwt.sign({ user_id: userId }, process.env.TOKEN_KEY, {
            expiresIn: "1h",
        }),
};

export default TokenHelper;
