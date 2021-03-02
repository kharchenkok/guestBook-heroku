import { Router } from "express";
import { validate } from "../helpers/validate.js";
import { messagesList,addMessage,createMessageSchema} from "./messages.model.js";

const router = Router();

router.get("/", messagesList);
router.post("/", validate(createMessageSchema), addMessage);


  
export const messagesRouters = router;