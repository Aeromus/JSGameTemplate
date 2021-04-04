let highscoresMenu = (function(){

    function show(){
        document.getElementById('high-scores').classList.add('active');
        persist.report();
    }

    function hide(){
        document.getElementById('high-scores').classList.remove('active');
    }

     document.getElementById('high-scores-back-button').addEventListener('click', function(){
        hide();
        mainMenu.show();
    })

    return{
        show : show,
        hide : hide
    }

})();


/*class highscoresMenu{

    constructor(){
        document.getElementById('high-scores').classList.remove('active');
    }

    show(){
        document.getElementById('high-scores').classList.add('active');
    }

    hide(){
        document.getElementById('high-scores').classList.remove('active');
    }

}*/