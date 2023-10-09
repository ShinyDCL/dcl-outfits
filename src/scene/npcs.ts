import { AvatarShape, engine, Entity, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

import { Outfit } from '../api'
import { createDetailsButton } from './detailsButton'

let npcRootEntity: Entity

/*
 * Creates NPCs for each outfit
 */
export const createNPCs = (parent: Entity, outfits: Outfit[], name: string = 'NPC') => {
  if (npcRootEntity) engine.removeEntityWithChildren(npcRootEntity)

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

    const { eyes, hair, skin } = outfit
    const npc = engine.addEntity()

    AvatarShape.create(npc, {
      id: i.toString(),
      bodyShape: outfit.bodyShape,
      wearables: outfit.wearables,
      eyeColor: eyes.color,
      hairColor: hair.color,
      skinColor: skin.color,
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
