/* eslint-disable */
import * as Producer from './producer.es6';
import Emitter, {Events} from '../events/index.es6';
import {FbChatBot} from '../../libs/chat-bot/index.es6';
import {MsgPlatform} from './messaging.es6';

const fbChatBot = new FbChatBot(MsgPlatform);

/**
 * Dispatcher to handle system events
 */

Emitter.on(Events.MSG_RECEIVED, async event => {
  try {
    console.log(event);

    const response = await fbChatBot.handleEvent(event);
    MsgPlatform.sendMessageToId(event.sender.id, response);

  } catch (err) {
    // TODO - should notify slack of error so we can investigate
    console.error(err.stack);
  }
});
