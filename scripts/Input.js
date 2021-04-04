let input = (function(){

    let keys = {};
    let handlers = {};

    function keyPress(e){
        keys[e.key] = e.timeStamp;
    }


    function keyRelease(e){
        delete keys[e.key];
    }

    //Yay it works
    function process(elapsedTime){
        for (let key in keys){
            if(keys.hasOwnProperty(key)){
                if(handlers[key]){
                    handlers[key](elapsedTime);
                }
            }
        }
    };

    function bind(key, handler){
        //console.log("Binding "  + key + " to " + handler);
        handlers[key] = handler;
    }

    function unbind(key){
        console.log("Unbinding " + key);
        console.log(keys)
        delete handlers[key]
    }

    function rebind(key, handler){
        unbind(key);
        bind(keyPress, handler)        
    }

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);

    let api = {

        keys : keys,
        handlers : handlers,
        bind : bind,
        process : process,
        rebind : rebind,
        unbind : unbind
    }

    return api

})();