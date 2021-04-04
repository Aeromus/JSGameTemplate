let menus = (function(){

    let gamestart = [];

    document.getElementById('new-game-button').addEventListener('click', function(){
            gameScreen.show();
            mainMenu.hide();
            creditsMenu.hide();
            optionsMenu.hide();
            highscoresMenu.hide();
            gamestart.push('true');
            //gamestart = true;
        });

        document.getElementById('high-scores-button').addEventListener('click', function(){
            gameScreen.hide();
            mainMenu.hide();
            creditsMenu.hide();
            optionsMenu.hide();
            highscoresMenu.show();
        });

        document.getElementById('options-screen-button').addEventListener('click', function(){
            gameScreen.hide();
            mainMenu.hide();
            creditsMenu.hide();
            optionsMenu.show();
            highscoresMenu.hide();
        });

        document.getElementById('credits-button').addEventListener('click', function(){
            gameScreen.hide();
            mainMenu.hide();
            creditsMenu.show();
            optionsMenu.hide();
            highscoresMenu.hide();
        });

        mainMenu.show();

        function getGamestart(){
            return gamestart;
        }

        return{
            getGamestart : getGamestart,
            gamestart : gamestart
        }

})();
