import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';
import TableContent from './Components/TableContent.js';

class WeatherApp extends React.Component{

 	/* All the values showed in the interface are passed
 	to the components trough state and update after the
 	user inform a city.*/

	constructor(props){
		super(props);
		this.state={
			icon:'',
			country:'',
			city:'',
			weather:'',
			description:'',
			temperature:'',
			mintemperature:'',
			maxtemperature:'',
			pressure:'',
			humidity:''
		};
	}

componentDidMount() {

var inputcity = document.getElementById('cityus');

inputcity.addEventListener("keydown",function(event){

if(event.keyCode === 13){	
event.preventDefault();
document.getElementById('subbutton').click();
}

}

);
	
	}
	
	weatherInfo(){

		/*
		This function was created to get the values from the API 
		"Openweathermap" and show the data after the user inform
		the city he is living in.
		*/
		document.getElementById('idwarning').innerHTML = "";
		var that = this; 
		var city = document.getElementById('cityus').value;
		var urlrequest = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=4e4f4687d2b93f1f582bfb7545187965'; // URL that is requested to get the data 
		$.ajax({
		url: urlrequest,
		method:'get', 
		dataType:'json',
		success: function (dados){

		var i,weather,description,icondata;
		var datacountry = JSON.parse(JSON.stringify(dados.sys.country)); 
		var dataname = JSON.parse(JSON.stringify(dados.name));
		var datatemperature = JSON.stringify(dados.main.temp);
		var temperaturecelsius = (Math.round(parseFloat(datatemperature) - 273.15)) + " °C";
		var datatemperaturemin = JSON.stringify(dados.main.temp_min);
		var mintemperaturecelsius = (Math.round(parseFloat(datatemperaturemin) - 273.15)) + " °C"; 
		var datatemperaturemax = JSON.stringify(dados.main.temp_max);
		var maxtemperaturecelsius = (Math.round(parseFloat(datatemperaturemax) - 273.15)) + " °C"; 
		var datapressure = JSON.stringify(dados.main.pressure) + " mbar";
		var datahumidity = JSON.stringify(dados.main.humidity) + "%"; 
    	for(i in dados.weather){
    	weather = JSON.parse(JSON.stringify(dados.weather[i].main));
    	description = JSON.parse(JSON.stringify(dados.weather[i].description));
    	icondata = "http://openweathermap.org/img/wn/" +
    	(JSON.parse(JSON.stringify(dados.weather[i].icon))) +
		"@2x.png";
    	}
	
			that.setState({icon: icondata,
			country: datacountry,
			city: dataname,
			weather: weather,
			description: description,
			temperature: temperaturecelsius,
			mintemperature: mintemperaturecelsius,
			maxtemperature: maxtemperaturecelsius,
			pressure: datapressure,
			humidity: datahumidity});	
		

		},

		error: function(dados){
			document.getElementById('idwarning').innerHTML = "There is something wrong or the server is busy, try again.";
		}

});


}

render(){

	return(

		<div className="positionRelative">

		<div className="containerform" id="container">

		<h1 className="AbrilFont title">WEATHERINFO</h1> 
		
		<form>
			<label className="labelcity">Enter your city:</label>
			<input required id="cityus" type="text" name="city" className="inputtext" placeholder="City"/>
			<button  id="subbutton" type="button" name="Enviar" className="inputsubmit" onClick={ () => {this.weatherInfo()}} >Enviar</button>
		</form>

		<div className="warning" id="idwarning">
			
		</div>
			
 		<table className="customfontsize" id="exibirDados">
 			<tbody>
 			<tr>
 				<td>
 				<img src={this.state.icon} />
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Country:</div> {this.state.country}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">City:</div> {this.state.city}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Weather:</div> {this.state.weather}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Description:</div> {this.state.description}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Temperature:</div> {this.state.temperature}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Minimum temperature:</div> {this.state.mintemperature}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Maximum temperature:</div> {this.state.maxtemperature}
 				</td>
 			</tr>
 			<tr>
 				<td>
 					<div className="bold">Pressure:</div> {this.state.pressure}
 				</td>
 			</tr>
 			 			<tr>
 				<td>
 					<div className="bold">Humidity:</div> {this.state.humidity}
 				</td>
 			</tr>
 			</tbody>
 		</table>	

		</div>

		</div>

);

}



}

ReactDOM.render(<WeatherApp />,document.getElementById('root'));
export default WeatherApp;
