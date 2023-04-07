import express from "express";

import {
    getAllHolders,
    getHolderDetail,
    createHolder,
    updateHolder,
    deleteHolder,

    getHolderAndAsset,
    getLabelAndHolder,
    getAllHolderWalletAddress
} from "../controllers/holder.controller.js";

const router = express.Router();

router.route("/").get(getAllHolders);
router.route("/getAllHolderWalletAddress").get(getAllHolderWalletAddress);
router.route("/:address").get(getHolderDetail);
router.route("/getHolderAndAsset/:contract_address").get(getHolderAndAsset);
router.route("/getLabelAndHolder/:contract_address").get(getLabelAndHolder);
router.route("/").post(createHolder);
router.route("/:address").patch(updateHolder);
router.route("/:address").delete(deleteHolder);

export default router;
