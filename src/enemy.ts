import * as Phaser from 'phaser'
import { CollisionCategory, EnemyCollisionMask } from './collisions'

export class Enemy extends Phaser.Physics.Matter.Image {
  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    fireParticleManager: Phaser.GameObjects.Particles.ParticleEmitterManager
  ) {
    super(world, x, y, 'enemy', 0, {
      collisionFilter: {
        category: CollisionCategory.Enemy,
        mask: EnemyCollisionMask
      }
    })

    this.setOnCollide(() => {
      console.log('ENEMY HIT!!!')

      fireParticleManager.createEmitter({
        speed: 150,
        blendMode: 'ADD',
        lifespan: 700,
        maxParticles: 15,
        scale: 0.7,
        x: this.x,
        y: this.y
      })

      this.scene.sound.play('alien-hit')

      this.destroy()
    })
  }

  update() {
    this.y += Enemy.speed

    if (this.y > 1500) {
      this.destroy()
    }
  }

  static speed = 7
}
