import {Component, h, Host} from '@stencil/core';

@Component({
  tag: 'componentt-toast',
  shadow: false,
  assetsDirs: ['../../assets']
})
export class Toast {

  render() {
    return (
      <Host class="componentt-toast"></Host>
    )
  }
}
