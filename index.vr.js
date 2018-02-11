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
			currentRoom: 1,
			rooms: null
		};
	}

	componentDidMount() {
		fetch(asset(this.props.sourceData).uri)
			.then(response => response.json())
			.then(responseData => this.setState({
				rooms: responseData.rooms
			}));
	}
	renderPano() {
		// Pano is an image projected onto a sphere that fully surrounds the viewer. 
		//It is a spehere of 1000m with a centre located at [0, 0, 0]

		let { currentRoom } = this.state;

		// must always go in sequence left, right, top, bottom, back, front
		let data = this.state.rooms[currentRoom].pano;
		return (
			<Pano source={{
				uri: [
					...data
				]
			}} />
		)
	}

	setTimer = {
		handle: function() {
			if (this.timerID !== null) {
				this.clear();
			}
			this.timerID = setTimeout(() => {
				console.log('times up'); // todo: set my action
				this.clear();
			}, 5000);
		},
		clear: function() {
			clearTimeout(this.timerID);
			this.timerID = null;
		},
		timerID: null,
	};

	_changeRoom(roomID) {
		this.setState({
			currentRoom: roomID
		});
	}

	renderButtons() {
		let { currentRoom } = this.state;
		let data = this.state.rooms[currentRoom].buttons;
		return data.map((x, key) => {
			if(key !== currentRoom) {
				return (
					<View key={key}>
						<VrButton
							style={{
								backgroundColor: '#777879',
								layoutOrigin: [.5, .5, 0],
								position: 'absolute',
								transform: [
									{ rotateY: x.rotateY },
									{ translate: [0, 1, -3] }
								]
							}}
							onClick={() => { this._changeRoom(key) }}
							onEnter={() => { this.setTimer.handle() }}
							onExit={() => { this.setTimer.clear() }}
						>
							<Text>{x.text}</Text>
						</VrButton>
					</View>
				)
			}
		});
	}
	renderTooltips() {
		let { currentRoom } = this.state;
		let data = this.state.rooms[currentRoom].tooltips;
		return data.map((x, key) => {
			return (
				<View key={key}>
					<VrButton 
						style={{
							backgroundColor: '#777879',
							layoutOrigin: [.5, .5, 0],
							position: 'absolute',
							transform: [
								{ rotateY: x.rotateY },
								{ translate: [0, 0, -3] }
							]	
						}}
						onEnter={() => { console.log('enter') }}
						onExit={() => { console.log('exit') }}
					>
						<Text>{x.text}</Text>
					</VrButton>
				</View>
			)
		});
	}

	render() {
		return (
			<View>
				{this.state.rooms && this.renderTooltips()}
				{this.state.rooms && this.renderPano()}
				{this.state.rooms && this.renderButtons()}
			</View>
		);
	}
};

// AppRegistry.registerComponent identifies the root component
AppRegistry.registerComponent('react_vr_demo', () => react_vr_demo);
