import { Router } from "express";
import { createEvent } from "../controllers/createEvent.js";
import { listEvents } from "../controllers/listEvents.js";
import { addPlayer } from "../controllers/addPlayer.js";
import { removePlayer } from "../controllers/removePlayer.js";
import { updatePlayer } from "../controllers/updatePlayer.js";
import { getEvent } from "../controllers/getEvent.js";
import { removeEvent } from "../controllers/removeEvent.js";

const router = Router()

router.post("/event", createEvent)
router.post("/event/:id", addPlayer)

router.get("/event", listEvents)
router.get("/event/:id", getEvent)

router.delete("/event/:eventID/:playerID", removePlayer)
router.delete("/event/:id", removeEvent)

router.patch("/event/:eventID/:playerID", updatePlayer)

export default router;