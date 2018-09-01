import EventEmitter from 'events';
var CONTENT_CHANGE = 'CONTENT_CHANGE';

var ExampleStore = Object.assign({}, EventEmitter.prototype, {
    content: null,

    emitContentChange() {
        this.emit(CONTENT_CHANGE);
    },

    isLoaded() {
        return !!this.content;
    },

    /**
     * @param {function} callback
     */
    addContentChangeListener(callback) {
        this.on(CONTENT_CHANGE, callback);
    },

    rewriteContent(data) {
        if (data) {
            this.content = data;
            this.emitContentChange();
        }
    },

    /**
     * @param {function} callback
     */
    removeContentChangeListener(callback) {
        this.removeListener(CONTENT_CHANGE, callback);
    }
});

export default ExampleStore;