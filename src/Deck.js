import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Dimensions, Button } from 'react-native';
import { Card } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { }
    }


    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                //  console.log(gesture)
                position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    // console.log('swipe right')
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    // console.log('swipe left')
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }

            }
        });
        this.state = {
            panResponder,
            position,
            index: 0,
            selected: 0,
            unselected: 0,
            selectedText: false,
            unselectedText: false
        }

    }

    forceSwipe(direction) {
        //Timing is for linear feeling while spring is for more bouncing feeling
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index]

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 })
        this.setState({ index: this.state.index + 1 })
        if (direction === 'right') {
            this.setState({ selected: this.state.selected + 1 })
            // console.log(this.state.selected)
        }
        if (direction === 'left') {
            this.setState({ unselected: this.state.unselected + 1 })
            // console.log(this.state.unselected)
        }
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {

        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        return {
            ...position.getLayout(),
            //Rotate
            transform: [{ rotate }]
        }

    }

    selectedText = () => {
        this.setState({
            selectedText: true
        })
    }

    unselectedText = () => {
        this.setState({
            unselectedText: true
        })
    }

    renderNoMoreCards() {
        return (
            <React.Fragment>
                <Card title="All Done">
                    <Text style={{ marginBottom: 10, textAlign: 'center' }}>
                        There are no more Hotels found!
            </Text>
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            onPress={this.selectedText}
                            backgroundColor="#03A9F4"
                            color="green"
                            title="Selected Hotels!"
                        />
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Button
                            onPress={this.unselectedText}
                            backgroundColor="#03A9F4"
                            color="red"
                            title="Unselected Hotels!"
                        />
                    </View>
                    <View style={{ marginBottom: 5 }}>
                        <Button
                            disabled
                            backgroundColor="#03A9F4"
                            title="Get More!"
                        />
                    </View>
                </Card>
                {this.state.selectedText ? <Text style={{ color: 'green', textAlign: 'center', marginTop: 10 }}>Hotels Selected: {this.state.selected}</Text> : null}
                {this.state.unselectedText ? <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>Hotels Unselected: {this.state.unselected}</Text> : null}
            </React.Fragment>
        )
    }

    renderCards() {

        if (this.state.index >= this.props.data.length) {
            return this.renderNoMoreCards();
        }

        return this.props.data.map((item, idx) => {
            if (idx < this.state.index) {
                return null
            }
            if (idx == this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyleActive]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            } else {
                return (
                    <View key={item.id} style={styles.cardStyle}>
                        {this.props.renderCard(item)}
                    </View>
                )
            }
        });
    }

    render() {
        return (
            <View style={{ marginTop: 15 }} >
                {this.renderCards()}
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        // position: 'absolute',
        // left: 0,
        // right: 0
        width: SCREEN_WIDTH
    },
    cardStyleActive: {
        // position: 'absolute',
        // left: 0,
        // right: 0
        width: SCREEN_WIDTH,
        marginBottom: 4
    },
}

export default Deck;