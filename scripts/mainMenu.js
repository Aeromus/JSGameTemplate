let mainMenu = (function(){

    function show(){
        document.getElementById('main-menu').classList.add('active');
    }

    function hide(){
        document.getElementById('main-menu').classList.remove('active');
    }

    return{
        show : show,
        hide : hide
    }

})();

/*class mainMenu{
    constructor(){
        document.getElementById('main-menu').classList.remove('active');
        this.shouldRender = false;
    }


    show(){
        document.getElementById('main-menu').classList.add('active');
    }

    hide(){
        document.getElementById('main-menu').classList.remove('active');
    }
}*/