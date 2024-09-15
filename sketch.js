  let asteroids = []
  let restartButton;
  let player;
  let debug = false
  let hideTextInDeath = true
  const ASTEROID_COUNT = 100;
  let ship
  function preload() {
    font = loadFont("KGRedHands.ttf")
    ship = loadModel("ship.obj")
  }

  function start() {
    asteroids = []
    restartButton.hide()
    textFont(font)
    for (let i = 0; i < ASTEROID_COUNT; i++) {
      asteroids[i] = new Asteroid(
        random(-400,400),
        random(-400,400),
        random(-2000,0)
      );
    }
    player = new Player();
    console.log(asteroids)

  }


  function setup() {
    restartButton = createButton("RESTART");
    restartButton.size(100,50)
    restartButton.position(innerWidth / 2  - 50, innerHeight / 2 + 40);
    restartButton.mousePressed(restart)
    angleMode(DEGREES)
    createCanvas(innerWidth,innerHeight, WEBGL);
    start()
  }
  
  function draw() {
    time++
    //debugMode()
    //orbitControl()
    background(51);
    directionalLight(255,200,200,1,10,1)
    ambientLight(200,200,215)
    player.afficher()
    player.move()
    player.removeProjectiles()
    for(let i = 0; i < asteroids.length; i++) {
      asteroids[i].afficher()
      asteroids[i].move()
      asteroids[i].respawn()
    }
    if (player.colliding(asteroids) && player.wasHurt == false) {
      player.hp = player.hp - 1
      if(player.hp == 0) {
        hideTextInDeath = false
        textSize(100)
        textAlign(CENTER)
        text("Game Over" ,0,0)
        restartButton.show()
        noLoop()
      }
    }

    player.hud()
  }
  function restart() {
    start()
    loop()
    hideTextInDeath = true
    restartButton.hide()
  }