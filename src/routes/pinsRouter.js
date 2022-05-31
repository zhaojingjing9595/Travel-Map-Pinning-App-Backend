import { Router } from "express";
import pinsController from "../controllers/pinsController.js";

const pinsRouter = Router();

pinsRouter
  .route("/")
  .post(pinsController.saveNewPin)
  .get(pinsController.getPins);

export default pinsRouter;