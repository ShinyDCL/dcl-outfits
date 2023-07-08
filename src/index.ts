import { engine, executeTask, GltfContainer, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { sceneMiddle, yOffset } from './resources'
import { movePlayerTo } from '~system/RestrictedActions'
import { SkyboxManager } from './skyboxManager'
import { createArrowButtons } from './arrowButtons'
import { createNPCs } from './createNPCs'
import { getUserData } from '~system/UserIdentity'
import { getUserOutfits } from './api'
import { setupUi } from './setupUi'

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
  setupUi((address: string) => {
    executeTask(async () => {
      const outfits = await getUserOutfits(address)
      if (outfits) createNPCs(platform, outfits)
    })
  })

  executeTask(async () => {
    const userData = await getUserData({})
    const address = userData?.data?.userId
    if (!address) return

    const outfits = await getUserOutfits(address)
    if (outfits) createNPCs(platform, outfits)
  })
}
