import {Component, h, Host} from '@stencil/core';
@Component({
  tag: 'ctt-toast',
  shadow: false,
  assetsDirs: ['../../assets']
})
export class Toast {

  render() {
    return (
      <Host class="ctt-toast"></Host>
    )
  }
}
