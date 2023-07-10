import { Entity, Transform, engine, removeEntityWithChildren } from '@dcl/sdk/ecs'
import { createSkyBox } from './skybox'

const skyboxFolders = Array.from(Array(9).keys())
const maxIndex = skyboxFolders.length - 1

export class SkyboxManager {
  private currentIndex: number = 0
  private skybox: Entity

  constructor(parent: Entity) {
    this.skybox = createSkyBox(parent, this.currentIndex.toString())
  }

  next = () => {
    const parent = Transform.get(this.skybox).parent
    if (!parent) return

    removeEntityWithChildren(engine, this.skybox)
    this.currentIndex++
    if (this.currentIndex > maxIndex) this.currentIndex = 0

    this.skybox = createSkyBox(parent, skyboxFolders[this.currentIndex].toString())
  }

  previous = () => {
    const parent = Transform.get(this.skybox).parent
    if (!parent) return

    removeEntityWithChildren(engine, this.skybox)
    this.currentIndex--
    if (this.currentIndex < 0) this.currentIndex = maxIndex

    this.skybox = createSkyBox(parent, skyboxFolders[this.currentIndex].toString())
  }
}
