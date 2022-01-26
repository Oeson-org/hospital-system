/**
 * message - message to be sent
 * pages - number of pages of response
 * data - data to be sent
 */
class response {
  /**
   * @param {string} message - message to be sent
   * @param {string} pages - number of pages
   * @param {object} data - data to be sent
   */
  constructor(message, pages, data) {
    this.message = message;
    this.pages = pages;
    this.data = data;
  }
  /**
   * @return {object} - response object
   */
  givenresponse() {
    return { message: this.message, pages: this.pages, data: this.data };
  }
}
/**
 * @class SuccessMessage
 * @description - class for success message response. Status(200)
 * @param {string} message - message to be sent
 * @param {string} pages - number of pages of response
 * @param {object} data - data to be sent
 * @return {object} - response object
 */
class SuccessMessage extends response {
  /**
   * @param {string} message - message to be sent
   * @param {string} pages - number of pages
   * @param {data} data - data to be sent
   */
  constructor(message, pages, data) {
    super(message, pages, data);
  }
  /**
   * @return {object} - response object
   */
  responseMessege() {
    return super.givenresponse();
  }
}
/**
 * @class ErrorMessage
 * @description - class for error message response. Status(400)
 * @param {string} message - message to be sent
 * @return {object} - response object
 */
class ErrorMessage extends response {
  /**
   * @param {string} message - message to be sent
   */
  constructor(message) {
    super(message, null, null);
  }
  /**
   * @return {object} - response object
   */
  responseMessege() {
    return super.givenresponse();
  }
}
/**
 * @description Function to call for the standard response classes
 * @param {string} message - message to be sent
 * @param {string} pages - number of pages of response
 * @param {data} data - data to be sent
 * @return {object} - response object
 */
const responseFactory = (message, pages, data) => {
  if (data === null) {
    return new ErrorMessage(message).responseMessege();
  } else {
    return new SuccessMessage(message, pages, data).responseMessege();
  }
};

module.exports = { responseFactory };
