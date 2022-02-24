import * as React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import {FlatList} from 'react-native'
import teams, {getTeamId} from '@nhl-api/teams'



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
            games: {},
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
        this.createGamesObject();
    }

    createGamesObject = () =>{
        //from state schedule object, create Game
        let games = []
        console.log(this.state.schedule)
        console.log(teams);
        let counter = 0;
        const team_names = teams;
        this.state.schedule.dates[0].games.forEach(ev => {
            counter++;
            let homeName = ev.teams.home.team.name;
            let awayName = ev.teams.away.team.name;
            let homeId = ev.teams.home.team.id;
            let awayId = ev.teams.away.team.id;
            let homeTeam = team_names[homeId - 1]
            let awayTeam = team_names[awayId - 1]
            let hLogo;
            let aLogo;
            if(homeTeam != null){
                hLogo = homeTeam.logo
            }
            if(awayTeam != null){
                aLogo = awayTeam.logo
            }
            let game = {
                gameId: counter,
                homeId: homeId,
                homeName: homeName,
                awayName: awayName,
                awayId: awayId,
                homeLogo: hLogo,
                awayLogo: aLogo
                // awayLogo: awayLogo        
            }
            games.push(game);
        })
        console.log(games)
        this.setState({games: games});
    }




    keyExtractor = (item) => item.gameId
  
    renderItem = ({ item }) => (
    <ListItem bottomDivider>
        <Avatar rounded source={{uri: item.homeLogo}} />
        <ListItem.Title>{item.homeName}</ListItem.Title>
        <ListItem.Subtitle>{'vs.'}</ListItem.Subtitle>
        <ListItem.Title>{item.awayName}</ListItem.Title>
        <Avatar rounded source={{uri: item.awayLogo}} />

        
    </ListItem>
    )
  
    render () {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.games}
        renderItem={this.renderItem}
      />
    )
  }


  }

