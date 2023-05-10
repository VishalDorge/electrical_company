import { sign } from "jsonwebtoken";
import { getPrivateKey } from "../../utility/key.generate";
import userServices from "../user/user.services";
import { IUser } from "../user/user.types";
import { AUTH_RESPONSES } from "./auth.responses";
import { ICredentials } from "./auth.types";
import { genSalt, hash, compare } from "bcryptjs";

const encrypt = async (user: IUser) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(user.password, salt);
    user.password = hashedPassword;
    return user;
}

const register = async (user: IUser) => {
    user = await encrypt(user);
    const result = userServices.create(user);
    return result;
}

const login = async (credentials: ICredentials) => {
    const user = await userServices.findOne({ email: credentials.email });
    if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
    const isPasswordMatched = await compare(credentials.password, user.password);
    if (!isPasswordMatched) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
    const { _id, role } = user;
    const privateKey = getPrivateKey();
    const token = sign({ id: _id, role: role }, privateKey, { algorithm: "RS256" });
    return { token, role };
}

export default {
    register, login
}