import express from "express";
import {
  handleStringFilter,
  handleFetchOperation,
} from "../controllers/bfhl.controller";

const bfhlRouter = express.Router();

bfhlRouter.post("/", handleStringFilter);
bfhlRouter.get("/", handleFetchOperation);

export default bfhlRouter;
