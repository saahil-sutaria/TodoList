function SearchInput({setSearch, completed}) {

	return (
		<div>
			<input 
				onChange={(e)=>setSearch(e.target.value, completed)} 
				placeholder="Search..."  
				type="text" 
				id="fname" 
				name="fname" />
		</div>
	);

}

export default SearchInput;