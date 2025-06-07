import { Router } from "express";
import { checkFirst, logControl, unlogControl, recordChat, getChatLog} from "../middleware/recordChat.js";

const router = Router();

router.route("/chat").post(checkFirst, logControl , unlogControl , recordChat , getChatLog );

export default router;