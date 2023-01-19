import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity, Image, Modal, Linking, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 

 
type ItemData = {
  id: string;
  name: string;
  service: string;
  seasons: string;
  rated: string;
  imdb: string;
  show_url: string;
  images: string;
};

type ItemProps = {
  item: ItemData;
  
};


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [data, setData] = useState([] as any[]);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedName, setSelectedName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);

 
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedSeasons, setSelectedSeasons] = useState<string>();
  const [selectedRated, setSelectedRated] = useState<string>();
  const [selectedImdb, setSelectedImdb] = useState<string>();
  const [selectedtvShowUrl, setSelectedtvShowUrl] = useState<string>();

  useEffect(() => {
    fetch('https://www.nolansapps.com/w2wapp/w2w_tvshows.php')
      .then(response => response.json())
      .then(data =>    { 
        setData(data);
        setLoading(false);
         
      })  
      .catch(error => console.log(error));
  }, []);

  const myKeyExtractor = (item: ItemData) => {
    return item.id
  }

  const ItemView = ({item}: {item: ItemData}) => {
    return (
      // FlatList Item
      <View>
   
      <Pressable onPress={() => getItem(item)}>
        
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'http://www.nolansapps.com/images/tvshows/'+ item.id +'/'+ item.id +'.jpg',
        }}
      />
          
      </Pressable>

        
      </View>
    );
  };
  const getItem = (item: ItemData) => {
    //Function for click on an item
  //  alert('Id: ' + item.id + ' Value: ' + item.name);
    setSelectedId(item.id);
    setSelectedName(item.name); 
    setSelectedService(item.service); 
    setSelectedSeasons(item.seasons);
    setSelectedRated(item.rated); 
    setSelectedImdb(item.imdb);
    setSelectedtvShowUrl(item.show_url);

console.log(item.service)
    setModalVisible(true)
  };

 // const renderItem = ({item}: {item: ItemData}) => {
  const renderItem = ({item}: {item: ItemData}) => {
    return <View><Text>{item.name}</Text></View>
  }
  

  return (

    
    <View style={styles.container}>
   
 
<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
      
        <View style={styles.centeredView}    >  
       
        <TouchableOpacity  onPress={()=> {
    
    setModalVisible(!modalVisible)
    }
  }>
    
          <View style={styles.modalView }>
          {/* Here is the View for the Modal */}
      
          <Image
        style={styles.modalLogo}
        source={{
          uri: 'http://www.nolansapps.com/images/tvshows/'+selectedId+'/'+selectedId+'.jpg' 
        }}
      /> 
              <Text style={styles.modalText}>{selectedName}</Text>
            <Text style={styles.modalText}>Seasons: {selectedSeasons}</Text>  
            <Text style={styles.modalText}>Rated: {selectedRated}</Text>  
            <Text style={styles.modalText}>IMDb: {selectedImdb}</Text>  
            <Text style={styles.serviceText}>Available On </Text>  
    
 
 
    <Pressable style={styles.servicePressable} 
     onPress={() => { 
    console.log(selectedtvShowUrl);
     Linking.openURL(''+selectedtvShowUrl) ;
    
    }}>
  
             <Image style={styles.serviceLogo} 
            
           source={{
            uri: 'http://www.nolansapps.com/images/services/'+selectedService+'.png' 
          }}
             
             />
            
            </Pressable>
           
          </View>
          </TouchableOpacity>
        </View>
        
        
      </Modal>


   <FlatList style={styles.listStyle} 
        data={data.sort((a, b) => a.id - b.id)}
     
        renderItem={ItemView}
        keyExtractor={myKeyExtractor}
        extraData={selectedId}
      />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },


  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
     
    marginVertical: 8,
   
  },
  tinyLogo: {
    width: windowWidth,
    height: 128,
   
    marginVertical: 2,
    
  },

  listStyle: { 
    width: windowWidth,
    height: 128,
     
    
    
  },
  
  
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
   
  modalLogo: {
    width: 360,
    height: 128,
     
    borderRadius: 10,

  },

 serviceLogo: {
    width: 65,
    height: 65,
    top: -75,
    left: 230,
  },

  servicePressable: {
    width: 65,
    height: 65,
    
  },

  serviceText: {
    top: -75,
    marginBottom: 2,
    textAlign: 'left',
    left: 220,  
    fontSize: 15,  
     color: 'black',
  },
  modalText: {
    top: 5,
    marginBottom: 2,
    textAlign: 'left',
    fontSize: 15,
    left: 15,
    color: 'black',
  },

  

  service: {
    fontSize: 10,
  },
  seasons: {
    fontSize: 10,
  },

 

centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
 
   
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  height: 240,
  opacity: 1,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},


button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#2196F3',
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
blurredView: {
  // For me android blur did not work until applying a background color:
  backgroundColor: 'white',
},
});
