import { AvatarShape, Entity, Transform, engine, removeEntityWithChildren } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createDetailsButton } from './detailsButton'
import { Outfit } from '../api'

let npcRootEntity: Entity

/*
 * Creates NPCs for each outfit
 */
export const createNPCs = (parent: Entity, outfits: Outfit[], name: string = 'NPC') => {
  if (npcRootEntity) removeEntityWithChildren(engine, npcRootEntity)

  // Filter out empty outfit slots
  const fullOutfits = outfits.filter(({ outfit }) => outfit?.bodyShape && outfit?.wearables?.length)
  const outfitCount = fullOutfits.length

  npcRootEntity = engine.addEntity()
  Transform.create(npcRootEntity, {
    position: Vector3.create(-outfitCount, 0.25, -3),
    parent
  })

  fullOutfits.forEach(({ outfit }, i) => {
    if (!outfit) return

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
      emotes: [],
      name
    })

    Transform.create(npc, {
      position: Vector3.create(i * 2.5, 0, 0),
      scale: Vector3.create(1.5, 1.5, 1.5),
      parent: npcRootEntity
    })

    createDetailsButton(npc, outfit.wearables)
  })
}
