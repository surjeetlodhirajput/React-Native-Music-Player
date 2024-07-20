import {View,TouchableOpacity, StyleSheet,Dimensions, Image, Text} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function SmallPlayAndStop({setIsSmallWidget ,isMusicPaused,metadata, onClick}){
    const imageUrl = `data:image/png;base64,${metadata.thumb}`;
      return (<TouchableOpacity onPress={_=>{setIsSmallWidget(false);}} style={MusicComponentStyle.Container}>
          <Image source={{uri: imageUrl}} style={MusicComponentStyle.ImageSection}/>
          <View style={MusicComponentStyle.TextContainer}>
          <Text numberOfLines={2} style={MusicComponentStyle.TextContainer}>{metadata.title} - {metadata.artist}</Text>
          {/* <Text style={MusicComponentStyle.TextContainer}>{metadata.title}</Text> */}
          </View>
          <TouchableOpacity style={{...MusicComponentStyle.playAndPause}} onPress={()=>{
                onClick();
              }}>
              <Image style={{...MusicComponentStyle.Buttons,marginLeft:55}} source={!isMusicPaused ? require('../Images/pause.png') : require('../Images/play.png')}/>
              </TouchableOpacity>
            </TouchableOpacity>)
  }
  
  const MusicComponentStyle = StyleSheet.create({
  Container:{
   display:'flex',
   position:'absolute',
   flexDirection:'row',
   borderWidth: 3,
   borderColor: '#e3e3e3',
   borderRadius:5,
   height:100,
   width:width,
   backgroundColor:'#d1d1d1',
   bottom:18
  },
  TextContainer:{
  padding: 10,
  flexDirection:'column',
  flex:3,
  color:'#000',
  textAlign:'left',
  fontSize:17,
  fontWeight:'bold'
  },
  TextSection:{
    fontSize:20,
    textAlign:'center',
  },
  ImageSection:{
      width: 50,
      height: 'auto',
      padding: 10,
      borderRadius:3,
      flex:1
  }, 
  Buttons:{
    height:50,
    width:50,
},
playAndPause:{
    padding:20
}
  })