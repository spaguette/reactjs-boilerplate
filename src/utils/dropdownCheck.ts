const compose = (...fns: Function[]) => fns.reduceRight((prevFn, nextFn) => (...args: any[]) => nextFn(prevFn(...args)), (value: any) => value);

class OutsideClickHandler {
    _handlersMap = new Map()

    _makeChainable = (fn: Function) => (...args: any[]) => compose(() => this, fn.bind(this._handlersMap)(...args))

    _handleOutsideClick = (evt: Event) => {
        this._handlersMap.forEach((handler, el) => !el.contains(evt.target) && handler(evt))
    }

    initialize = () => document.addEventListener('click', this._handleOutsideClick)
    destroy = () => document.removeEventListener('click', this._handleOutsideClick)

    set = this._makeChainable(this._handlersMap.set)
    delete = this._makeChainable(this._handlersMap.delete)
}

const outsideClickHandlerSingleton = new OutsideClickHandler();

export default outsideClickHandlerSingleton;