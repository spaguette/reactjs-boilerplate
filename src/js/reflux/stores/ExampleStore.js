import EventEmitter from 'events';
var CONTENT_CHANGE = 'CONTENT_CHANGE';

var ExampleStore = Object.assign({}, EventEmitter.prototype, {
    content: null,

    emitContentChange: function () {
        this.emit(CONTENT_CHANGE);
    },

    isLoaded: function () {
        return !!this.content;
    },

    /**
     * @param {function} callback
     */
    addContentChangeListener: function (callback) {
        this.on(CONTENT_CHANGE, callback);
    },

    rewriteContent: function (data) {
        if (data) {
            this.content = data;
            this.emitContentChange();
        }
    },

    /**
     * @param {function} callback
     */
    removeContentChangeListener: function (callback) {
        this.removeListener(CONTENT_CHANGE, callback);
    }
});

export default ExampleStore;