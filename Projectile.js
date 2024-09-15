let bulletspeed = -1
class Projectile {
    constructor(x,y,z){
        this.x = x
        this.y = y
        this.z = z
    }
    afficher() {
        push()
        translate(this.x,this.y + 30 - player.y,this.z + 1)
        noStroke()
        rotateX(90)
        emissiveMaterial(200, 200, 0)
        cylinder(1,6);
        pop() 
    }
    move() {
        this.z = this.z + bulletspeed * deltaTime

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
                
            return i
          }
        }
        return -1
      }
}