import React, {useState} from 'react'
import { render } from 'react-dom';
import { View, StyleSheet, Image, FlatList, ListItem } from 'react-native';



const url = 'https://statsapi.web.nhl.com/api/v1/schedule'
export default class Scheduler extends React.Component{
    constructor(props){
        super(props)
    this.state ={
        games: null
    }

 this.getNHLSchedule = this.getNHLSchedule.bind(this);
}



async getNHLSchedule(url){
    let games;
    await fetch(url).then(response => response.json())
    .then((data) => {
        games = data.dates[0].games; 
        console.log(games)   
    });
    return games;

}

keyExtractor = (item, index) => index.toString()

renderItem(item){
    <ListItem
    title={item.name}
    subtitle={item.subtitle}
    leftAvatar={{ source: { uri: item.avatar_url } }}
    bottomDivider
    chevron
  />
}


render(){
    this.getNHLSchedule(url);
    return(
        <div>
            
      
      </div>
    )
}

}
