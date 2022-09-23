import * as Phaser from 'phaser'
import { Enemy } from './enemy'
import { Guy } from './guy'

export class GameScene extends Phaser.Scene {
  constructor() {
    super('game')

    this.gameObjects = new Phaser.GameObjects.Group(this, { runChildUpdate: true })
  }

  guy!: Guy
  gameObjects: Phaser.GameObjects.Group
  starField!: Phaser.GameObjects.TileSprite
  fireParticleManager!: Phaser.GameObjects.Particles.ParticleEmitterManager

  nextEnemyTime!: number
  enemyCreateTime = 1000
  nextLevelTime!: number

  preload() {
    this.load.spritesheet('guy', 'images/guy.png', { frameWidth: 98, frameHeight: 75 })
    this.load.image('enemy', 'images/enemy.png')
    this.load.image('background', 'images/background.png')
    this.load.image('fire', 'images/fire.png')
    this.load.image('laser', 'images/laser.png')

    this.load.audio('guy-laser', 'sounds/guy-laser.mp3')
    this.load.audio('guy-hit', 'sounds/guy-hit.mp3')
    this.load.audio('alien-hit', 'sounds/alien-hit.mp3')
  }

  create() {
    // Start enemy attacks in 2 seconds
    this.nextEnemyTime = this.time.now + 2000

    // The level increases 3 seconds later
    this.nextLevelTime = this.nextEnemyTime + 3000

    this.add.existing(this.gameObjects)

    // Create the Player
    this.guy = new Guy(this.matter.world, 600, 1400, this.gameObjects)
    this.add.existing(this.guy)
    this.gameObjects.add(this.guy)

    // Create the star field
    this.starField = this.add
    .tileSprite(
      600,
      750,
      0,
      0,
      'background'
    )
    .setAlpha(0.5)

    // Particle manager for explosions
    this.fireParticleManager = this.add.particles('fire').setDepth(100)
  }

  update(time: number, delta: number) {
    if (time > this.nextLevelTime) {
      this.nextLevelTime = time + 5000

      // Make enemies come out faster
      this.enemyCreateTime -= 200

      // All enemies move faster
      Enemy.speed += 1

      // Cap it at 200ms...no faster
      this.enemyCreateTime = Math.max(200, this.enemyCreateTime)
    }

    if (time >= this.nextEnemyTime) {
      this.nextEnemyTime = time + this.enemyCreateTime

      // Create an enemy
      const enemy = new Enemy(this.matter.world, Phaser.Math.RND.between(50, 1150), 0, this.fireParticleManager)
      this.add.existing(enemy)
      this.gameObjects.add(enemy)
    }

    this.starField.tilePositionY -= 2
  }
}

const startGame = () => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 1500,
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'matter',
      matter: {
        // debug: {
        //   showBody: true
        // },
        gravity: {
          y: 0,
          x: 0
        }
      }
    },
    scene: [GameScene]
  })
}

startGame()
