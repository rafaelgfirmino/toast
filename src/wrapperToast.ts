interface ItemConfig {
  type: string,
  title: string,
  icon: string,
  progress: boolean
  cooldown: number
  description: string
  actions: Array<HTMLButtonElement>
}

interface ToastConfigInterface {
  theme: string
  placement: string
}

export class WrapperToast {
  private toastWrapper: HTMLElement

  constructor(toastWrapperConfig: ToastConfigInterface) {
    this.toastWrapper = document.querySelector('componentt-toast')
    if (!this.toastWrapper) {
      const body = document.querySelector('body')
      this.toastWrapper = this.createToastWrapper(toastWrapperConfig)
      body.append(this.toastWrapper)
    }
  }

  private createToastWrapper(toastWrapperConfig: ToastConfigInterface): HTMLElement {
    const toastWrapper = document.createElement('componentt-toast')
    toastWrapper.setAttribute('data-theme', toastWrapperConfig.theme)
    toastWrapper.setAttribute('data-placement', toastWrapperConfig.placement)
    return toastWrapper
  }

  public emit(itemConfig: ItemConfig): void {
    const item = this.createItem(itemConfig)

    this.toastWrapper.appendChild(item)
  }

  private createItem(itemConfig: ItemConfig): HTMLElement {
    const item = document.createElement('componentt-toast-item');
    item.setAttribute('type', itemConfig.type)
    item.setAttribute('toast-title', itemConfig.title)
    item.setAttribute('progress', itemConfig.progress.toString())
    item.setAttribute('cooldown', itemConfig.cooldown.toString())
    if(itemConfig.icon == null){
      itemConfig.icon = `fi flaticon-${itemConfig.type}`
    }
    item.innerHTML = itemConfig.description
    item.setAttribute('icon', itemConfig.icon)
    if (itemConfig.actions){
      item.append(this.createSlotActions(itemConfig.actions))
    }
    return item
  }

  private createSlotActions(actions: Array<HTMLButtonElement>): HTMLElement {
    const slotActions = document.createElement('div')
    slotActions.setAttribute('slot', 'actions')
    actions.map((action) => slotActions.appendChild(action))
    return slotActions
  }
}
