import jwt from "jsonwebtoken";
import User from "../modules/auth.model.js";

export const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const token = header.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(payload.id)
            .select("_id username email role assignedArena")
            .lean();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const isAdmin = async (req, res, next) => {
    const { role } = req.user.role;

    if (role !== "admin") {
        res.status(403).json({
            success: false,
            message: "Admin access required",
        });
    }

    next();
};
