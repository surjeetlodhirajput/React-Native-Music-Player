
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import {  PERMISSIONS } from 'react-native-permissions';
import getAllMusicFileData from './Utility/SongUtiltiy';
import MusicComponent from './Components/MusicComponent';
import TrackPlayer, { AppKilledPlaybackBehavior } from 'react-native-track-player';
import PlayAndPause from './Components/PlayAndPause';
import SmallPlayAndStop from './Components/SmallPlayAndStop';
let stateInit = false;
const {width, height} = Dimensions.get('window');
function App(){
  const currentTheme =  useColorScheme();
  const [permisionAllowed, setFileAccessAllowed] = useState('');
  const [musicFiles, setMusicFiles] = useState([]);
  const [allMusicFiler, setAllMusicFiler] = useState([]);
  const [playingMusicIndex, setPlayingMusicIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
const [isShowSmalllWidget, setIsSmallWidget] = useState(false);
  const [isMusicPaused, setIsMusiPaused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const createTrackObject = (index)=>{
    return {
      id: index,
      url: musicFiles[index].path,
      title: musicFiles[index].metadata.title,
      artist: musicFiles[index].metadata.artist,
      artwork: `data:image/png;base64,${musicFiles[index].metadata.thumb}`
  };
  }
  async function handleMusicFileClick(index){
    try{
      if(index == playingMusicIndex){
        if(isMusicPlaying){
          pauseSelectedMusic();
          setIsMusiPaused(true);
        }
        else{
          playSelectedMusicFile();
          setIsMusiPaused(false);
        }
        return;
      }
      if(isMusicPlaying){
        await TrackPlayer.reset();
      }
      await TrackPlayer.add(createTrackObject(index));
      setPlayingMusicIndex(index);
      await playSelectedMusicFile();
      setIsMusicPlaying(true);
      setIsMusiPaused(false);

    }
    catch(err){
      console.error(err);
    }
  }
  const playSelectedMusicFile = async()=>{
    setIsMusicPlaying(true);
    await TrackPlayer.play();
  }
  const pauseSelectedMusic = async()=>{
    setIsMusicPlaying(false);
    await TrackPlayer.pause();
  }
  const playNextMusicFile = (currentIndex)=>{
    console.log('previous next')
    handleMusicFileClick((currentIndex + 1) % musicFiles.length);
  }
  const playPreviousMusicFIle = (currentIndex)=>{
    console.log('previous')
    
    handleMusicFileClick(((currentIndex - 1) < 0 ? musicFiles.length - 1 : (currentIndex - 1)));
  }
  const forwardMusic = (position)=>{
    TrackPlayer.seekTo(position);
  }
  const clearMusicAndStopPlayer = async ()=>{
    await TrackPlayer.stop();
    await TrackPlayer.remove(0);
    await TrackPlayer
    .reset();
    setIsMusiPaused(false);
    setIsMusicPlaying(false);
    setPlayingMusicIndex(-1);
  }
  TrackPlayer.addEventListener('')
  React.useEffect(()=>{
    TrackPlayer.setupPlayer().then(_=>_).catch(console.error);
  if(!stateInit){
    TrackPlayer.updateOptions({
    android: AppKilledPlaybackBehavior.ContinuePlayback
  }).then(_=>_).catch(console.error)
    stateInit = true;
  }
    PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, {
      title:'Storage Permission',
      message:'Allow Permission to acess Photo, media and files on your device'
    }).then(permision=>{
      setFileAccessAllowed(permision)
        if(permision == 'granted'){
          setFileAccessAllowed(permision);
          getAllMusicFileData
           ().then(async data=>{console.log(data); setMusicFiles(data);
          setAllMusicFiler(data)})
          .catch(console.error)
        }
    }).catch(err=>{
      setFileAccessAllowed(`deniedd ${err.message}`)
    })
    return ()=>{TrackPlayer.reset()}
},[])
  useEffect(()=>{
    if(inputValue?.length > 0){
        setMusicFiles(allMusicFiler.filter
        (x=>x.metadata.artist.includes(inputValue)));
    }
    else if(musicFiles.length != allMusicFiler.length){
        setMusicFiles(allMusicFiler);
    }
  },[inputValue])
  return(<View style={(currentTheme == 'light' ? themeStyleSheet.lightTheme : themeStyleSheet.darkTheme)}>
    <TextInput
        placeholder="Filter Songs"
        onChangeText={_=>setInputValue(_)}
        value={inputValue}
        style={{
          height: 40,
          borderColor: '#cfcfcf',
          borderWidth:2,
          marginBottom: 5,
          paddingHorizontal: 10,
          marginTop:5
        }}
      />
    <ScrollView>
      {musicFiles?.length > 0  && musicFiles?.map((ffile, index)=> 
      <MusicComponent onClick={()=>handleMusicFileClick(index)} metadata={ffile.metadata} name={ffile.metadata.title} key={index} />
      )}
    </ScrollView>
    {(!isShowSmalllWidget && (isMusicPlaying || isMusicPaused)) && <PlayAndPause setIsSmallWidget={setIsSmallWidget} clearMusicAndStopPlayer={clearMusicAndStopPlayer} isMusicPaused={isMusicPaused}  setIsMusiPaused={setIsMusiPaused} playNext={playNextMusicFile} handleMusicFileClick={handleMusicFileClick} currentIndex={playingMusicIndex} moveForwardOrBack={forwardMusic} playPrevious={playPreviousMusicFIle} isMusicPlaying={isMusicPlaying} musicData={musicFiles[playingMusicIndex]} TrackPlayer={TrackPlayer} />}
    {isShowSmalllWidget && <SmallPlayAndStop isMusicPaused={isMusicPaused} setIsSmallWidget={setIsSmallWidget}  onClick={_=>{
      setIsMusiPaused(!isMusicPaused);
      handleMusicFileClick(playingMusicIndex);
    }} metadata={musicFiles[playingMusicIndex].metadata} />}
  </View>)
}

const themeStyleSheet = StyleSheet.create({
  darkTheme:{
    background:'#000',
    primary:'#fff',
    opacity:1
  },
  lightTheme:{
    background:'#fff',
    primary:'#000',
    opacity:1,
    height:height-9
  }
})
export default App;
