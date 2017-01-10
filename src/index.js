"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'


import { Page } from 'react-storm-ui'

class App extends Component {
	
	render() {
		const data = [];
		for (let i = 1; i < 100; i++) {
			data.push(`Line ${i}`);
		}		
		return (
			<Page 
				renderHeader = {() => (<h3> Header </h3>)}
				renderFooter = {() => (<h3> Footer </h3>)}
				renderModel  = {() => (<h2> Model </h2>)}	> 
				
				<div> Content </div>
				
				{ 
					data.map( (entry,id) => <div key = {id} > {entry} </div> ) 
				}
				
			</Page>
		);
	}
	
}


render( <App />, document.getElementById('root'));