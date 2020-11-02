import {Component, Element, h, Host, Listen, Prop, State} from '@stencil/core';

@Component({
  tag: 'ctt-toast-item',
  shadow: false,
})
export class Item {
  @Prop() icon: string;
  @Prop() toastTitle: string;
  @Prop() type: string;
  @Prop() progress: boolean = true;
  @Prop() cooldown: number = 5000;
  @Prop() autoRemove: boolean = true;
  @Prop() viewMoreButtonText: string = 'view more'
  @Prop() viewLessButtonText: string = 'view less'
  @Prop() hasDescription: boolean = false

  @State() buttomViewText: string;
  @State() progressValue: number = 100;
  @State() counter: number = 0;
  @State() stopCooldown: boolean = false;
  @State() interval: number
  @State() showMore: boolean = false
  @Element() private element: HTMLElement

  @Listen('mouseenter', {capture: true})
  handleMouseEnter() {
    this.stopCooldown = true
  }

  @Listen('mouseleave', {capture: true})
  handleMouseOut() {
    this.stopCooldown = false
  }

  async componentWillLoad() {
    this.startCoolDown()
  }

  async componentDidLoad() {
    const descriptionTag = this.element.querySelector('.ctt-toast__description')
    if (descriptionTag && descriptionTag.scrollHeight > 250) {
      await this.toggleCollapse()
    }
  }

  async toggleCollapse() {
    const descriptionTag = await this.element.querySelector('.ctt-toast__description')
    descriptionTag.classList.toggle('ctt-toast__item--collapse')
    if (descriptionTag.classList.contains('ctt-toast__item--collapse')) {
      this.buttomViewText = this.viewMoreButtonText
      return
    }
    this.buttomViewText = this.viewLessButtonText
  }

  disconnectedCallback() {
    clearInterval(this.interval);
  }

  get indexInParent() {
    return Array.prototype.indexOf.call(this.element.parentNode.children, this.element);
  }

  startCoolDown() {
    this.interval = setInterval(() => {
      if (this.indexInParent > 2 || this.stopCooldown) {
        return
      }

      this.counter += 1000 / this.cooldown;
      this.progressValue = 100 - this.counter
      if (this.counter >= 100) {
        if (this.autoRemove) {
          this.removeElement()
        }
      }
    }, 10);
  }

  removeElement() {
    this.element.remove()
  }

  render() {
    return (
      <Host class={`ctt-toast__item ctt-toast--${this.type}`}>
        <div class="ctt-toast__icon">
          <i class={this.icon}></i>
        </div>
        <div class="ctt-toast__close">
          <button id="ctt-toast__close-" onClick={() => this.removeElement()}>X</button>
        </div>
        <div class="ctt-toast__title">{this.toastTitle}</div>
        {this.hasDescription ?
          <div class="ctt-toast__description">
            <slot></slot>
          </div>
          : ''}
        {this.hasDescription ?
          <div class="ctt-toast__viewMoreOrLessButton">
            <button id="viewMoreOrLessButton" onClick={() => this.toggleCollapse()}>{this.buttomViewText}</button>
          </div>
          : ''
        }
        <div class="ctt-toast__action">
          <slot name="actions"></slot>
        </div>
        {this.progress ?
          <div class="ctt-toast__progress">
            <progress class="ctt-toast__bar" max="100" value={this.progressValue}/>
          </div>
          : ''
        }
      </Host>
    )
  }
}
