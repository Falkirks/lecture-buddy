import React from 'react';
import Snackbar from 'material-ui/Snackbar';
export default class Click extends React.Component {




    constructor(props) {
        super(props);
        this.handleClick = this._handleClick.bind(this)
    }


    _handleClick(){
        window.socket.emit('button', {
            name: this.props.name
        });

    }




    render() {
        return (
        <button type="button" className="app-button btn btn-primary" onClick={this.handleClick}>{this.props.name}</button>
        );
    }
}


