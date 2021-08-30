noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup(){
    video= createCapture(VIDEO);
    video.size(550, 550);

    canvas= createCanvas(550, 550);
    canvas.position(560, 150);
    posenet= ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet is initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log('noseX: '+noseX+' noseY:'+noseY);
        console.log('leftWristX: '+leftWristX+' rightWristX: '+rightWristX+' difference: '+difference);
    }
}

function draw(){
    background('#5dba8f');
    fill('#bdeb17');
    stroke('#000000');
    square(noseX, noseY, difference);
    document.getElementById('square_size').innerHTML = 'Height and width of the square = '+difference+'px';
}