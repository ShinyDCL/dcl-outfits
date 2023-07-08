import { AvatarShape, Entity, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

export interface Outfit {
  outfit: {
    bodyShape: string
    wearables: string[]
    eyes: { color: { r: number; g: number; b: number; a: number } }
    hair: { color: { r: number; g: number; b: number; a: number } }
    skin: { color: { r: number; g: number; b: number; a: number } }
  }
}

export const createNPCs = (parent: Entity, outfits: Outfit[]) => {
  const npcs = engine.addEntity()
  Transform.create(npcs, {
    position: Vector3.create(-3, 0, -3),
    parent
  })

  outfits.forEach(({ outfit }, i) => {
    const {
      eyes: { color: eyeColor },
      hair: { color: hairColor },
      skin: { color: skinColor }
    } = outfit
    const npc = engine.addEntity()

    AvatarShape.create(npc, {
      id: i.toString(),
      bodyShape: outfit.bodyShape,
      wearables: outfit.wearables,
      eyeColor: Color4.create(eyeColor.r, eyeColor.g, eyeColor.b, eyeColor.a),
      hairColor: Color4.create(hairColor.r, hairColor.g, hairColor.b, hairColor.a),
      skinColor: Color4.create(skinColor.r, skinColor.g, skinColor.b, skinColor.a),
      emotes: []
    })

    Transform.create(npc, {
      position: Vector3.create(i * 1.6, 0.25, 0),
      scale: Vector3.create(1.5, 1.5, 1.5),
      parent: npcs
    })
  })
}
