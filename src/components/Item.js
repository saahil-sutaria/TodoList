import { BiTaskX, BiTask } from 'react-icons/bi';

function Item({completed, taskList : {task, id}, setSelected}){

	return(
		<div className={!completed? "row todo" : "row done"}  onClick={() => setSelected(id, completed)} id={"row-"+id} >
			{task} {completed ? <BiTask color={"black"} size={"1.5em"}/> : <BiTaskX size={"1.5em"} color={"black"}/>}
		</div>
	);
}

export default Item;
