

import React, { useState } from "react"; 
import './Form.scss';

function Form() { 
	const [value, setValue] = useState(""); 
	const [result, setResult] = useState(""); 
	function handleSubmit(e) { 
		e.preventDefault(); 
		setResult( 
			"Form has been submitted with with Input: " + 
				value 
		); 
	} 

	function handleChange(e) { 
		setValue(e.target.value); 
		setResult(""); 
	} 
	
	const name = document.querySelector(".main-microsoft-div");
function hideDiv() {
    name.style.display = "none";
}

	
	
	
	return ( 
		<div 
			style={{ textAlign: "center", margin: "30px 40px" }} 
		> 
			<h1 style={{ color: "Green" }}> 
				GeeksforGeeks 
			</h1> 
			<h3> 
				Exemple for React onSubmit Event Handler 
			</h3> 
			
			<div className='main-microsoft-div'>
        			<form onSubmit={handleSubmit} > 
        				<label>Add input here: </label> 
        				<input 
        					value={value} 
        					onInput={handleChange} 
        					required 
        				/> 
        				 <button  
        				  onClick={hideDiv} type='submit'>Submit </button> 
        			</form> 
        			<br /> 
			</div>
			
			<div>
			  Outlook email sign in
				<h4>{result}</h4> 
			</div> 
			
			
		</div> 
	); 
} 

export default Form; 
