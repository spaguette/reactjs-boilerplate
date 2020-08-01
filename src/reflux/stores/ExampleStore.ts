import * as EventEmitter from 'events';

const CONTENT_CHANGE = 'CONTENT_CHANGE';

type EventCallback = (...args: any[]) => void

class ExampleStore extends EventEmitter.EventEmitter {
    public content: any | null

    constructor() {
        super()
        this.content = null
    }

    emitContentChange() {
        super.emit(CONTENT_CHANGE);
    }

    isLoaded() {
        return !!this.content;
    }

    addContentChangeListener(callback: EventCallback) {
        super.on(CONTENT_CHANGE, callback);
    }

    rewriteContent(data: any) {
        if (data) {
            this.content = data;
            this.emitContentChange();
        }
    }

    removeContentChangeListener(callback: EventCallback) {
        super.removeListener(CONTENT_CHANGE, callback);
    }
}

export default ExampleStore;