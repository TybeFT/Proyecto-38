/*

CONTEXTO: Desde el proyecto número 8 hice un juego de un ninja con diferentes misiones.
A lo largo de los dempas proyectos y juegos individuales lo eh estado mejorando como en el caso del proyecto número 19 que es de mis proyectos favoritos. EN la historia pasada
El ninja era el protagonista del juego y su misión era derrotar a el mago oscuro, pero ahora estoy centrandome en explicar el origen del villano y lo que es el ya que no lo eh hecho y
Me parece muy interesante a mi siempre saber como el villano se hizo así. Si gusta saber mas de esta mini historia que estoy creando igual lo explico un poco en el código del proyecto 8 y 19  
Si es que no tiene acceso a ellos aqui le dejo los links para que pueda hecharles un vistazo :)

PROYECTO 8: https://studio.code.org/projects/gamelab/HToOXQmbgedepWB5dQ9pfY-V-0Qh0Mb9wnhTqTEQehA
PROYECTO 19: https://editor.p5js.org/mike15.pumas/sketches/euEid3igt

*/


var player, playerAnm;
var ground, groundImg1;
var bg, backgroundImg;
var floor2, floor2Img;
var playerAnmR, playerAnmL, playerStand;

// Establece un estado de juego incial
var gameState = "set";

function preload() {
    //Absolutamente todas las animaciones
    backgroundImg = loadImage("images/backGroundLarge.png");
    playerStand = loadAnimation("images/stand1.png", "images/stand2.png", "images/stand3.png", "images/stand4.png", "images/stand5.png", "images/stand6.png", "images/stand7.png", "images/stand8.png");
    playerAnmR = loadAnimation("images/run1.png", "images/run2.png", "images/run3.png", "images/run4.png", "images/run5.png", "images/run6.png", "images/run7.png", "images/run8.png",);
    playerAnmL = loadAnimation("images/runL1.png", "images/runL2.png", "images/runL3.png", "images/runL3.png", "images/runL3.png", "images/runL3.png", "images/runL3.png", "images/runL3.png")
    chozaImg = loadImage("images/chozaStart.png");
    floor2Img = loadImage("images/floor2Large.png");
    noPassTextImg = loadImage("images/NoPassText.png");
    startTextImg = loadImage("images/startText.png");
    hist1Img = loadImage("images/Hist1.png");
    hist2Img = loadImage("images/Hist2.png");
    hist3Img = loadImage("images/Hist3.png");
    hist4Img = loadImage("images/Hist4.png");
    noReturnImage = loadImage("images/noReturn.png");
    controlsImg = loadImage("images/controls.png");
    arrowRImg = loadImage("images/arrowR.png");
    // Musiquita triste
    music = loadSound("soundSad.mp3");
}

function setup() {
    createCanvas(displayWidth, displayHeight);

    // Alerta para disfrutar bien del juego y que no se rompan los oidos antes de jugar (por la música)
    alert("Para disfrutar enteramente del juego poner el tamaño del navegador al 80% presionando control mas la rueda del ratón hacia abajo y bajar el volumen por la música alta. Disfrute!");
    
    // Enciende la música en un loop
    music.loop();

    // Crea el fondo 
    bg = createSprite(2800, displayHeight / 3 + 145, 5568, displayHeight);
    // Crea el suelo
    ground = createSprite(2800, 1010, 10568, 50);
    // Crea el jugador
    player = createSprite(50, 900, 40, 100);
    //Crea la chozita
    choza = createSprite(-270, 900, 40, 40);
    //Crea el texto de advertencia no paso
    noPassText = createSprite(-250, 700);

    // Agregamos imagenes:

    bg.addImage("Background", backgroundImg);
    bg.scale = 1.45;

    choza.addImage("static", chozaImg);
    choza.scale = 1;

    // floor2.addImage(floor2Img);
    // floor2.scale = 4;

    //textos (imagenes);
    noPassText.addImage(noPassTextImg);
    noPassText.scale = 0.10;
    noPassText.visible = false;

    // pantalla negra incial
    bScreen = createSprite(displayWidth / 2, displayHeight / 2, displayWidth, displayHeight);
    bScreen.shapeColor = ("black");
    // Intruccion para inciar el juego
    startText = createSprite(displayWidth/2,displayHeight/2);
    startText.addImage(startTextImg);
    startText.scale = 0.10;

    //Todos los titulos de historia (son imagenes)
    hist1 = createSprite(1760,500);
    hist1.addImage(hist1Img);
    hist2 = createSprite(3500,400);
    hist2.addImage(hist2Img);
    hist3 = createSprite(5400,450);
    hist3.addImage(hist3Img);
    hist4 = createSprite(6500,700);
    hist4.addImage(hist4Img);
    hist4.scale = 1.5;
    noReturn = createSprite(50,800);
    noReturn.addImage(noReturnImage);
    controls = createSprite(-600,100);
    controls.addImage(controlsImg);
    arrowR = createSprite(-600,100);
    arrowR.addImage(arrowRImg);
}

