import {Router} from "express";
import {getAllUsers,getMessages,markMessageAsSeen} from "../controllers/message.controller.js";
import {auth} from "../middlewares/auth.middleware.js" 

const messagerouter=Router();

messagerouter.route('/users').get(auth,getAllUsers);
messagerouter.route('/:id').get(auth,getMessages);
messagerouter.route('/mark/:id').put(auth,markMessageAsSeen);
messagerouter.route("/send/:id").post(auth,sendMessage);

export default messagerouter;