    let lastTimeStamp = performance.now();
    let inputBuf = [];
    let myTerrain = [];
    let gamestart = false;

    let gameOver = false;
    let gameWin = false;
    let getscore =false;
    let debug = false;

    //The two image assests that are needed
    //Maybe break these into classes later

    circle = {center: myLander.center,radius: myLander.radius}
    pt1={x: myLander.center.x -15, y: myTerrain[Math.trunc(myLander.center.x - 15)]}
    pt2={x: myLander.center.x + 15 , y: myTerrain[Math.trunc(myLander.center.x+15)]};

    let myBackground = {
        imageSrc: 'assets/mars.png',
        center: { x: 500, y: 500},
        size: {width: 1000, height: 1000},
        rotation: 0
    };
    
    myBackground.ready = false;
    myBackground.image = new Image();
    myBackground.image.onload = function() {
        myBackground.ready = true;
    };
    myBackground.image.src = myBackground.imageSrc;

    let explosionImg = {
        imgSrc: "assets/explosion.png",
        center:{x: 500, y: 500},
        size: {width: 50, height: 50},
        roation: 0
    };
    explosionImg.ready = false;
    explosionImg.image = new Image();
    explosionImg.image.onload = function() {
        explosionImg.ready = true;
    };
    explosionImg.image.src =explosionImg.imgSrc;

    let explosionSound = new Audio("sounds/explosion.mp3");
    let explosionPlayed = false;

    let winSound = new Audio("sounds/win.wav");
    let winPlayed =false;


    //End of Assets

    //Binding Inputs if no cookie for said input, use default from wasd
    if(getCookie("thrustkey") != ""){
        let value = getCookie('thrustkey');
        input.bind(value, myLander.thrust)
        document.getElementById('thrust-key').innerHTML = value;
    }
    else{
        input.bind('w', myLander.thrust);
    }
    if(getCookie("leftkey") != ""){
        let value = getCookie('leftkey');
        input.bind(value, myLander.rotateLeft)
        document.getElementById('left-key').innerHTML = value;
    }
    else{
        input.bind('a', myLander.rotateLeft);
    }
    if(getCookie('rightkey') != ""){
        let value = getCookie('rightkey');
        input.bind(value, myLander.rotateRight);
        document.getElementById('right-key').innerHTML =value;
    }
    else{
        input.bind('d', myLander.rotateRight);
    }
    console.log(input.handlers)

    //Temporary Terrain Gen, will replace when gamesates are implemented
    myTerrain = terrain.genTerrain(1000, 800, 250, 0.7);

    //Check Intersection
    function lineCircleIntersection(pt1, pt2, circle) {
        let v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y };
        let v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y };
        let b = -2 * (v1.x * v2.x + v1.y * v2.y);
        let c =  2 * (v1.x * v1.x + v1.y * v1.y);
        let d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if (isNaN(d)) { // no intercept
            return false;
        }
        // These represent the unit distance of point one and two on the line
        let u1 = (b - d) / c;  
        let u2 = (b + d) / c;
        if (u1 <= 1 && u1 >= 0) {  // If point on the line segment
            return true;
        }
        if (u2 <= 1 && u2 >= 0) {  // If point on the line segment
            return true;
        }
        return false;
    }

    //Cookie Reader credit to W3schools
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


    function processInput(elapsedTime){
        if(!gameOver){
            input.process(elapsedTime);
        }
    }


    //Not sure if Sound belongs render or not, Ask Dean
    function render(){

        renderer.clear();
        renderer.drawTexture(myBackground.image, myBackground.center, myBackground.rotation, myBackground.size);
        renderer.drawTexture(myLander.image, myLander.center, myLander.rotation, myLander.size);
        renderer.drawTerrain(myTerrain);

        //Shows the hitbox for the ship and the line it is checking, Can be turned off
        if(debug){
            renderer.drawDebugLine(pt1, pt2);
            renderer.drawDebugHitbox(circle);
        }
        //Color for Fuel Level
        if(myLander.fuel > 0){
            renderer.drawText("Fuel Left: " + myLander.fuel.toFixed(2),"10px Courier New" , "#000000", "#6aff00", 15, 20, 0);
        }
        else{
            renderer.drawText("Fuel Left: " + myLander.fuel.toFixed(2),"10px Courier New" , "#000000", "#FFFFFF", 15, 20, 0);
        }
        //Color for safe landing Angle
        if(myLander.rotationDegrees > 355 || myLander.rotationDegrees < 5){
            renderer.drawText("Rotation: " + myLander.rotationDegrees.toFixed(2) + "°", "10px Courier New", "#000000", "#6aff00", 15, 35, 0);
        }
        else{
            renderer.drawText("Rotation: " + myLander.rotationDegrees.toFixed(2) + "°", "10px Courier New", "#000000", "#FFFFFF", 15, 35, 0);
        }
        //Color for safe velocity
        if(myLander.velocity < 2){
            renderer.drawText("Velocity: " + myLander.velocity.toFixed(2) + " m/s", "10px Courier New", "#000000", "#6aff00", 15, 50, 0);
        }
        else{
            renderer.drawText("Velocity: " + myLander.velocity.toFixed(2) + " m/s", "10px Courier New", "#000000", "#FFFFFF", 15, 50, 0);
        }
        //Display gameover text & explosion
        if(gameOver){
            renderer.drawText("Its only a Simulation...", "30px Courier New", "#FFFFFF", "#FFFFFF", 200, 250, 0);
            renderer.drawText("Game Over", "40px Courier New", "#FFFFFF", "#FFFFFF", 200, 150, 0);
            renderer.drawTexture(explosionImg.image, myLander.center, myLander.roation, explosionImg.size);
            //Play the sound once
            if(!explosionPlayed){
                explosionSound.play();
                explosionPlayed = true;
            }
        }
        //Display Safe landing / Win text
        if(gameWin){
            renderer.drawText("Nice Landing!", "30px Courier New", "#6aff00", "#6aff00", 200, 250, 0);
            //Play Sound only once
            if(!winPlayed){
                winSound.play();
                winPlayed = true;
            }
            if(!getscore){
                let name = prompt("Great Landing!\nPlease enter your name:");
                persist.add(name, myLander.fuel);
                getscore = true;
            }
        }
    }

    function update(elapsedTime){
        if(!gameOver && !gameWin){

            //Do basic Physics
            myLander.fall(elapsedTime);

            //Check for landing. Check each landing zone because multiple may exist
            for(let zone = 0; zone < terrain.safezone.length; zone++){
                //Check if IN safezone. This could be done  in one large if statement but its more readable this way
                if(myLander.center.x > terrain.safezone[zone] &&  myLander.center.x < terrain.safezone[zone]+50){
                     if(myLander.center.y < myTerrain[Math.trunc(myLander.center.x)] && myLander.center.y > myTerrain[Math.trunc(myLander.center.x)] - 20){
                        //Check landing angle
                        if(myLander.rotationDegrees > 355 || myLander.rotationDegrees < 5){
                            if(myLander.velocity <= 2){
                                gameWin = true;
                                myLander.isLanded = true;
                            }
                        }
                    } 
                }
            }
            //This could just be passed in directly but this is easier to read
            circle = {center: myLander.center,radius: myLander.radius}
            pt1={x: myLander.center.x -15, y: myTerrain[Math.trunc(myLander.center.x - 15)]}
            pt2={x: myLander.center.x + 15 , y: myTerrain[Math.trunc(myLander.center.x+15)]}
            //Collsion detection
            let crashed = lineCircleIntersection(pt1,pt2, circle);
            if(crashed){
                myLander.isCrashed = true;
                gameOver = true;
            }
            //Check out of bounds to prevent flying off screen  I know this wasn't required but not having it causes issues so its here
            if(myLander.center.x - myLander.radius < 0 || myLander.center.x - myLander.radius > 1000 || myLander.center.y - myLander.radius < 0){
                myLander.isCrashed = true;
                gameOver = true;
            }


        }
    }

    function gameloop(timestamp){
        let elapsedTime=  timestamp - lastTimeStamp;
        lastTimeStamp = performance.now();

        //Check if start button has been pressed
        //This seems to work fine so it stays
        if(menus.gamestart.length ==1){
            processInput(elapsedTime);
            update(elapsedTime);
            render();
        }
        requestAnimationFrame(gameloop)
    }

    
    requestAnimationFrame(gameloop);