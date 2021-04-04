let myLander = (function(){

    let imageSrc = "assets/lander.png";
    let center =  {x: 100, y: 100};
    let size = {width: 35, height:35};
    let rotation = 0;
    let radius = 18;
    let ready = false; 
    let isCrashed = false;
    let isLanded = false;
    let velocity = 2;
    let momentum = {x: 0, y: 0}
    let lastCenter = {x: 0, y:0}
    let rotationDegrees = 0;


    let thrustSound = new Audio("sounds/thrust.ogg");

    //Lander Attributes that actually require some fine tuning
    //Not Perfectly Tuned could use alot of experimentation
    let turnrate = 0.001;
    let thrustrate = 0.0009;
    let fuel = 1500;
    let gravity = 0.00001;
    let terminalVelocity = 0.1;
    let maxXVelocity = 0.12;
    let maxYVelocity = -0.01;


    ready = false;
    let image = new Image();
    image.onload = function(){
        ready = true;
    };
    image.src = imageSrc;

    //TODO fix turning being in proper degrees as well as staying withing 360

    function rotateLeft(elapsedTime){
        rotation -= (turnrate * elapsedTime);
        rotationDegrees = Math.abs((rotation * (180/ Math.PI)));
        //WHY DOESN'T THIS UPDATE!
        if(rotationDegrees > 360){
            roation = 0;
        }
    }

    function rotateRight(elapsedTime){
        rotation += (turnrate * elapsedTime);
        rotationDegrees = Math.abs((rotation * (180/ Math.PI)));
        if(rotationDegrees > 360){
            rotation = 0;
        }
    }

    function thrust(elapsedTime){
        if(fuel > 0){
            thrustX = Math.sin(rotation)
            thrustY = -Math.cos(rotation)
            momentum.x += (thrustX * thrustrate * elapsedTime);
            momentum.y += (thrustY * thrustrate * elapsedTime);

            //Make sure you do not exceed maximum speed up, to prevent actual flying
            if(momentum.y < maxYVelocity){
                momentum.y = maxYVelocity;
            };

            //console.log("Velocity: " + momentum.y);
            fuel-= 1 * elapsedTime;
            calcVelocity(elapsedTime)
            thrustSound.play();
        }
    }

    function fall(elapsedTime){
        //Terminal Velocity so lander doesn't infinitly accelerate

            if(momentum.y < terminalVelocity){

                momentum.y -=(-gravity * elapsedTime);
            }
            center.x += (momentum.x * elapsedTime);
            center.y += (momentum.y * elapsedTime); 
        
            //Get Velocity
            calcVelocity(elapsedTime);
            lastCenter.x = center.x;
            lastCenter.y = center.y;
        
    }

    function calcVelocity(elapsedTime){
        velocity = (Math.sqrt(( Math.pow( center.x - lastCenter.x ,2) + Math.pow(center.y - lastCenter.y,2)))/elapsedTime) *100;
        //console.log(velocity);
    }

    function moveTo(X, Y){
        center.x = X;
        center.y = Y;
    }

    //These are all the methods you could possibly call for this space magic
    let api = {

        get image() {return image;},
        get center() {return center;},
        get size() {return size;},
        get rotation() {return rotation;},
        get fuel() {return fuel;},
        get velocity() {return velocity;},
        get radius() {return radius;},
        get rotationDegrees() {return rotationDegrees;},
        moveTo : moveTo,
        thrust : thrust,
        rotateLeft : rotateLeft,
        rotateRight :rotateRight,
        fall : fall,
        isCrashed : isCrashed,
        isLanded : isLanded,


    }

    return api;

})();