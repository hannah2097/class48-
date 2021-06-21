var playerImg, player;
var groundImg;
var ground;
var invisibleGround;
var pillar2Img, pillar3Img, pillar4Img, pillar, pillarGroup;
var gameState = 0;
var score = 0;
var contestantCount;
var allContestants;
var answer;
var database;

var question, contestant, quiz;
const accessCode1 = "Petroleum";

function preload() {
  playerImg = loadImage("images/Flyingplayer.png");
  groundImg = loadImage("images/background.jpg");
  pillar2Img = loadImage("images/pillar2.png");
  pillar3Img = loadImage("images/pillar3.png");
  pillar4Img = loadImage("images/pillar4.png");
}

function setup() {
  createCanvas(1300, 800);
  database = firebase.database();

  ground = createSprite(0, 0, 2400, 2800);
  ground.addImage(groundImg);
  ground.x = ground.width / 2;
  ground.velocityX = -8;
  ground.scale = 2.5;

  player = createSprite(400, 200, 50, 50);
  player.addImage("running", playerImg);
  player.scale = 0.25;
  player.setCollider("rectangle", 0, 0, 50, 50);
  player.debug = true;

  invisibleGround = createSprite(0, 400, 1600, 20);
  invisibleGround.visible = false;

  //system = new System();
  pillarGroup = new Group();
}

function draw() {
  background(groundImg);

  if (gameState === 0) {
    if (ground.x < 200) {
      ground.x = ground.width / 2;
    }

    if (keyDown("right")) {
      player.x = player.x + 0.5;
    }

    if (keyDown("left")) {
      player.x = player.x + -0.5;
    }

    if (keyDown("UP_ARROW") && player.y >= 100) {
      player.velocityY = -8;
    }
    player.velocityY = player.velocityY + 0.5;

    spawnPillar();
    drawSprites();
    if (pillarGroup.isTouching(player)) {
      gameState = 1;

        player.velocityX = 0;
        player.velocityY = 0;
        ground.velocityX = 0;
        pillarGroup.setVelocityXEach(0);
        pillarGroup.setLifetimeEach(-1);
        pillarGroup.destroyEach();
      quiz = new Quiz();
      quiz.getState();
      quiz.start();
    }
  } else if (gameState === 1) {

    clear();
    quiz.play();

    if (score === 1) {
      clear();
      background(groundImg);
      fill("black");
      textSize(40);
      text("You have recovered Successfully!", 250, 200);
    } //else {
    //gameState = 2;
    //}
  }
  /*
  if (gameState === 2) {
    player.velocityX = 0;
    player.velocityY = 0;
    ground.velocityX = 0;
    pillarGroup.setVelocityXEach(0);
    pillarGroup.setLifetimeEach(-1);
    pillarGroup.destroyEach();
    fill("white");
    textSize(30);
    text("Game has Ended", 600, 400);
  }*/

  player.collide(invisibleGround);
  textSize(20);
  fill("white");
  text("Score: " + score, 150, 50);
}

function spawnPillar() {
  if (frameCount % 250 === 0) {
    pillar = createSprite(1000, 450, 50, 100);
    pillar.velocityX = -4;
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        pillar.addImage(pillar2Img);
        break;
      case 2:
        pillar.addImage(pillar3Img);
        break;
      case 3:
        pillar.addImage(pillar4Img);
        break;
      default:
        break;
    }
    pillar.scale = 1;
    pillar.lifetime = displayWidth;
    pillarGroup.add(pillar);
    pillar.debug = true;
  }
}
