/**
 * Created by kfu on 4/13/16.
 */
import {FBMessenger} from '../../libs/msg/messenger.es6';
import config from 'config';
import * as Runtime from '../../libs/runtime.es6';
import Emitter, {Events} from '../events/index.es6';

const productionOrStaging = Runtime.isProduction();
const fbCredentials = config.get('Facebook');
console.log(fbCredentials);
const msgPlatform = new FBMessenger(fbCredentials.pageAccessToken, fbCredentials.verificationToken,
    fbCredentials.pageId, productionOrStaging);

console.info(`Initialized FB Messenger using ${Runtime.getEnv()} Credentials`);

msgPlatform.on(FBMessenger.RECEIVED, async event => {
  console.log('Received FBMessenger producer message in messaging.es6');
  Emitter.emit(Events.MSG_RECEIVED, event);
});


/**
 * MsgPlatform strategy
 * @type {MsgPlatform}
 */
export {msgPlatform as MsgPlatform};
