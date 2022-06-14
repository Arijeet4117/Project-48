const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var gameState = 0
var slate
var score=0

function preload(){
    bgi=loadImage("sprites/Playbackground.jpg")
    thumbnailI=loadImage("sprites/bck2.webp")
    plyI=loadImage("sprites/play.png")
    bckI=loadImage("sprites/back.png")
    menI=loadImage("sprites/menu.png")
    reI=loadImage("sprites/restart.png")
    menbckI=loadImage("sprites/menubackground.png")
    sltI=loadImage("sprites/1.jpg")
    blI=loadImage("sprites/ball.png")
    bI=loadImage("sprites/blue brick.jpg")
    bII=loadImage("sprites/green brick.png")
    bIII=loadImage("sprites/orange brick.png")
    bIV=loadImage("sprites/pink brick.jpg")
    bV=loadImage("sprites/red brick.jpg")
    bVI=loadImage("sprites/yellow brick.png")
    sound=loadSound("sprites/destroy.mp3")
}

function setup(){
    createCanvas(displayWidth,displayHeight);
    playButton=createSprite(displayWidth/2-200,displayHeight/2+200,10,10)
    playButton.addImage(plyI)
    playButton.scale=0.7
    backButton=createSprite(displayWidth-200,100,10,10)
    backButton.addImage(bckI)
    backButton.scale=0.5
    menuButton=createSprite(displayWidth/2+200,displayHeight/2+200,10,10)
    menuButton.addImage(menI)
    menuButton.scale=0.7
    restartButton=createSprite(displayWidth/2,displayHeight/2+100)
    restartButton.addImage(reI)
    restartButton.scale=1
    slate=createSprite(displayWidth/2,displayHeight-50,)
    slate.addImage(sltI)
    slate.scale=1.2
    ball=createSprite(displayWidth/2-2,displayHeight-75)
    ball.addImage(blI)
    ball.scale=0.08

    bg=createGroup()

    for(var x=400;x<=displayWidth-400;x=x+120){
        brick2=createSprite(x ,100,100,30)
        brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
        bg.add(brick2)
    }
    for(var x=300;x<=displayWidth-300;x=x+120){
        brick2=createSprite(x ,150,100,30)
        brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
        bg.add(brick2)
    }
    for(var x=200;x<=displayWidth-200;x=x+120){
        brick2=createSprite(x ,200,100,30)
       brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
       bg.add(brick2)
    }
    for(var x=100;x<=displayWidth-100;x=x+120){
        brick2=createSprite(x ,250,100,30)
       brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
       bg.add(brick2)
    }
    for(var x=200;x<=displayWidth-200;x=x+120){
        brick2=createSprite(x ,300,100,30)
       brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
       bg.add(brick2)
    }
    for(var x=300;x<=displayWidth-300;x=x+120){
        brick2=createSprite(x ,350,100,30)
       brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
       bg.add(brick2)
    }
    for(var x=400;x<=displayWidth-400;x=x+120){
        brick2=createSprite(x ,400,100,30)
       brick2.shapeColor=rgb(random(0,255),random(0,255),random(0,255))
       bg.add(brick2)
    }

    }


function draw(){
    

    if(gameState===0){
        background(thumbnailI);
        playButton.visible=1
        backButton.visible=0
        menuButton.visible=1
        slate.visible=0
        ball.visible=0
        bg.setVisibleEach(0)
        restartButton.visible=0
        if(mousePressedOver(playButton)){
            gameState=1
        }
        if(mousePressedOver(menuButton)){
            gameState=2
        }
        drawSprites();
    }
    if(gameState===1){
        background(bgi)
        backButton.visible=1
        playButton.visible=0
        menuButton.visible=0
        restartButton.visible=0
        slate.visible=1
        ball.visible=1
        bg.setVisibleEach(1)
        slate.x = mouseX
        edges=createEdgeSprites();
        if(keyDown("space")){
            ball.velocityY=-10
            ball.velocityX=3
        }
        ball.bounceOff(slate)
        ball.bounceOff(edges[1])
        ball.bounceOff(edges[2])
        ball.bounceOff(edges[0])
    
        
        if(mousePressedOver(backButton)){
            gameState=0
        }
        if(ball.isTouching(edges[3])){
            gameState=3
        }
        for(var i=0;i<bg.length;i=i+1){
        if(bg.get(i).isTouching(ball)){
            bg.get(i).destroy()
            ball.velocityY=10
            ball.velocityX=-3
            sound.play()
            
           score=score+1
        }
        }
        fill("white")
        stroke("red")
        strokeWeight(10)
        textSize(25)
        text("Score :"+score,100,displayHeight/2-300)
        
        drawSprites();
    }    
    if(gameState===2){
        background(menbckI)
        backButton.visible=1
        playButton.visible=0
        menuButton.visible=0
        restartButton.visible=0
        slate.visible=0
        ball.visible=0
        bg.setVisibleEach(0)
        if(mousePressedOver(backButton)){
            gameState=0
        }
        
       
        
        textSize(50)
        fill("black")
        text("Rules:",200,100)
        textSize(25)
        fill("white")
        stroke("orange")
        text("1. Use mouse to move the wooden slate",50,200)
        text("5. You can move only left and right",50,400)
        text("2. Hit as many as bricks to score",50,250)
        text("3. Catch the ball.If you miss the ball you loose",50,300)
        text("4. You win when you break all bricks",50,350)
        text("6. Press space to start",50,450)

      

        drawSprites();
    }

    if(gameState===3){
        background(menbckI)
        backButton.visible=0
        playButton.visible=0
        menuButton.visible=0
        restartButton.visible=1
        slate.visible=0
        ball.visible=0
        bg.setVisibleEach(0)
        textSize(100)
        fill("red")
        stroke("white")
        strokeWeight(4)
        text("GAME",200,200)
        text("OVER",200,325)
        if(mousePressedOver(restartButton)){
            gameState=0
        }

        drawSprites();
    }
}