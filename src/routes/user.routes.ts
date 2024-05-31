import express from 'express';
import { getMeHandler, updateUserMeHandler, updateUserPasswordHandler } from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from "../middleware/validate";
import { updateUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);

// Get currently logged in user
router.route('/me')
    .get(getMeHandler)
    .put(validate(updateUserSchema), updateUserMeHandler);

router.route('/me/password')
    .put(updateUserPasswordHandler);

export default router;

