import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { colors } from './resources'
import * as utils from '@dcl-sdk/utils'

let isVisible = false
let message = ''

export const Message = () => (
  <UiEntity
    uiTransform={{
      width: 600,
      height: 150,
      padding: 5,
      positionType: 'absolute',
      position: { top: 200, right: -300 },
      display: isVisible ? 'flex' : 'none'
    }}
    uiBackground={{ color: colors.blue }}
  >
    <UiEntity
      uiTransform={{
        width: 590,
        height: 140
      }}
      uiBackground={{ color: colors.black }}
      uiText={{ value: message, fontSize: 30 }}
    />
  </UiEntity>
)

export const showMessage = (mess: string) => {
  message = mess
  isVisible = true

  utils.timers.setTimeout(() => hideMessage(), 5000)
}

export const hideMessage = () => {
  isVisible = false
  message = ''
}
