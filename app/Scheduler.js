import * as React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import {FlatList} from 'react-native'



const list = [
    {
      id: 1,
      name: 'Amy Farha',
      avatar_url: 'https://randomuser.me/api/portraits/women/57.jpg',
      subtitle: 'Vice President'
    },
    {
      id: 2,
      name: 'Chris Jackson',
      avatar_url: 'https://randomuser.me/api/portraits/women/57.jpg',
      subtitle: 'Vice Chairman'
    },

  ]

  const NHL_SCHEDULE = 'https://statsapi.web.nhl.com/api/v1/schedule'
  export default class Scheduler extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            schedule: {},
            teams: {},
        }
    }

    componentDidMount(){
        this.setSchedule();
    }

    async setSchedule(){
        let schedule = {};
        await fetch(NHL_SCHEDULE).then(response => response.json())
        .then(data => {
            this.setState({schedule: data});
        })
    }


  keyExtractor = (item) => item.id
  
  renderItem = ({ item }) => (
    <ListItem bottomDivider>
        <Avatar rounded source={{uri: item.avatar_url}} />
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
    </ListItem>
  )
  
  render () {
      console.log(list)
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={list}
        renderItem={this.renderItem}
      />
    )
  }


  }

