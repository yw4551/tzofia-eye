import User from "../modules/auth.model.js";

export const getAllUsers = async () => {
    return await User.find();
};

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createUser = async (data) => {
    return await User.create(data);
};

export const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};
