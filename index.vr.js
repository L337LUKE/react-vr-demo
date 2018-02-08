import React from 'react';
import {
	AppRegistry,
	asset,
	Pano,
	Text,
	View,
	VrButton
} from 'react-vr';

export default class react_vr_demo extends React.Component {
	static defaultProps = {
		sourceData: 'sourceData.json'
	};

	constructor(props) {
		super(props);
		this.state = {
			rooms: null
		};
	}

	componentDidMount() {
		fetch(asset(this.props.sourceData).uri)
			.then(response => response.json())
			.then(responseData => this.setState({
				rooms: responseData.rooms
			}))
	}

	renderTooltips() {
		let data = this.state.rooms[0].tooltips;
		console.log(data);
		return data.map((x) => {
			return (
				<View>
					<VrButton style={{
						backgroundColor: '#777879',
						layoutOrigin: [.5, .5, 0],
						position: 'absolute',
						transform: [
							{ rotateY: x.rotateY },
							{ translate: [0, 0, -3] }
						]
					}}>
						<Text>{x.text}</Text>
					</VrButton>
				</View>
			)
		})
	}

	render() {
		return (
			<View>
				<Pano source={asset('chess-world.jpg')} />
				{this.state.rooms && this.renderTooltips()}
			</View>
		);
	}
};

// AppRegistry.registerComponent identifies the root component
AppRegistry.registerComponent('react_vr_demo', () => react_vr_demo);
