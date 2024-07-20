import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import TrackPlayer from 'react-native-track-player';
let timer;
const CustomSlider = ({ value,Width, isMusicPaused, setIsMusiPaused, minimumValue, maximumValue, onChange }) => {
  
  const [elapsedTime,setElapsedTime] = React.useState({position:0, duration:Width});
  const [position, setPosition] = useState(0); // Calculate initial position
  React.useEffect(()=>{
    if(timer)clearInterval(timer);
    timer = setInterval(async()=>{
        let positionObject = await TrackPlayer.getProgress();
        console.log(positionObject)
        setElapsedTime(positionObject);
    },1000);
    ()=>{clearInterval(timer);}
},[])
const panResponder = React.useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt) => handleSlide(evt),
    onPanResponderRelease: (evt) => handleSlide(evt)
  })
).current;
React.useEffect(()=>{
  setPosition(((elapsedTime.position) / (elapsedTime.duration)));
},[elapsedTime])
  const handleSlide = (event) => {
    TrackPlayer.pause();
    const newPosition = (event.nativeEvent.locationX / (Width - 80));
    let seekBy = (newPosition * elapsedTime.duration);
    console.log(newPosition,elapsedTime.duration ,seekBy, event.nativeEvent.locationX);
    setPosition(newPosition);
    onChange(seekBy/2); 
    TrackPlayer.play();// Update parent component
    setIsMusiPaused(false);
    progress = Math.min(Math.max(newPosition, 0), 1);
  };
  let progress = Math.min(Math.max(position, 0), 1); // Ensure progress stays within bounds

  return (
    <View style={{...styles.sliderContainer, width: (Width-80)}} {...panResponder.panHandlers}>
      <View style={{ width: (progress * (Width-80)),height:10, backgroundColor: 'blue' }} />
      <TouchableOpacity style={{...styles.sliderTouch, marginLeft:(progress*(Width-80))}} onPress={()=>{}}>
        {/* Optional visual indicator for slider */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    borderRadius:5,
    borderWidth:2,
    borderColor:'orange',
    marginLeft:-30,
    marginTop:30
  },
  sliderTouch: {
    flex: 1,
    borderWidth:2,
    borderColor:'pink',
    height:20,
    width:20,
    borderRadius:10,
    backgroundColor:'pink',
    position: 'absolute',
  },
});

export default CustomSlider;