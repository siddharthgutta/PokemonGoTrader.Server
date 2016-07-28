/* Disabling lint rule since it doesn't make sense. */
/* eslint-disable babel/generator-star-spacing,one-var,valid-jsdoc */

import {TextMessageData} from '../../msg/facebook/message-data.es6';

export default class FbChatBot {
  constructor(msgPlatform) {
    this.msgPlatform = msgPlatform;
  }

  static events = {
    postback: 'Postback',
    text: 'Text',
    attachment: 'Attachment',
    quickReply: 'Quick Reply'
  };

  /**
   * Handles input event from FB Messenger
   *
   * @param {Object} event: The event sent to us
   * @private
   */
  handleEvent(event) {
    console.log(event);
    return new TextMessageData('Hello I am the PokemonGo Trader bot!');
  }

  getEventType(event) {
    if (event.postback) {
      return FbChatBot.events.postback;
    }

    if (event.message && event.message.quick_reply) {
      return FbChatBot.events.quickReply;
    }

    /* Checking event.message.quick_reply here is redundant, but it's to make clear that
     * both text and quick reply events have text */
    if (event.message && event.message.text && !event.message.quick_reply) {
      return FbChatBot.events.text;
    }

    if (event.message && event.message.attachments) {
      return FbChatBot.events.attachment;
    }

    return null;
  }

  genPayload(action, data) {
    return JSON.stringify({action, data});
  }

  getAction(payload) {
    return payload.action;
  }

  getData(payload) {
    return payload.data;
  }
}
