let renderer = (function(){

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    function clear(){
        context.clearRect(0,0, canvas.Width, canvas.height);
    }

    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width, size.height);

        context.restore();
    }

    function drawText(text, font, fillStyle, strokeStyle,x, y, rotation) {
        context.save();

        context.font = font;
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
        context.textBaseline = 'top';

        context.translate(x, y);
        context.rotate(rotation);
        context.translate(-x, -y);


        context.fillText(text, x, y);
        context.strokeText(text, x, y);

        context.restore();
    }

    function drawTerrain(terrain) {
        context.save();
    
        context.beginPath();
        context.lineTo(0, terrain[0])
        for(let i = 1; i< terrain.length; i++ ){

            //TODO add colors if in safezone range
            context.lineTo(i, terrain[i]);


        }
        context.lineTo(canvas.width, canvas.height);
        context.lineTo(0, canvas.height)
        context.closePath();
    
        context.fillStyle = '#60130b';
        context.fill();
    
        context.strokeStyle = '#000000';
        context.stroke();
    
        context.restore();
    }
    
    function drawDebugLine(pt1, pt2){
        context.save();
        context.beginPath();
        context.lineTo(pt1.x, pt1.y-10);
        context.lineTo(pt1.x, pt1.y-5);
        context.lineTo(pt2.x, pt2.y-5);
        context.lineTo(pt2.x, pt2.y-10);
        context.closePath();

        context.fillStyle = "#6aff00"
        context.fill();

        context.strokeStyle = "#6aff00";
        context.stroke();
        context.restore();
    }

    function drawDebugHitbox(circle){
        context.save();
        context.beginPath();
        context.arc(circle.center.x, circle.center.y, circle.radius+5, 0, 2*Math.PI);
        context.closePath();
        context.strokeStyle = "#6aff00";
        context.stroke();
        context.restore();

    }

    let api = {
        get canvas() { return canvas; },
        clear: clear,
        drawTexture: drawTexture,
        drawText: drawText,
        drawTerrain : drawTerrain,
        drawDebugLine : drawDebugLine,
        drawDebugHitbox : drawDebugHitbox
    };

    return api;

})();