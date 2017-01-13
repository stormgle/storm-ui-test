"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'


import { Page } from 'react-storm-ui'

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
					<button onClick = {this.page.showModal}> Modal </button>
					<button onClick = {() => this.page.pushOverlay(<div><h2>Overlay</h2><button onClick = {this.page.popOverlay}>Close</button></div>)}> Modal </button>
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