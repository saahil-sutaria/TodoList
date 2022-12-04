import React from "react";
import ItemList from "./ItemList";
import data from '../mockData/data.json';
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';

class Todo extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			complete : data.complete,
			incomplete : data.incomplete,
			filteredComplete : data.complete,
			filteredInComplete : data.incomplete,
			selected: [],
		}
		this.buttonStyle = {
			"--button-secondary-color": "#FBB03B",
			"--button-secondary-color-dark": "#c0bab9",
			"--button-secondary-color-light": "#312961",
			"--button-secondary-color-hover": "#e1eaf1",
			"--button-secondary-color-active": "#cfdee9",
			"--button-secondary-border": "2px solid #a84f1f",
			"boxShadow": "rgb(38, 57, 77) 5px 20px 20px -10px"
		};
	}

	setSearch = (search, isCompleted) => {
		let taskList = !isCompleted ?  this.state.incomplete :  this.state.complete;
		var filteredTask = taskList.filter(obj => {
			return obj.task.toLowerCase().includes(search.toLowerCase()) ? true : false;
		});
		if(!isCompleted){
			this.setState((prevState) => ({filteredInComplete : filteredTask}));
		}
		else{
			this.setState((prevState) => ({filteredComplete : filteredTask}));
		}
	}

	setSelected = (id, completed) => {
		var element = document.getElementById(`row-${id}`);
		if(!element) return;
		let colorClass = completed ? 'selected-done' : 'selected-todo';
		if(element.classList.contains("selected")){
			element.classList.remove("selected", colorClass);
			var newSelectedState = this.state.selected;
			const selectedWithIdIndex = newSelectedState.findIndex((obj) => obj.id === id);
			if (selectedWithIdIndex > -1) {
				newSelectedState.splice(selectedWithIdIndex, 1);
			}
			this.setState((prevState) => ({ selected : newSelectedState}));
		}
		else{
			element.classList.add("selected");
			element.classList.add(colorClass);
			this.setState((prevState) => ({selected : [...prevState.selected, {id: id, completed: completed}]}));
		}
	}

	displayButtons = (isComplete) => {
		return(
			<div className="todo-button">
				<AwesomeButton style={this.buttonStyle} onPress={() => this.moveSelected(isComplete)} type="secondary" >Move Selected</AwesomeButton>
					&nbsp;&nbsp;
				<AwesomeButton style={this.buttonStyle} size="medium" onPress={() => this.moveAllSelected(isComplete)} type="secondary" >Move All</AwesomeButton>
			</div>
		);
		
	}

	resetState = () => {
		this.setState(prevState => ({selected:[], filteredComplete: prevState.complete, filteredInComplete: prevState.incomplete}));
		const elements = document.querySelectorAll(`[id^="row-"]`);
		elements.forEach(element => element.classList.remove("selected", "selected-done", "selected-todo"));
	}

	moveSelected = (isComplete) => {

		let newCompleteTask = [];
		let newIncompleteTask = [];
		let taskList = !isComplete ? this.state.incomplete : this.state.complete;
		taskList.filter(task => {
			const idx = this.state.selected.findIndex((obj) => {
				return obj.id === task.id ? true : false;
			});
			if (idx > -1) {
				newCompleteTask.push(task);
				return true;
			}
			newIncompleteTask.push(task);
			return false;
		});

		if(!isComplete){
			this.setState(prevState => ({
				complete : [...prevState.complete, ...newCompleteTask], 
				incomplete : newIncompleteTask
			}));
		}
		else{
			this.setState(prevState => ({
				complete : newIncompleteTask, 
				incomplete : [...prevState.incomplete, ...newCompleteTask]
			}));
		}
		this.resetState();
	}

	moveAllSelected = (isComplete) => {
		if(!isComplete){
			this.setState(prevState => ({
				incomplete : [], 
				complete : [...prevState.complete, ...prevState.incomplete]
			}));
		}
		else{
			this.setState(prevState => ({
				complete : [], 
				incomplete : [...prevState.incomplete, ...prevState.complete]
			}));
		}
		this.resetState();
	}


	render(){
		const {filteredComplete, filteredInComplete} = this.state;
		return(
			<div className="container">
				<div className="todo-list" >
					<ItemList setSearch={this.setSearch} completed={false} tasks={filteredInComplete} setSelected={this.setSelected} />
					{this.displayButtons(false)}
				</div>
				<div className="todo-list" >
					<ItemList setSearch={this.setSearch} completed={true} tasks={filteredComplete} setSelected={this.setSelected}/>
					{this.displayButtons(true)}
				</div>
			</div>
		)
	}

}

export default Todo;