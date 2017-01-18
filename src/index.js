"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'


import { Page } from 'react-storm-ui'

let i = 0;

class App extends Component {
	
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
				renderHeader = {() => (<h3> Header </h3>)}
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


render( <App />, document.getElementById('root'));