/**
 * Created by kfu on 4/14/16.
 */

import AttachmentMessageData from './attachment-message-data.es6';

export default class ImageAttachmentMessageData extends AttachmentMessageData {
  /**
   * Constructor for Image Message Data
   *
   * @param {String} url: url of image
   * @returns {ImageAttachmentMessageData} image message data object
   */
  constructor(url) {
    super({
      type: 'image',
      payload: {
        url
      }
    });
  }
}
