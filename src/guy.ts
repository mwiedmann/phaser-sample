import * as Phaser from 'phaser'
import { CollisionCategory, GuyCollisionMask } from './collisions'
import { Laser } from './laser'

export class Guy extends Phaser.Physics.Matter.Sprite {
  constructor(world: Phaser.Physics.Matter.World, x: number, y: number, private group: Phaser.GameObjects.Group) {
    super(world, x, y, 'guy', 0, {
      collisionFilter: {
        category: CollisionCategory.Guy,
        mask: GuyCollisionMask
      }
    })

    // Keyboard control setup
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.p1Shoot = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

    // Destroy the guy on collision
    this.setOnCollide(() => {
      console.log('GUY HIT!!!')
      this.scene.sound.play('guy-hit')
      this.destroy()
    })

    // Shoot a laser on keypress
    this.p1Shoot.on('down', () => {
      // can only shoot once per second
      if (this.scene.time.now >= this.lastShotTime + this.shotTime) {
        this.lastShotTime = this.scene.time.now
        const laser = new Laser(world, this)
        this.scene.add.existing(laser)
        this.group.add(laser)

        this.scene.sound.play('guy-laser', { volume: 0.4 })
      }
    })

    // Text in the top/left corner to show the score
    // It gets updated when a laser hits an enemy
    this.scoreText = this.scene.add.text(10, 10, '', {
      fontSize: '48px',
      color: 'yellow'
    })

    // Create an animation for the guy
    this.anims.create({
      key: 'guy',
      frames: this.anims.generateFrameNumbers('guy', {}),
      frameRate: 4,
      repeat: -1,
      yoyo: false
    })

    // Start the animation...we run it the entire game
    this.anims.play('guy')
  }

  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  p1Shoot: Phaser.Input.Keyboard.Key

  score = 0
  scoreText: Phaser.GameObjects.Text

  lastShotTime = 0
  shotTime = 1000

  update() {
    // Move left/right
    if (this.cursors.left.isDown) {
      this.x -= 4
    } else if (this.cursors.right.isDown) {
      this.x += 4
    }

    // Update the score
    const s = this.score.toString()
    this.scoreText.text = '0'.repeat(5 - s.length) + s
  }
}
