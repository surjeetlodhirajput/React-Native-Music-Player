import {TouchableOpacity,Dimensions,StyleSheet, View,Text, Image, PanResponder} from 'react-native';
import CustomSlider from './CustomSlider';
import React from 'react';
const {width, height} = Dimensions.get('window');
export default function PlayAndPause({setIsSmallWidget, clearMusicAndStopPlayer, isMusicPaused, setIsMusiPaused,moveForwardOrBack,handleMusicFileClick, isMusicPlaying, musicData, TrackPlayer, playNext, playPrevious, currentIndex}){
    const {metadata} = musicData;
    const [translationY, setTranslationY] = React.useState(0);
    const imageUrl = `data:image/png;base64,${metadata.thumb}`;
    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanMove: (event, gestureState) => {
              setTranslationY(gestureState.dy);
            },
            onPanResponderRelease: (event, gestureState) => {
              if (gestureState.dy > 100) {
                setIsSmallWidget(true);
              } else {
                setTranslationY(0);
              }
            },
        })
      ).current;
    
    return (<View style={[CardStyle.CardStyle,{ transform: [{ translateY: translationY }] }]} {...panResponder.panHandlers}>
            <TouchableOpacity onPress={clearMusicAndStopPlayer} style={CardStyle.CloseTextPositiom}><Text style={CardStyle.CloseText}>X</Text></TouchableOpacity>
              <Image source={{uri: imageUrl}} style={CardStyle.ImageSection}/>
              <View style={CardStyle.controls}>
            <TouchableOpacity onPress={_=>playPrevious(currentIndex)}>
              <Image style={{height:55,width:55}} source={require('../Images/rewind.png')}  />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                setIsMusiPaused(!isMusicPaused);
                handleMusicFileClick(currentIndex);
              }}>
              <Image style={{...CardStyle.Buttons,marginLeft:55}} source={!isMusicPaused ? require('../Images/pause.png') : require('../Images/play.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={_=>playNext(currentIndex)}>
              <Image style={{...CardStyle.Buttons, marginLeft:60}} source={require('../Images/playb.png')}/>
              </TouchableOpacity>
              </View>
              <CustomSlider Width={width} isMusicPaused={isMusicPaused}  setIsMusiPaused={setIsMusiPaused} minimumValue={0} maximumValue={100}  value={100}  onChange={moveForwardOrBack} />
            </View>)
}

const CardStyle = StyleSheet.create({
    controls:{
        display:'flex',
        flexDirection:'row',
        marginTop:200,
        borderWidth:2,
        borderColor:'yellow',
        marginLeft:-40
    },
    CardStyle:{
        opacity:3,
        position:'absolute',
        width:width,
        height:height-40,
        borderColor:'blue',
        borderWidth:1,
        top:40,
        paddingLeft:width/13,
        paddingTop:150,
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'white'

    },
    ImageSection:{
        width:width/2+50,
        height:width/2+50,
        padding:40,
        borderRadius:100,
        borderWidth: 30,   // Right border width
        borderColor:'pink'
    },
    Buttons:{
        height:50,
        width:50,
    },
    CloseTextPositiom:{
        position:'absolute',
        right:15,
        top:5
    },
    CloseText:{
        fontSize:35,
        fontWeight:'bold',
        color:'#000'
    }
});