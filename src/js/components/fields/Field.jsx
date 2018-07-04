import React, { Component } from 'react';
import {
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToFields } from '../../redux';

const mapDispatchToProps = {
    addToFields
};

const mapStateToProps = (state, ownProps) => ({
    field: state.fieldReducer,
});

class Field extends Component {
	constructor(props, context) {
		super(props, context);

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e) {
        const { activationFunction } = this.props;

		if (e.charCode === 13) {
			activationFunction();
		}
	}

	handleFieldChange(e) {
        const { id, addToFields } = this.props;

        addToFields(id, { fieldValue: e.target.value });
	}

  	render() {
        const { id, name, type='text', placeholder, field } = this.props;

    	return (
			<FormGroup controlId={ id }>
				<ControlLabel>{ name }</ControlLabel>
				<br></br>
				<FormControl
				type={ type }
				value={ field[id] ? field[id].fieldValue : '' }
				placeholder={ placeholder }
				onChange={ this.handleFieldChange }
                onKeyPress={ this.handleKeyPress } />
				<FormControl.Feedback />
			</FormGroup>
    	);
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);