import React from 'react';
import './ImageLinkform.css'

const ImageLinkForm =({ onInputChange, onButtonSubmit }) =>{
	return(
		<div>
			<p className= 'f3'>
				{'This magic Brain will detect faces in your pictures. Give it a try'}
			</p> 
			<div className = 'center'>
				<div className='form pa4 br3 shadow-3 center' >
					<input className='f4 pa2 w-70 center brleft' type='text' placeholder='Enter url' onChange= {onInputChange} />
					<button className='w-30 grow brright f4 link ph3 pv2 dib white bg-light-purple button' onClick ={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;