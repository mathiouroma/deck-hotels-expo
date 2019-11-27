import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Card } from 'react-native-elements';

import Deck from './src/Deck';


interface IProps {

}

interface IState {
  textReviele: boolean;

}


const DATA = [
  { id: 1, text: 'Hotel Paradise Resort', des: 'The Hotel Paradise Resort is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/vLPFVND/hotel1.jpg' },
  { id: 2, text: 'Hotel Mercury', des: 'The Hotel Mercury is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/LgpvDVY/hotel2.png' },
  { id: 3, text: 'Hotel Sun', des: 'The Hotel Sun is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/7nZvsn9/hotel3.png' },
  { id: 4, text: 'Hotel Unique Summer', des: 'The Unique Summer is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/qs7QtLb/hotel4.jpg' },
  { id: 5, text: 'Hotel Aegean', des: 'The Hotel Aegean is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/CbjVCvw/hotel5.jpg' },
  { id: 6, text: 'Hotel Mare Resort', des: 'The Hotel Mare Resort is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/6ZFbpvg/hotel6.jpg' },
  { id: 7, text: 'Hotel King Crete', des: 'The Hotel King Crete is the right choice for visitors who are searching for a combination of charm, peace and quiet, and a convenient position from which to explore Venice. It is a small, comfortable hotel, situated on the Canale di Cannaregio. The Derai family and their staff offer an attentive, personalized service and are always available to offer any help to guests.The hotel is arranged on three floors, without a lift.', uri: 'https://i.ibb.co/LpdBxV4/hotel7.jpg' },
];


export class App extends React.Component<IProps, IState> {
  // class App extends React.Component {



  constructor(props: IProps) {
    // constructor(props) {

    super(props);

    this.state = {
      textReviele: false
    }

  }

  showDescription = () => {

    this.setState({
      textReviele: !this.state.textReviele
    })

  }

  renderCard = (item: any) => {
    // renderCard = (item) => {
    let { textReviele } = this.state
    return (
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{ marginBottom: 10, textAlign: 'center' }}>
          Learn more about this Hotel
        </Text>
        <Button
          onPress={this.showDescription}
          // icon={{ name: 'info' }}
          // backgroundColor="#03A9F4"
          title="Read more..."
        />
        {textReviele ?
          <React.Fragment>
            <Text style={{ marginTop: 5 }}>{item.des}</Text>
            <Text style={{ marginTop: 5 }}>{item.des}</Text>
          </React.Fragment>
          :
          null
        }
      </Card>
    );
  }



  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default App;