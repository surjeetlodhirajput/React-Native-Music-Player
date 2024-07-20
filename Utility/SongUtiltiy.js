import RNFS from 'react-native-fs';
import rnMediaMeta from 'rn-media-meta';
async function getAllMusicFilePathData(){
    try {
       return await getAllDataOfDir(RNFS.ExternalStorageDirectoryPath);
      } catch (error) {
        console.error('Error reading music files:', error);
        return [];
      }
}
async function getAllDataOfDir(musicDir){
  let files, musicFiles, dirs_;
    try {
        if(!musicDir || typeof musicDir === 'undefined' || typeof musicDir != 'string' && typeof musicDir.path === 'undefined'){
          return [];
        }
        // console.log(musicDir);
        files = await RNFS.readDir(typeof musicDir == 'string' ? musicDir : musicDir.path);
        if(!files || typeof files === 'undefined'){
          return [];
        }
         musicFiles = typeof files !== 'undefined' && files?.filter(file => file?.isFile() && file.name.endsWith('.mp3')) || [];
         dirs_ = typeof files !== 'undefined' ? files.filter(file=>file.isDirectory()) : [];
        let response = [];
        if( dirs_ && dirs_.length > 0){
          let _promiser = await Promise.all(dirs_.map( x=>  getAllDataOfDir(x)))
          response = _promiser.flat(Infinity); // flatten the array of array
        }
        else{
          return [...musicFiles];
        }
        return [...musicFiles, ...response];
      } catch (error) {
        return [];
      }
}

export default async function getAllMusicFileData (){
 const filedatta = await getAllMusicFilePathData();
  let newFileData = await filedatta?.map(async file=>{
  const metadata = await rnMediaMeta.get(file.path) ?? [];
  return metadata ? {...file, metadata:metadata} : {...file}});
 return await Promise.all(newFileData);
}