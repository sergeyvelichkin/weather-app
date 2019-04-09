import React from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2V5dmVsaWNoa2luIiwiYSI6ImNqdTh2bzI4dDA0NGo0NHQ3ZGNrMjllYjEifQ.4i1SDWwq2aKheh5MMmy0vg';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      city:'',
      temp:'',
      weather:''
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });


    map.on('click', (e) => {
      

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.lngLat.toArray()[1]}&lon=${e.lngLat.toArray()[0]}&units=metric&appid=e59987b37baec6ada9e7da5997576c04`)
      .then(response => response.json())
      .then(data => this.setState({ city: data.name,temp : data.main.temp, weather:data.weather[0].main
       }));

    });

  }

  render() {
    const {city, temp, weather } = this.state;

    return (
      <div>
        <div className="inline-block absolute top center mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Location: ${city},  Temperature: ${temp}°C', Weather : ${weather}   `}</div>
        </div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      </div>
    );
  }
}

export default App;