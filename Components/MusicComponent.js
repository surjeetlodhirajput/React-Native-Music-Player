import {View,TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
export default function MusicComponent({metadata, onClick}){
    const imageUrl = `data:image/png;base64,${metadata.thumb}`;
      return (<TouchableOpacity onPress={onClick} style={MusicComponentStyle.Container}>
          <Image source={{uri: imageUrl}} style={MusicComponentStyle.ImageSection}/>
          <View style={MusicComponentStyle.TextContainer}>
          <Text numberOfLines={2} style={MusicComponentStyle.TextContainer}>{metadata.title} - {metadata.artist}</Text>
          </View>
            </TouchableOpacity>)
  }
  
  const MusicComponentStyle = StyleSheet.create({
  Container:{
   display:'flex',
   flexDirection:'row',
   borderWidth: 3,
   borderColor: '#e3e3e3',
   borderRadius:4,
   height:80,
   backgroundColor:'#fff',
   marginTop:2
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
  }
  })