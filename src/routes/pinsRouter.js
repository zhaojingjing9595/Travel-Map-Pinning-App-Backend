import { Router } from "express";
import Pin from '../models/PinSchema.js'

const pinsRouter = Router();

pinsRouter
    .route("/")
    .post(async (req, res) => { 
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).send(savedPin);
    } catch (error) {
        res.status(500).send(error)
    }
    })
    .get(async (req, res) => { 
        try {
            const pins = await Pin.find();
            res.send(pins);
            
        } catch (error) {
              res.status(500).send(error);
        }
    })

export default pinsRouter;