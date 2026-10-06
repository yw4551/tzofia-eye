import User from "../modules/auth.model.js";

export const getAllUsers = async () => {
    return await User.find();
};
