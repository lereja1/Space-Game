const ASTEROIDSPEED = 1
let time = 0
class Asteroid {
    constructor(x,y,z) {
      this.size = random(10,30)
      this.x = x; 
      this.y = y;
      this.z = z;
      this.vxrot = random(-0.5,0.5)
      this.vyrot = random(-0.5,0.5)
    }
    afficher() {
      push()
      translate(this.x,this.y - player.y,this.z)
      noStroke()
      ambientMaterial(0, 200, 200)
      rotateX(time * this.vxrot)
      rotateY(time * this.vyrot)
      box(this.size);
      pop() 
    }
    move() {
      this.z = this.z + ASTEROIDSPEED * deltaTime
    }
    respawn() {
      if (this.z > 1200) {
        this.z = random(-2500,-1000)
      }
    }
  }