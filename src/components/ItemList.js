import Item from "./Item";
import SearchInput from './SearchInput';

function ItemList({tasks, completed, setSelected, setSearch}) {

	const displayItems = () =>{
		if(tasks.length === 0){
			let message = !completed ? 'Done for the day?' : 'Please fill me :(';
			return <h3>{message}</h3>
		}
		return tasks.map((task) => <Item taskList={task} key={task.id} setSelected={setSelected} completed={completed}/>);
	}

	return (
		<div className="item-list">		
			<div className="search-cmp">
				<h1>{!completed ? `To-do(${tasks.length})` : `Not-to-do(${tasks.length})`}</h1>
				<SearchInput setSearch={setSearch} completed={completed}/>
			</div>
			<div>{displayItems()}</div>
			<div className="search-cmp"></div>
		</div>
	);

}

export default ItemList;