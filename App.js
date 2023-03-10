import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, Text, View, SafeAreaView, FlatList, Modal, Pressable } from 'react-native';

const monedas = () => {

    const [textoItem, setItemText] = useState('');
    const [lista, setItems] = useState([]);

    const onChangeText = (text) => {
      setItemText(text);
    }

    const addItem = () => {
      setItems((oldArray) => [...oldArray, {id: Date.now(), value: textoItem}]);
      setItemText('');
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const removeItem = (id) => {
      setItems((oldArray) => oldArray.filter((item) => item.id!== id));
      setModalVisible(!modalVisible);
      setSelectedItem(null);
    }

    const selectItem = (item) => {
      setSelectedItem(item);
      setModalVisible(true);
    }

    return (
      <SafeAreaView style={styles.containerGeneral}>
        <View>
          <TextInput
            placeholder='Introduzca un nuevo item'
            style={styles.inputLista}
            onChangeText={onChangeText}
            value={textoItem}
          />
          <Button
            title='Agregar'
            onPress={addItem}
          />
        </View>
        <FlatList
          style={styles.lista}
          data={lista}
          renderItem={(itemData) => { 
            return(
              <Pressable style={styles.contentlista} onPress={()=> {
                selectItem(itemData.item);
                setModalVisible(true);
              }}>
                <Text style={styles.textoItem}> { itemData.item.value } </Text>
              </Pressable>
            );
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.containerModal}>
            <View style={styles.tituloModal}>
              <Text>Eliminar item</Text>
            </View>
            <View style={styles.contenidoModal}>
              <Text>??Est?? seguro que quiere eliminar el ??tem {selectedItem?.value}?</Text>
            </View>
            <View style={styles.botonesModal}>
              <Button title='Cancelar' onPress={()=>{
                setModalVisible(false)
                setSelectedItem(null);
              }}/>
              <Button title='Eliminar' onPress={()=> {
                removeItem(selectedItem.id)
              }} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

  containerGeneral: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 40,
    marginTop: 35,
  },

  lista: {
    flex: 1,
  },

  containerModal: {
    height: 300,
    width: 100,
    alignSelf: 'center',
  },

});

export default monedas;