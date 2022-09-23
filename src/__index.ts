import * as Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  p1Shoot!: Phaser.Input.Keyboard.Key
  guy!: Phaser.GameObjects.Sprite

  preload() {
    this.load.spritesheet('guy', 'images/guy.png', { frameWidth: 98, frameHeight: 75 })
  }

  create() {
    // Add a player
    this.guy = this.add.sprite(500, 1300, 'guy')
    
    // Init keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys()
    this.p1Shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
  }

  update(time: number, delta: number) {
    // Move the guy left/right
    if (this.cursors.left.isDown) {
      this.guy.x -= 5
    } else if (this.cursors.right.isDown) {
      this.guy.x += 5
    }
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
      }
    },
    scene: [GameScene]
  })
}

startGame()
