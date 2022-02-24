import React, {useState} from 'react'
import { render } from 'react-dom';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';



const url = 'https://statsapi.web.nhl.com/api/v1/schedule'

const items = [
    {
        name: 'bryson',
        test: 'contact'
    },
    {
        name: 'james',
        test: 'contacts'
    }
]
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

renderItem = ({item}) => {
    <ListItem
    title={item.name}
    subtitle={item.test}
    //leftAvatar={{ source: { uri: item.avatar_url } }}
    bottomDivider={true}
  />
}


render(){
    console.log("test")
    return(
       <View>
        <FlatList
            keyExtractor={this.keyExtractor}
            data={items}
            renderItem={this.renderItem} />
        </View>
            
  
    )
}

}
