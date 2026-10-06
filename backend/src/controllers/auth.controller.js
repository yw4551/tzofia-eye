import { getAllUsers } from "../repositories/auth.repository.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.json({
            success: true,
            data: {
                users,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Could not load users",
        });
    }
};