function draw() {
    background("black");

    // Establece invisible el piso para que no se vea
    ground.visible = false;

    // Primer estado del juego 
    if (gameState === "set") {
        // Le da la animacion al jugador y su escala
        player.addAnimation("stand", playerStand);
        player.scale = 2;

        //instruccion in/visible
        startText.visible = true;
        hist1.visible = false;
        noReturn.visible = false;
        controls.visible = false;
        arrowR.visible = false;
        
        bScreen.visible = true;
        //Instruccion para pasar al estado de juego play
        if (keyDown("SPACE")) {
            gameState = "play";
            //Oculta la pantalla negra
            bScreen.visible = false;
        }
    }
    else if (gameState === "play") {
        //camara del jugador
        camera.position.x = player.x;
        camera.position.y = displayHeight / 2;

        //Sigue al jugador en la posicion x 
        noReturn.x = player.x;
        
        // Para sacar información necesaria en la jugabilidad
        //console.log(player.x);

        //intruccion invisible:
        startText.visible = false;
        controls.visible = true;
        arrowR.visible = true;

        // Condicion para mostrar el texto de no pasar
        if (player.isTouching(choza)) {
            noPassText.visible = true;
            // console.log("Hola xd");
        } else {
            noPassText.visible = false;
        }

        //player.debug = true;
        player.setCollider("rectangle", 0, 0, 70, 100);

        //choza.debug = true;
        choza.setCollider("rectangle", 0, 0, 365, 500);

        //Para que nuestro jugador no caiga al vacio
        player.collide(ground);

        //Controles:

        //Movimeinto derecha // Indica que no se pueda mover despues de las coordenadas 5870
        if (keyDown("RIGHT_ARROW") && player.x <=5870) {
            player.x = player.x + 10;
            // Dice que si el jugador sobrepasa esa coordenada X la instruccion se mueve igual que el jugador
            if (player.x >= 111){
                arrowR.x = arrowR.x + 10;
            }
        }

        //Reestringe al jugador para moverse a la izquierda entre la coordenada 110 hacia abajo
        if(player.x <= 110) {
            if (keyDown("LEFT_ARROW") && player.x >= -10) {
                player.x = player.x - 10;
            }
        // Si la posicion del jugador.x es mayor a 111 
        }else if(player.x >= 111){
            //Y se intenta regresar presienando la flecha izquierda
            if(keyDown("LEFT_ARROW")) {
                // manda una advertencia de que no hay regreso
                noReturn.visible = true;
            }else {
                // si la dejas de presionar se deja de mostrar
                noReturn.visible = false;
            }
        }

        //Gravedad inutil (era para otra cosa que al final no hice)
        player.velocityY = player.velocityY + 5;

        //Muestra la primera linea de historia despues de una cierta coordenada
        if (player.x >= 740) {
            hist1.visible = true;
        }
    }



    drawSprites();
}



