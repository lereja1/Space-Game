const MAXFORCE = 0.15;
const MAXANGLEFORCE = 0.3;
const RELOADTIME = 10
class Player {
  constructor() {
    this.score = 0
    this.hp = 10

    this.hurt = false
    this.wasHurt = false
    this.hurtApearance = false
    this.hurttimer = 0

    this.reloadtimer = RELOADTIME

    this.vzangle = 0;
    this.zangle = 0;
    this.vxangle = 0;
    this.xangle = 0;

    this.x = 0;
    this.y = 30;
    this.z = 700;

    this.vx = 0;
    this.vy = 0;

    this.bullets = [];
  }
  shoot() {
    if (this.reloadtimer > RELOADTIME) {
        this.bullets.push(new Projectile(this.x, this.y, this.z));
        //this.bullets.push(new Projectile(this.x - 5, this.y, this.z));
        this.reloadtimer = 0
    }
  }
  removeProjectiles() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].z < -10000) {
        this.bullets.splice(i,1)
      }
    }
  }
  afficher() {
    push();
    translate(this.x, 30, this.z);
    noStroke();
    ambientMaterial(200, 200, 200);
    if (this.hurtApearance) {
      ambientMaterial(200,50,50);
      this.vxangle = random(-1,1)
      this.vzangle = random(-1,1)
    }
    rotateZ(this.zangle);
    rotateX(this.xangle);
    rotateY(-90);
    rotateZ(180);
    scale(2);
    model(ship);
    pop();
    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].afficher();
    }
  }
  move() {
    this.hurttimer++
    if (this.hurttimer > 10) {
      this.hurttimer = 0
      this.hurtApearance = false
    }

    this.reloadtimer++

    this.vzangle = this.vzangle * 0.2;
    this.zangle = this.zangle * 0.8;

    this.vxangle = this.vxangle * 0.2;
    this.xangle = this.xangle * 0.8;
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -MAXFORCE;
      this.vzangle = -MAXANGLEFORCE;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.vx = MAXFORCE;
      this.vzangle = MAXANGLEFORCE;
    }

    this.zangle = this.zangle + this.vzangle * deltaTime;
    if (keyIsDown(UP_ARROW)) {
      this.vy = -MAXFORCE;
      this.vxangle = -MAXANGLEFORCE;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.vy = MAXFORCE;
      this.vxangle = MAXANGLEFORCE;
    }
    if (mouseIsPressed) {
      this.shoot();
      console.log(this.bullets);
    }

    this.xangle = this.xangle + this.vxangle * deltaTime;

    this.vx = this.vx * 0.75;
    this.x = this.x + this.vx * deltaTime;

    this.vy = this.vy * 0.75;
    this.y = this.y + this.vy * deltaTime;

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
      let index = this.bullets[i].colliding(asteroids) 
      if (index !== -1) {
        asteroids.splice(index,1)
        this.score = this.score + 1
      }
    }
  }
  colliding(obstacles) {
    for (let i = 0; i < obstacles.length; i++) {
      let asteroid = obstacles[i];
      let distance = dist(
        asteroid.x,
        asteroid.y - this.y,
        asteroid.z,
        this.x,
        30,
        this.z
      );
      if (distance < asteroid.size + 10) {
        this.wasHurt = this.hurt
        this.hurtApearance = true
        this.hurt = true
        return true;
      }
    }
    this.wasHurt = this.hurt
    this.hurt = false
    return false;
  }
  hud(){
    push()
    textAlign(LEFT)
    translate(-innerWidth / 2, innerHeight / -2)
    textSize(20)
    if (debug) {
      text("FPS : " + round(frameRate()),20,90)
    }
    if (hideTextInDeath) {
      text("Score : " + this.score,20,30)
      text("HP : " + this.hp,20,60)
    }
    pop()
  }
}
