import express from "express";
import { test } from "../Controllers/user.controller.js";

const router = express.Router();

router.get('/test',test)


// cz we export this as default. So that we can import this in other files by using any name.
export default router;