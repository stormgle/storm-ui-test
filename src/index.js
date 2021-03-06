"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'


import { Page, Navigator, Splitter, SplitterSide, SplitterContent } from 'react-sg'

let i = 0;

const colors = [
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
	'#147006','#ddaec4','#6eec96','#36648b','#468499','#007272','#adb6f9','#576e63','#800080',
];

class MainPage extends Component {
	
	constructor(props) {
		super(props);
		this.page = null;
	}
	
	renderModal(page) {
		return (
			<div>
				<h3> Modal </h3>
				<br />
				<button onClick = {page.hideModal}> Close </button>
			</div>
		);
	}
	
	showModal () {
		if (this.page) {
			this.page.showModal();
		}
	}
	
	pushOverlay () {
		if (this.page) {
			i++;
			this.page.pushOverlay(
				<div>
					<h2> Overlay {i} </h2>
					<button onClick = {this.page.popOverlay}>Close</button>
					<button onClick = {this.pushOverlay.bind(this)}>More...</button>
				</div>
			)
		}
	}
	
	render() {
		const data = [];
		for (let i = 1; i < 100; i++) {
			data.push(`Line ${i}`);
		}		
		return (
			<Page 
				onInit = {page => this.page = page}
				renderHeader = {() => (<h1> Header </h1>)}
				renderFooter = {() => (<h3> Footer </h3>)}
				renderModal  = {this.renderModal.bind(this)}	> 
				
				<div>
					<button onClick = {this.showModal.bind(this)}> Modal </button>
					<button onClick = {this.pushOverlay.bind(this)}> Overlay </button>
				</div>
				
				<div> Content </div>
				
				
				
				{ 
					data.map( (entry,id) => <div key = {id} > {entry} </div> ) 
				}
				
			</Page>
		);
	}
	
}

class LandingPage extends Component {
	render() {
		return (
			<Page>
				Landing Page
			</Page>
		);
	}
}

class NavApp extends Component {
	
	renderRoute(route, nav) {
		function nextPage() {
			if (route.id === 1) {
				nav.push({ id: 2, name : 'PAGE 2'}, {animation : 'slide-bottom', onPrePush : route => console.log('SPECIAL PUSH')});
			} else if (route.id === 2) {
				nav.push({ id: 3, name : 'PAGE 3'}, {animation : 'none'});
			} else {
				nav.push({ id: route.id + 1, name : `PAGE ${route.id + 1}`});
			}			
		}
		function previousPage() {
			if (route.id === 2) {
				nav.pop({animation :'slide-bottom', onPrePop : route => console.log('SPECIAL POP')});
			} else if (route.id === 3) {
				nav.pop({animation : 'none'});
			} else {
				nav.pop();
			}
		}
		function resetStack() {
			//nav.reset([{id: 0, name : 'PAGE 0'}],{animation :'slide-bottom'});
			//nav.reset([{id: 0, name : 'PAGE 0'}]);
			nav.reset();
		}
		function showPageInfo() {
			console.log(nav.getCurrentRoute());
		}
		function showStackInfo() {
			console.log(nav.getRouteStack());
		}
		return (
			<Page style = {{backgroundColor : colors[route.id]}}
						renderHeader = {() => (<div style = {{backgroundColor : '#f9f9f9'}}> <label className = 'w3-xxlarge'> {route.name} </label></div>)} >
						
				<button onClick = {previousPage}> Back </button>
				<button onClick = {nextPage}> Next </button>
				<button onClick = {resetStack}> Reset </button>
				
				<div>
					<div> <input type = 'checkbox' /> A </div>
					<div> <input type = 'checkbox' /> B </div>
					<div> <input type = 'checkbox' /> C </div>
				</div>
				
				<div>
					<button onClick = {showPageInfo}> Page Info </button>
				</div>
				<div>
					<button onClick = {showStackInfo}> Stack Info </button>
				</div>
				
			</Page>
		);
	}
	
	render() {
		console.log('# Strom-ui Test Program');
		return (
			<Navigator	
				initialRouteStack = {[ {id :0, name : 'PAGE 0'}, {id :1, name : 'PAGE 1'} ]}
				initialRoute = {{id :2, name : 'PAGE 2'}}
				renderRoute = {this.renderRoute.bind(this)}
				animation = 'slide-right'
				animationOptions = {{duration : 500}}
				onPrePush = {(route) => console.log(`${route.name} : push a page`) }
				onPostPush = {() => console.log(`push finish`)}
				onPrePop = {(route) => console.log(`${route.name} : pop back`) }
				onPostPop = {() => console.log(`pop finish`)}
			/>
		);
	}
}

class App extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { isOpenMenu : false };
		
	}
	
	render() {		
		return (

				<Splitter>
					<SplitterSide 

						side = 'right'
						isOpen = {this.state.isOpenMenu}
						shouldLockContent = {true}
						animation	= 'slide'
						>
						<h3> HEADING 3 </h3>
						<br />
						<button onClick = {this.closeMenu.bind(this)} > close </button>
					</SplitterSide>
					<SplitterContent>
						<div> Content </div>
						<button onClick = {this.toggleMenu.bind(this)} style = {{right : 0, position: 'absolute'}} > Menu </button>
					</SplitterContent>
				</Splitter>

		);
	}
	
	toggleMenu() {
		this.setState({ isOpenMenu : !this.state.isOpenMenu });
	}
	
	closeMenu() {
		this.setState({ isOpenMenu : false });
	}
}

console.log ('App Test program')
render( <App />, document.getElementById('root'));