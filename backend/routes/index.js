import express from "express";

import {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember,
    deleteMember
} from "../controllers/Members.js";

const router = express.Router();

router.get("/", getAllMembers);
router.get("/:id", getMemberById);
router.post("/", createMember);
router.patch("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;