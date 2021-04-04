let terrain = (function() {
    //let terrainCoords = [];

    let safezone = []

    function genSafezone(){

        for(let i = 0; i< 2; i++){
            let startsafezone = Math.floor(Math.random() * (850 - 150) + 150);
            //Subject to change if needs to be bigger or smaller
            //let endsafezone = startsafezone + 50;
            safezone.push(startsafezone);
        } 

    }


    /*function genTerrainRec(width, height){

        if(terrainCoords.size() == 64){
            return;
        }

        if(width > safezone[0][0] && width < safezone[0][1] || width > safezone[1][0] && width < safezone[1][1]){
            genTerrainRec(width/2);
        }
        //Get midpoint
        let midpoint = width/2;
        //Randomly Raise or lower
        let newHeight = height + random.nextGaussian(5, 1);
        //Break into two lines


    }*/

    //Kinda used this to help with terrain Gen 
    //https://somethinghitme.com/2013/11/11/simple-2d-terrain-with-midpoint-displacement/
    function terrainGen(width, height, displace, roughness){
        let points  = [];
        let power = Math.pow(2, Math.ceil(Math.log(width)/ (Math.log(2))));

        //Set the left point
        points[0] = height/2/2 + (Math.random() * displace *2) - displace;

        //Set the right point
        points[power] = height/2/2 + (Math.random()*displace*2) - displace;
        displace *= roughness;

        //Increae the number of segments
        for(let i=1; i<power; i*=2){

            for(let j = (power/i)/2; j < power; j+= power/i){

                points[j] = ((points[j - (power/i) /2] + points[j + (power/i) / 2]) /2);
                points[j] += (Math.random()*displace*2) - displace;
            }
            displace *= roughness;
        }

        //Shift down
        for(let i = 0; i< points.length; i++){
            points[i] = points[i] + 500;
        }

        //Smooth out safe zones
        for(let i= 0; i <2; i++){
            safeHeight = points[safezone[i]];
            console.log("Safe zone Height " + safeHeight);
            //Length of the safe zone is 50 wide unless I need to fix it
            for(let j=safezone[i]; j<safezone[i]+50; j++){
                points[j] = safeHeight;
            }

        }
        return points;
    }


    function genTerrain(width, height, displace, roughness){
            genSafezone();
            let coords = terrainGen(width, height, displace, roughness);
            return coords;
    }

    return{
        genTerrain : genTerrain,
        get safezone() {return  safezone;}
    }

})();