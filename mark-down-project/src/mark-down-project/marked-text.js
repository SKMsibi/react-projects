import React from 'react';
export default class MarkedText extends React.Component {
    render() {
        return (
            < div >
                <h3>Your Mark Down pre-view</h3>
                <div class="container" dangerouslySetInnerHTML={this.props.text()}></div>
            </div >
        )
    }
}