/**
 * took this from the offical react-vr docs. Looks to be a way to to show and hide the overlay, 
 * could be useful. Just call the function to use.
 * */

import React from 'react';
import ReactDOM from 'react-dom';
import {Module} from 'react-vr-web';

import TextboxOverlay from './TextboxOverlay';

// Example implementation of a dom overlay. This is useful on web and mobile,
// whenever a regular, 2D interaction makes more sense than dealing with a 360 scene.
// The key in this module is having a dom element (created in client.js) where our overlay will be rendered.
// What you render is up to you, and you could render as many different overlays as you want from a single module,
// or have multiple native modules, each taking care of a single overlay.
export default class DomOverlayModule extends Module {
  constructor(overlayContainer) {
    super('DomOverlayModule');

    this._closeOverlay = this.closeOverlay.bind(this);
    this._overlayContainer = overlayContainer;
  }

  // This method call opens up the overlay for display.
  openOverlay(props) {
    ReactDOM.render(
      <TextboxOverlay {...props} onClose={this._closeOverlay} />,
      this._overlayContainer
    );
  }

  closeOverlay() {
    ReactDOM.unmountComponentAtNode(this._overlayContainer);
  }
}
