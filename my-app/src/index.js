import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Todo extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            todos:[],
            inputtext:"",
        }
    }

    onInputFieldChange(e){
        const inputValue = e.target.value.slice();
        this.setState({
            inputtext:inputValue,
        });
    }

    onAddButtonClick(e){
        const inputtext = this.state.inputtext.slice();
        if(!inputtext)
            return;

        this.setState({
            todos:this.state.todos.concat(inputtext),
            inputtext:"",
        });
    }

    render(){
        const todos = this.state.todos.slice();
        const todolist = todos.map((value,index)=>{
            return (
                <li key="{index}">
                    {value}
                </li>
            );
        });
        return (
            <div class="todo">
                <div class="inputfield">
                    <h2>Input</h2>
                    <input type="text" value={this.state.inputtext} onChange={(e) => this.onInputFieldChange(e)} placeholder="TODO"/>
                    <button onClick={(e) => this.onAddButtonClick(e)}>登録</button>
                </div>
                <div class="todolist">
                    <h2>TODO List</h2>
                    <ol>{todolist}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Todo />,document.getElementById("root"));