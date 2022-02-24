import * as React from 'react';
import { ListItem, Avatar } from 'react-native-elements'
import {FlatList, StyleSheet} from 'react-native'
import teams, {getTeamId} from '@nhl-api/teams'



const styles = StyleSheet.create({
    container: {
        paddingTop: 22
    },
    item:{
        //padding:10,
        fontSize: 19,
        height: 75
    },
    title: {
        paddingRight: 10,
        paddingLeft:10
    }
    
    
    
})

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
        let counter = 0;
        const team_names = teams;
        this.state.schedule.dates[0].games.forEach(ev => {
            counter++;
            let homeId = ev.teams.home.team.id;
            let awayId = ev.teams.away.team.id;
            let homeTeam = team_names[homeId - 1]
            let awayTeam = team_names[awayId - 1]
            let hLogo,aLogo, homeName, awayName;
            
            if(homeTeam != null){
                hLogo = homeTeam.logo
                homeName = homeTeam.abbreviation;
            }
            if(awayTeam != null){
                aLogo = awayTeam.logo
                awayName = awayTeam.abbreviation
            }
            let game = {
                gameId: counter,
                homeId: homeId,
                homeName: homeName,
                awayName: awayName,
                awayId: awayId,
                homeLogo: hLogo,
                awayLogo: aLogo,
                
                // awayLogo: awayLogo        
            }
            games.push(game);
        })
        console.log(games)
        this.setState({games: games});
    }




    keyExtractor = (item) => item.gameId
    
  
    navToChild(item){
        console.log(item)
    }
    //figure out start time later
    renderItem = ({ item }) => (
    <ListItem button onPress={() => this.navToChild(item)} style={styles.item} bottomDivider >
        <Avatar rounded source={{uri: item.awayLogo}} />
        <ListItem.Title style={styles.title}>{item.awayName}</ListItem.Title>
        <ListItem.Subtitle>{'at'}</ListItem.Subtitle>
        <ListItem.Title style={styles.title}>{item.homeName}</ListItem.Title>
        <Avatar rounded source={{uri: item.homeLogo}} />
        <ListItem.Subtitle>{'7:00PM'}</ListItem.Subtitle>
        <ListItem.Chevron></ListItem.Chevron>
        

        
    </ListItem>
    )
  
    render () {
    return (
      <FlatList style={styles.container}
        keyExtractor={this.keyExtractor}
        data={this.state.games}
        renderItem={this.renderItem}
      />
    )
  }


  }

