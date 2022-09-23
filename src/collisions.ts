export enum CollisionCategory {
  Uncategorized = 1,
  Guy = 2,
  GuyLaser = 4,
  Enemy = 8
}

export const GuyCollisionMask = CollisionCategory.Uncategorized | CollisionCategory.Enemy

export const GuyLaserCollisionMask = CollisionCategory.Uncategorized | CollisionCategory.Enemy

export const EnemyCollisionMask = CollisionCategory.Uncategorized | CollisionCategory.Guy | CollisionCategory.GuyLaser
