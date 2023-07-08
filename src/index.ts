import { engine, executeTask, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { sceneMiddle, yOffset } from './resources'
import { movePlayerTo } from '~system/RestrictedActions'
import { SkyboxManager } from './skyboxManager'
import { createArrowButtons } from './arrowButtons'
import { createNPCs } from './createNPCs'

export function main() {
  const scene = engine.addEntity()
  Transform.create(scene, {
    position: Vector3.create(sceneMiddle, sceneMiddle + yOffset, sceneMiddle)
  })

  const platform = engine.addEntity()
  GltfContainer.create(platform, { src: `models/platform.glb` })
  Transform.create(platform, {
    position: Vector3.create(0, -3, 0),
    parent: scene
  })

  const skyboxManager = new SkyboxManager(scene)
  createArrowButtons(platform, skyboxManager.next, skyboxManager.previous)
  movePlayerTo({ newRelativePosition: Vector3.create(sceneMiddle, sceneMiddle + yOffset, sceneMiddle) })

  executeTask(async () => {
    try {
      let response = await fetch(
        'https://peer-wc1.decentraland.org/lambdas/outfits/0x185af8cf06431DAcbc877ac754D21e86B4F68136'
      )
      let json = await response.json()
      const outfits = json?.metadata?.outfits

      if (outfits) createNPCs(platform, outfits)
    } catch {
      console.log('failed to reach URL')
    }
  })
}
