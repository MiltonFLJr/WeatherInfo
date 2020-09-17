import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class TableContent extends React.Component{

	weatherInfo(){
		/*
		$.ajax({
		url:'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=4e4f4687d2b93f1f582bfb7545187965',
		method:'get',
		dataType:'json'
		}).done(function (dados){

			var i;
			for(i=0;i<dados.weather.length;i++){
				document.write(JSON.stringify(dados.weather[i]));
			}

		});
	*/
	}

	render(){

	return(
		console.log("TESTANDO!")
	);

	}
	


}

export default TableContent;
