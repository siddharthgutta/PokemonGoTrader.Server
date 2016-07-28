/**
 * Created by kfu on 4/13/16.
 */

import {Router} from 'express';
import {MsgPlatform} from '../api/controllers/messaging.es6';
import {FBMessenger} from '../libs/msg/messenger.es6';

const router = new Router();

if (MsgPlatform instanceof FBMessenger) {
  router.use(MsgPlatform.router());
}

export {router as FbRouter};
