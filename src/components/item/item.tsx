import {Component, h, Host, Prop} from '@stencil/core';

@Component({
  tag: 'componentt-toast-item',
  shadow: false,
})
export class Item {
  @Prop() icon: string;
  @Prop() toastTitle: string;
  @Prop() progress: boolean = true;
  @Prop() type: string;

  render() {
    return (
      <Host class={`componentt-toast__item componentt-toast--${this.type}`}>
        <div class="componentt-toast__icon">
          <i class={this.icon}></i>
        </div>
        <div class="componentt-toast__close">
          <button id="componentt-toast__close-">X</button>
        </div>
        <div class="componentt-toast__title">{this.toastTitle}</div>
        <div class="componentt-toast__description">
          <slot></slot>
        </div>
        {this.progress ?
          <div class="componentt-toast__progress">
            <div class="componentt-toast__progress__bar"/>
          </div>
          : ''
        }
      </Host>
    )
  }
}
