import express from "express";

import {
    getHolderOracleDetail
} from "../controllers/oracle.controller.js";

const router = express.Router();

router.route("/:contract_address").get(getHolderOracleDetail);

export default router;
