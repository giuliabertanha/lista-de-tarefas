import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity,View, TextInput, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface NovoItemModalProps {
  visivel: boolean;
  aoSalvar: (texto: string, prazo: string) => void;
  aoCancelar: () => void;
}

export default function NovoItemModal({ visivel, aoSalvar, aoCancelar }: NovoItemModalProps) {
  const [textoInput, setTextoInput] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChange = (event: any, dataSelecionada?: Date) => {
    const prazo = dataSelecionada || date;
    setShowPicker(Platform.OS === 'ios'); 
    setDate(prazo);
  };

  const prazo = date.toLocaleDateString(); 

  const finalizar = () => {
    if (textoInput.trim() === '') {
      return;
    }
    aoSalvar(textoInput, prazo);
    setTextoInput('');  
    setDate(new Date());
  };

  const cancelar = () => {
    setTextoInput('');
    aoCancelar();
  };

  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalConteudo}>
          <Text style={styles.title}>Nova tarefa</Text>
          
          <TextInput 
            placeholder="Descrição"
            placeholderTextColor="#999"
            style={styles.input}
            value={textoInput}
            onChangeText={setTextoInput}
            autoFocus={true}
          />

          <TouchableOpacity onPress={showDatepicker}>
            <TextInput
              placeholder="Prazo"
              placeholderTextColor="#999"
              style={styles.input}
              value={prazo}
              editable={false}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
              onChange={onChange}
            />
          )}
          
          <TouchableOpacity style={styles.botaoSalvar} onPress={finalizar}>
            <Text style={{color: '#e6e9ef'}}>Adicionar </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cancelar}>
            <Text style={{color: 'red', marginTop: 10, textAlign: 'center'}}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  conteudo: { 
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignItems: 'center' 
  },
  modalConteudo: { 
    marginTop: "50%",
    width: '85%', 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  input: { 
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 5,
    padding: 12, 
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  botaoSalvar: { 
    backgroundColor: '#4384e4', 
    padding: 12, 
    alignItems: 'center', 
    borderRadius: 5 
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  }
});
