import { Router } from "express";
import { createEvent } from "../controllers/createEvent.js";
import { listEvents } from "../controllers/listEvents.js";

const router = Router()

router.post("/event", createEvent)
router.get("/event", listEvents)

export default router;