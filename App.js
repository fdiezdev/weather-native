import React from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';

const API_KEY = "2fa01ecdc02185dbd11179a00743bade";

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      city: undefined,
      temperature: undefined,
      description: undefined,
      main: undefined,
      wind: undefined,
    }
  }

  componentDidMount () {
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat=-31.4201&lon=-64.1888&units=metric&appid=2fa01ecdc02185dbd11179a00743bade')
      .then( (response) => response.json() )
      .then( (data) => {
        this.setState({
          city: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description.toUpperCase(),
          main: data.weather[0].main,
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed),
        })
      });
   }

  render() {
    return (
      <View style={{flex: 1, fontFamily: "SF-Pro"}}>
        <StatusBar hidden/>
        <View style={{flex: 3}}>
          <ImageBackground source={require('./assets/bg.png')} style={{width: '100%', height: '100%'}}>
              <View style={styles.divider} />
              <Text style={styles.mutedCenter}>{this.state.city}</Text>
              <Text style={styles.superTitleCenter}>{this.state.temperature}°</Text>
              <Text style={styles.subTitleCenter}>{this.state.description}</Text>
          </ImageBackground>
        </View>
        <View style={{flex: 2, padding: 20}}>
          <Text style={styles.title}><Text style={styles.bold}>Humidity:</Text> {this.state.humidity}%</Text>
          <Text style={styles.title}><Text style={styles.bold}>Wind:</Text> {this.state.wind} Km/h</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
    color: '#FFF',
  },
  title: {
    fontWeight: '200',
    fontSize: 20,
    color: '#000',
  },
  subTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: '#000',
  },
  muted: {
    color: "#ccc",
    fontSize: 12,
    fontWeight: '200',
  },
  textCenter: {
    fontWeight: '300',
    textAlign: 'center',
    color: '#FFF',
  },
  titleCenter: {
    fontWeight: '800',
    fontSize: 30,
    color: "black",
    textAlign: 'center',
    color: '#FFF',
  },
  subTitleCenter: {
    fontWeight: '800',
    fontSize: 15,
    textAlign: 'center',
    color: '#FFF',
  },
  mutedCenter: {
    color: "#ccc",
    fontSize: 12,
    fontWeight: '200',
    textAlign: 'center',
  },
  superTitle: {
    fontWeight: '800',
    fontSize: 80,
    color: '#FFF',
  },
  superTitleCenter: {
    fontWeight: '800',
    fontSize: 80,
    color: '#FFF',
    textAlign: 'center',
  },
  bold: {
    fontWeight: '700',
  }, 
  divider: {
    padding: 50,
  }
});
