// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

import '../process';

// Auto-generated content.
import { VRInstance } from 'react-vr-web';

import DomOverlayModule from '../DomOverlayModule';

function init(bundle, parent, options) {

	// Create a div where the overlay will be displayed in the DOM.
	const domOverlayContainer = document.createElement('div');
	domOverlayContainer.id = 'dom-overlay';
	// Create an instance of the module, to be registered below.
	const domOverlayModule = new DomOverlayModule(domOverlayContainer);

	const vr = new VRInstance(bundle, 'react_vr_demo', parent, {
		// Add custom options here
		...options,
		// Register dom overlay module upon initialization.
		nativeModules: [domOverlayModule],
	});

	// Inject DOM overlay container to the player so that it is rendered properly.
	vr.player._wrapper.appendChild(domOverlayContainer);

	vr.render = function () {
		// Any custom behavior you want to perform on each frame goes here
	};
	// Begin the animation loop
	vr.start();
	return vr;
}

window.ReactVR = { init };
