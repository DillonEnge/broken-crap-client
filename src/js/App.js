import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import {
	Alert,
	Button,
	Grid,
	PageHeader,
	Panel,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	Label
} from 'react-bootstrap';
import Space from './components/Space';
import $ from "jquery";
import { COPY } from '../constants/COPY';

class App extends Component {
	componentDidMount() {
		setInterval(this.getGarlicoinPrice(), 2000);
	}

	constructor(props, context) {
		super(props, context);

		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
	
		this.state = {
			addressValue: '',
			addressLabel: 'GRLC Address',
			addressValidation: null,
			amountValue: '',
			amountLabel: 'LTC Amount',
			amountValidation: null,
			buttonValidation: 'default',
			price: null
		};
	}

	handleAmountChange(e) {
		this.setState({ amountValue: e.target.value, amountLabel: this.state.amountLabel });
	}

	handleAddressChange(e) {
		this.setState({ addressValue: e.target.value, addressLabel: this.state.addressLabel });
	}

	getGarlicoinPrice() {
		$.get(COPY.URL + 'get/price?coin=LTC', (data) => {
			this.state.price = String(data);
		});
	}

	getAmountValidationState = () => {
		if (!isNaN(this.state.amountValue) && Number(this.state.amountValue) !== 0) {
			this.state.amountLabel = 'LTC Amount';
			this.state.amountValidation = 'success';
			this.checkFormStatus();
			return 'success';
		}
		else if (this.state.amountValue !== '' && (isNaN(this.state.amountValue) || Number(this.state.amountValue) === 0)) {
			this.state.amountLabel = 'Must be a number and be greater than 0';
			this.state.amountValidation = 'error';
			this.checkFormStatus();
			return 'error';
		}
		this.checkFormStatus();
		this.state.amountLabel = 'LTC Amount';
		return null;
	};

	getAddressValidationState = () => {

		if (this.state.addressValue.length === 34) {
			if (this.state.addressValue.charAt(0) !== 'G') {
				this.state.addressLabel = 'Not a valid GRLC Address (Must start with a "G")';
				this.state.addressValidation = 'error';
				this.checkFormStatus();
				return 'error';
			}
			this.state.addressLabel = 'GRLC Address';
			this.state.addressValidation = 'success';
			this.checkFormStatus();
			return 'success';
		}
		else if (this.state.addressValue.length > 0) {
			this.state.addressLabel = 'Not a valid GRLC Address (Improper length)';
			this.state.addressValidation = 'error';
			this.checkFormStatus();
			return 'error';
		}
		this.checkFormStatus();
		this.state.addressLabel = 'GRLC Address';
		return null;
	};

	checkFormStatus = () => {
		if (this.state.addressValidation === 'success' && this.state.amountValidation === 'success') {
			this.state.buttonValidation = 'success';
			return;
		}
		this.state.buttonValidation = 'warning';
		return;
	}

  	render() {
    	return (
			<div className="App">
				<PageHeader>
  					Welcome to the Garlic Exchange!
				</PageHeader>
				<Alert bsStyle="warning">
  					<strong>This site is still under construction!</strong>
					<br></br>
					Use at your own discression.
				</Alert>
				{ 'We currently only support LTC to GRLC. GRLC to LTC coming soon.' }
				<Space/>
				<Grid>
				<Col xs={6} xsOffset={3}>
				<Panel>
					<Panel.Heading>LTC to GRLC</Panel.Heading>
					<Panel.Body>
						<form>
							<FormGroup
							controlId="amountForm"
							validationState={this.getAmountValidationState()} >
								<ControlLabel>{ this.state.amountLabel }</ControlLabel>
								{ ' ' }
								{ this.state.price && <Label bsStyle="primary">1 LTC = { 1 / this.state.price  } GRLC</Label>}
								<br></br>
								<FormControl
								type="text"
								value={ this.state.amountValue }
								placeholder="Enter LTC Amount"
								onChange={this.handleAmountChange} />
								<FormControl.Feedback />
							</FormGroup>
							<br></br>
							<FormGroup
							controlId="addressForm"
							validationState={ this.getAddressValidationState() } >
								<ControlLabel>{ this.state.addressLabel }</ControlLabel>
								<br></br>
								<FormControl
								type="text"
								value={ this.state.addressValue }
								placeholder="Enter GRLC Address"
								onChange={this.handleAddressChange} />
								<FormControl.Feedback />
							</FormGroup>
							<br></br>
							<Button bsStyle={ this.state.buttonValidation }>Submit</Button>
						</form>
					</Panel.Body>
					{this.state.amountValidation === 'success' && <Panel.Footer>You will receive { Number(this.state.amountValue) / this.state.price } GRLC</Panel.Footer>}
				</Panel>
				</Col>
				</Grid>
    		</div>
    	);
  	}
}

export default App;
