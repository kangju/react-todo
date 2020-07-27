import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const API_KEY = "TODO";

function TodoItem(props){
    return (
        <li key={props.index}>
            <div className="todoitem">
                <div>
                    {props.value}
                </div>
                <div>
                    <button onClick={props.onRemoveButtonClick}>削除</button>
                </div>
            </div>
        </li>
    );
}

function TodoList(props){
    const todos = props.todos;
    const todoItems = todos.map((value,index)=>{
        return (
            <TodoItem value={value} index={index} onRemoveButtonClick={() => props.onRemoveButtonClick(index)}/>
        );
    });
    return (
        <div class="todolist">
            <h2>TODO List</h2>
            <ol>{todoItems}</ol>
        </div>
    );
}

class Todo extends React.Component
{
    constructor(props){
        super(props);

        const localItem = localStorage.getItem(API_KEY);
        const todos = localItem ? JSON.parse(localItem) : [];

        this.state = {
            todos:todos,
            inputtext:"",
        }
    }

    onInputFieldChange(e){
        const inputValue = e.target.value.slice();
        this.setState({
            inputtext:inputValue,
        });
    }

    onInputFieldKeyPress(e){
        if(e.which === 13) this.addTodoItem();
    }

    onAddButtonClick(e){
        this.addTodoItem();
    }

    addTodoItem(){
        const inputtext = this.state.inputtext.slice();
        if(!inputtext)
            return;

        const newTodos = this.state.todos.concat(inputtext);
        this.setState({
            todos:newTodos,
            inputtext:"",
        });

        localStorage.setItem(API_KEY,JSON.stringify(newTodos));

        
    }

    onRemoveButtonClick(index)
    {
        const todos = this.state.todos.slice();
        todos.splice(index,1);
        this.setState({
            todos:todos
        });
        localStorage.setItem(API_KEY,JSON.stringify(todos));
    }

    render(){
        const todos = this.state.todos.slice();
        return (
            <div class="todo">
                <div class="inputfield">
                    <h2>Input</h2>
                    <input type="text"
                        value={this.state.inputtext}
                        onChange={(e) => this.onInputFieldChange(e)}
                        onKeyPress={(e) => this.onInputFieldKeyPress(e)}
                        placeholder="TODO"/>
                    <button onClick={(e) => this.onAddButtonClick(e)}>登録</button>
                </div>
                <TodoList todos={todos} onRemoveButtonClick={(index) => this.onRemoveButtonClick(index)} />
            </div>
        );
    }
}

ReactDOM.render(<Todo />,document.getElementById("root"));