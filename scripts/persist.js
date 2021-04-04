let persist = ( function(){

    let highScores = {};
    let previousScores = localStorage.getItem("highscores");

    if(previousScores !== null){
        highScores = JSON.parse(previousScores);
    }

    function add(key, value){
        highScores[key] = value;
        localStorage['highscores'] = JSON.stringify(highScores);
    }

    function remove(key){
        delete highScores[key];
        localStorage["highscores"] = JSON.stringify(highScores);
    }

    function report(){

        let htmlNode = document.getElementById('scores-area');
        console.log("Printing High scores");
        console.log(highScores);
        for(let key in highScores){
            htmlNode.innerHTML += "<pre>      " + key + "         " + highScores[key] + "     </pre>";
        }
    }

   

    return {

        add : add,
        remove : remove, 
        report : report
    }



})();