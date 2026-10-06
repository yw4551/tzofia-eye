import User from "../modules/auth.model.js";

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id) => {
    return await User.find({ id });
};

export const findUserByUsername = async (username) => {
    return await User.findOne({username})
}

export const createUser = async (data) => {
    return await User.create(data);
};
