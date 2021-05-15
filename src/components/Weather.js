import React, {useState} from "react"
import DisplayWeather from "./DisplayWeather";
import "./weather.css"


function Weather(){

    const API = "d3dfa3ff8cbb2f72a28317073dbba258";

    const [form, setForm] = useState({
        city: "",
        country: ""
    });

    const [weather, setWeather] = useState([]);

    const handleChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        if(name==="city"){
            setForm({...form,city:value})
        }
        if(name==="country"){
            setForm({...form,country:value})
        }
        console.log(form.city, form.country)
    };

    async function weatherData(e){

        e.preventDefault();
        if(form.city==="" || form.country===""){
            alert("Add Values");
        }
        else{
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${API}`
                ).then((res) => res.json())
                .then((data) => data)

            setWeather({
                data:data
            });
        }

    };

    return (
        <div className = "weather">
            <span className = "title">
                Weather App
                <br/>
            </span>
            <form>
                <input type="text" name="city" placeholder = "City" onChange = {(e) => handleChange(e)}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" name="country" placeholder = "Country" onChange = {(e) => handleChange(e)}/>
                <button className="getweather" onClick = {(e) => weatherData(e)}>Submit</button>

            </form>
            {
                weather.data!=undefined ? 
                <div>
                    <DisplayWeather data = {weather.data}/>
                </div>
                
                :null
            }
            
        </div>
    );
};

export default Weather;