import express from "express";

import {
    getHolderOracleDetail
} from "../controllers/oracle.controller.js";

const router = express.Router();

router.route("/:address").get(getHolderOracleDetail);

export default router;
