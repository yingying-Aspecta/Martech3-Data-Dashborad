import express from "express";

import {
    getAllHolders,
    getHolderDetail,
    createHolder,
    updateHolder,
    deleteHolder,

    getHolderAndAsset,
    getLabelAndHolder
} from "../controllers/holder.controller.js";

const router = express.Router();

router.route("/").get(getAllHolders);
router.route("/:id").get(getHolderDetail);
router.route("/getHolderAndAsset/:contract_address").get(getHolderAndAsset);
router.route("/getLabelAndHolder/:contract_address").get(getLabelAndHolder);
router.route("/").post(createHolder);
router.route("/:id").patch(updateHolder);
router.route("/:id").delete(deleteHolder);

export default router;
