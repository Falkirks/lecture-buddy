import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            key: '',
            buttons: [],
            clicks: {},
            clickLog: [],
            questions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.keySubmit = this.keySubmit.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
        this.questionGot = this.questionGot.bind(this);
        this.buttonsSet = this.buttonsSet.bind(this);

        window.socket.on('set-key', this.keySubmit);
        window.socket.on('set-buttons', this.buttonsSet);
        window.socket.on('button', this.buttonPressed);
        window.socket.on('question', this.questionGot);

    }

    keySubmit(data){
        if(data.key != null) {
            this.setState({key: data.key});
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    buttonPressed(data){
        if(data.name != null) {
            var clicks = this.state.clicks;
            if(clicks[data.name] == null){
                clicks[data.name] = 0;
            }
            clicks[data.name]++;

            var clickLog = this.state.clickLog;
            clickLog.push({
                name: data.name,
                time: Date.now()
            });

            this.setState({
                clicks: clicks,
                clickLog: clickLog
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    questionGot(data){
        if(data.text != null) {
            var questions = this.state.questions;
            questions.push({
                text: data.text,
                time: Date.now()
            });

            this.setState({
                questions: questions
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    buttonsSet(data){
        if(data.buttons != null) {
            this.setState({
                buttons: data.buttons
            });
        }
        else{
            alert("YOU FUCKED UP!");
        }
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        window.socket.emit('create', {
            name: this.state.name
        });
        event.preventDefault();
    }

    render() {
        if(this.state.name != '' && this.state.key != '' && this.state.buttons.length > 0) {
            return (<b>WE GOT DAT KEY AND ITS {this.state.key}</b>);
        }
        else{
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <TextField hintText=" Your name" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <RaisedButton label="SHIT" type="submit" value="Create lecture"/>
                </form>
            );
        }
    }
}