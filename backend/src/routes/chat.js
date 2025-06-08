import { Router } from "express";
import { checkFirst, logControl, unlogControl, recordChat, getChatLog} from "../middleware/recordChat.js";
import { getAIResponse } from "../middleware/aiReply.js";

const router = Router();

router.route("/chat").post(checkFirst, logControl , unlogControl , recordChat , getChatLog , getAIResponse  ); // write the functions in same order as in orignal file because they are middleware functions and they will be executed in the order they are written here

export default router;