let creditsMenu = (function(){

    function show(){
        document.getElementById('credits').classList.add('active');
    }

    function hide(){
        document.getElementById('credits').classList.remove('active');
    }

    //Make back button function
    document.getElementById('credits-back-button').addEventListener('click', function(){
        hide()
        mainMenu.show();
    });

    return{
        show : show,
        hide : hide
    }

})();

/*class creditsMenu{

    constructor(){
        document.getElementById('credits').classList.remove('active');
    }

    show(){
        document.getElementById('credits').classList.add('active');
    }

    hide(){
        document.getElementById('credits').classList.remove('active');
    }

}*/