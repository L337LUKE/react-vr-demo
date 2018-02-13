import React from 'react';

/**
 * this needs styling looks stupid under the main screen and i doubt it would work
 * well on mobile. Would look better it was overlaid the main view semi transparent maybe?
 * */ 

const TextboxOverlay = ({header, links}) => {
	return (
		<div>
			<h2>{header}</h2>
			<ul>
				{links &&
					links.map((link, key) => {
						return <li key={key}>{link.text}</li>;
					})}
			</ul>
		</div>
	);
};

export default TextboxOverlay;
