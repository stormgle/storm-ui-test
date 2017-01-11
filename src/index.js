"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'


import { Page } from 'react-storm-ui'

class App extends Component {
	
	renderModal() {
		return (
			<button onClick = {this.props.hideModel}> Close </button>
		);
	}
	
	render() {
		const data = [];
		for (let i = 1; i < 100; i++) {
			data.push(`Line ${i}`);
		}		
		return (
			<Page 
				renderHeader = {() => (<h3> Header </h3>)}
				renderFooter = {() => (<h3> Footer </h3>)}
				renderModal  = {this.renderModal.bind(this)} hideModal	> 
				
				<div> Content </div>
				
				{ 
					data.map( (entry,id) => <div key = {id} > {entry} </div> ) 
				}
				
			</Page>
		);
	}
	
}


render( <App />, document.getElementById('root'));