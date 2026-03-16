import  express from "express"
import {getStreamToken} from "../controllers/chatControllers.js"
import {protectRoute} from "../middleware/protectRoute.js";
import {createSession} from "../controllers/sessionControllers.js"
import {getActiveSessions} from "../controllers/sessionControllers.js"
import {getMyRecentSessions} from "../controllers/sessionControllers.js"
import {getSessionById} from "../controllers/sessionControllers.js"
import {joinSession} from "../controllers/sessionControllers.js"
import {endSession} from "../controllers/sessionControllers.js"

const router  = express.Router()

router.post("/" , protectRoute , createSession);
 router.get("/active" ,protectRoute,getActiveSessions);

router.get("/my-recent" ,protectRoute,getMyRecentSessions);
 router.get("/:id" ,protectRoute,getSessionById ); // /api.session/32313
 router.get("/:id/join" ,protectRoute,joinSession );
 router.get("/:id/end" ,protectRoute,endSession );


export default router ;