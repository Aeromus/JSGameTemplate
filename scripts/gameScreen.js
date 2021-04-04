let gameScreen = (function(){

    function show(){
        document.getElementById('game-play').classList.add('active');
    }

    function hide(){
        document.getElementById('game-play').classList.remove('active');
    }

    return{
        show : show,
        hide : hide
    }

})();

/*class gameScreen{

    constructor(){
        document.getElementById('game-play').classList.remove('active');
    }

    show(){
        document.getElementById('game-play').classList.add('active');
    }

    hide(){
        document.getElementById('game-play').classList.remove('active');
    }

}*/