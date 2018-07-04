import React, { Component } from 'react';

class Space extends Component {
    render() {
        const { height = '40px' } = this.props;

        return (
            <div className='space' style={{ height: height }} ></div>
        );
    }
}

export default Space;