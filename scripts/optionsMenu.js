let optionsMenu = (function(){

    function show(){
        document.getElementById('options').classList.add('active');
    }

    function hide(){
        document.getElementById('options').classList.remove('active');
    }

    document.getElementById('options-back-button').addEventListener('click', function(){
        hide()
        mainMenu.show();
    });

    //Thrust Rebind
    document.getElementById('thrust-rebind').addEventListener('click', function(){

        document.getElementById('thrust-rebind').innerHTML = "Press Any Key";
        input.unbind(document.getElementById('thrust-key').innerHTML);
      
        window.addEventListener('keydown', bindThrustListner);


    })

    function  bindThrustListner(e){
            input.bind(e.key, myLander.thrust);
            document.getElementById('thrust-rebind').innerHTML = "Rebind";
            document.getElementById('thrust-key').innerHTML = e.key;

            //Cookie stuff
            //Set to this date so that the binds persist through sessions
            let cookiestring = "thrustkey=" + e.key+ "; expires=Tue, 19 Jan 2038 03:14:07 GMT";
            document.cookie = cookiestring

            window.removeEventListener('keydown', bindThrustListner)
    }

    //Rotate Right Rebind
    document.getElementById('right-rebind').addEventListener('click', function(){

        document.getElementById('right-rebind').innerHTML = "Press Any Key";
        input.unbind(document.getElementById('right-key').innerHTML);
      
        window.addEventListener('keydown', bindRightListner);
    })


    function  bindRightListner(e){
            input.bind(e.key, myLander.rotateRight);
            document.getElementById('right-rebind').innerHTML = "Rebind";
            document.getElementById('right-key').innerHTML = e.key;

            //Cookie stuff
            let cookiestring = "rightkey=" + e.key+ "; expires=Tue, 19 Jan 2038 03:14:07 GMT";
            document.cookie = cookiestring

            window.removeEventListener('keydown', bindRightListner)
    }

    //Rotate Left Rebind
    document.getElementById('left-rebind').addEventListener('click', function(){

        document.getElementById('left-rebind').innerHTML = "Press Any Key";
        input.unbind(document.getElementById('left-key').innerHTML);
      
        window.addEventListener('keydown', bindLeftListner);
    })


    function  bindLeftListner(e){
            input.bind(e.key, myLander.rotateRight);
            document.getElementById('left-rebind').innerHTML = "Rebind";
            document.getElementById('left-key').innerHTML = e.key;

            //Cookie stuff
            let cookiestring = "leftkey=" + e.key + "; expires=Tue, 19 Jan 2038 03:14:07 GMT";
            document.cookie = cookiestring

            window.removeEventListener('keydown', bindLeftListner)
    }

    return{
        show : show,
        hide : hide
    }

})();
/*
class optionsMenu{

    constructor(){
        document.getElementById('options').classList.remove('active');
        this.shouldRender= false;
    }

    show(){

        document.getElementById('options').classList.add('active');

    }

    hide(){
        document.getElementById('options').classList.remove('active');
    }
}*/