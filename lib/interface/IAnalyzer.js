/**
 * @class Analyze message content.
 * @name IAnalyzer
 * @static
 */
var analyzer = {
    /**
     * @param {Object} Telegram message.
     * @returns {Boolean}
     *
     * @example
     * // If this is text message.
     * is: function (message) {
     *     return typeof message.text === 'string';
     * }
     */
    is: function (message) {
        // return typeof message.text === 'string';
    },

    /**
     * @param {Object} Telegram message.
     * @returns {Object} Object with fields:
     * — {String} type Type of message (like `photo`, `location`, `photo`, `custom-message` etc);
     * — {Number} weight Probability of type message;
     * — and other custom fields, like `text`, `image` etc.
     */
    getData: function (message) {
        // return {
        //     type: consts.TEXT,
        //     weight: 0.1,
        //     text: message.text
        // };
    }
};