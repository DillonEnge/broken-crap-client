import React, { Component } from 'react';
import {
	Alert,
	Button,
	Grid,
	PageHeader,
	Panel,
    Col,
    Image
} from 'react-bootstrap';
import { COPY } from '../../constants/COPY';
import Space from '../layout/Space';
import '../../../css/Listing.css';

class Listing extends Component {

  	render() {
    	return (
			<div className='listing'>
				<div className='listing-pictures'>
					<div className='listing-picture'>test1</div><div className='listing-picture'>test2</div><div className='listing-picture'>test3</div>
				</div>
				<div className='listing-shutter'>
					<div className='listing-title'>test5</div>
					<div className='listing-description'>test6</div>
				</div>
			</div>
    	);
  	}
}

export default Listing;