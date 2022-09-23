import * as Phaser from 'phaser'
import { CollisionCategory, GuyLaserCollisionMask } from './collisions'
import { Guy } from './guy'

export class Laser extends Phaser.Physics.Matter.Image {
  constructor(world: Phaser.Physics.Matter.World, guy: Guy) {
    super(world, guy.x, guy.y, 'laser', 0, {
      collisionFilter: {
        category: CollisionCategory.GuyLaser,
        mask: GuyLaserCollisionMask
      }
    })

    this.setOnCollide(() => {
      console.log('LASER HIT!!!')
      guy.score += 100

      // This will let the player shoot immediately
      guy.lastShotTime = 0

      // Add floating text at the collision spot to show the points scored
      const scoreText = this.scene.add.text(this.x, this.y - 50, '100', {
        fontStyle: 'bold',
        fontSize: '32px',
        color: 'green'
      })
      // Destroy the floating score text after 2 seconds
      setTimeout(() => {
        scoreText.destroy()
      }, 2000)

      // Destroy the laser
      this.destroy()
    })
  }

  update() {
    this.y -= 7

    if (this.y < 0) {
      this.destroy()
    }
  }
}
