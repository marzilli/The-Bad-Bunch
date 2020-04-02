import { LightningElement, api } from 'lwc';

/**
 * Simple component to show if there is an error
 */
export default class ErrorNotification extends LightningElement {
  /**
   * @type {Error}
   **/
  @api error;

  //-- getters setters

  /**
   * Determines the message to provide
   * @type {String}
   */
  @api get message() {
    let results = 'An Error Occurred';
    if (this.error) {
      if(this.error.message) {
        results = this.error.message;
      } else if (this.error.statusText) {
        results = this.error.statusText;
      }
    }
    return results;
  }
}