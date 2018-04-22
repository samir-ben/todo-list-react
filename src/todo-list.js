import React, { Component} from 'react'

class TodoList extends Component {
    constructor(){
        super();
        this.state = {
            task: '',
            tasks:[
                {id: 1,
                description: 'Make a todo-list with React.js',
                complete: true},
            ],
            checked: false
            
        }
    }
    render(){
        // if array is empty, write 'no task'
        let noTask = this.state.tasks < 1 ? "No task" : "";   
        return (
            <div>
                <h1 className="text-center">My todo-list</h1>
                <div className="wrapper">
                    <div className="input-default">
                        <input
                            id="name"
                            value={this.state.task}
                            type="text"
                            onChange={this.onChange.bind(this)}
                            className="input"
                            required
                        />
                        <label>Add task</label>
                        <button onClick={this.addItem.bind(this)} className="btn btn-light float-right">Ajouter</button>
                    </div>
                </div>
                <p className="text-center">{noTask}</p>

                {this.state.tasks.map(task=> {
                    // if task completed, strike it
                    const done = task.complete ? <strike>{ task.description }</strike> : <span>{task.description}</span>;
                return (
                        <div key={task.id} className="list-group">
                            <div  className="list-group-item">
                                {done}
                                
                            <button className="float-right" onClick={this.deleteTodo.bind(this, task)}><i className="fa fa-times"></i></button> 
                            <button className="float-right" onClick={this.taskChecked.bind(this)}><i className="fa fa-check"></i></button>
                            </div>
                        </div>
                    )
                })}           
            </div>
        )  
    }
    // remove a task
    deleteTodo(item) {
        const array = this.state.tasks;
        const index = array.indexOf(item);
        array.splice(index, 1);
        this.setState({
            tasks: array
        });
    }
    // to complete a task
    taskChecked(itemId) {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(item => (
                itemId.id === item.id ? Object.assign(item, { complete: false }) : Object.assign(item, { complete: true  }))
            )
        }));
    }

    // Take input value
    onChange(event) {
        this.setState({
            task: event.target.value
        });
        console.log(this.state.tasks)
    }
    // add a task in array
    addItem(event) {
        event.preventDefault();
        if(this.state.task !== ''){
            this.setState((prevState) => {
                const newTask = {
                    id: prevState.tasks.length + 1,
                    description: prevState.task,
                    complete: false
                }
                return {
                    task: '',
                    tasks: prevState.tasks.concat(newTask)
                }
            });
        }
        else if (this.state.tasks.length > 0) {
            return <p>notaches</p>
        } 
    }  
}

export default TodoList;

