import { Router } from "express";
import blacklist from "./blacklist/index.js";
import nets from "./nets/index.js";
import commissions from "./commissions/index.js";

const rootRouter = Router();

rootRouter.use(blacklist);
rootRouter.use(nets);
rootRouter.use(commissions);

export default rootRouter;
