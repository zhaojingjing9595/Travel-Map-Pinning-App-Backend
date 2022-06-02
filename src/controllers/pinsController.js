import Pin from "../models/PinSchema.js";

async function saveNewPin(req, res, next) {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).send(savedPin);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getPins(req, res, next) {
  try {
    const pins = await Pin.find();
    res.send(pins);
    next();
  } catch (error) {
    res.status(500).send(error);
  }
}

export default { saveNewPin, getPins };
 