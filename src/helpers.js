function createElement(tag, props, ...children) {

    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    children.forEach(child => {

        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);       
              
    });

    return element;
}

class EventEmitter {
    constructor(){
        this.events = {};
    }

    on(type, callback){
        this.event[type] = this.event[type] || [];
        this.event[type].push(callback);
    }

    emit(type, arg){
        if(this.event[type]){
            this.events[type].forEach(callback => callback(arg));
        }
    }
}
export { createElement, EventEmitter };