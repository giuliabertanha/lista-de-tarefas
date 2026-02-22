import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity,View, TextInput, StyleSheet } from 'react-native';

interface NovoItemModalProps {
  visivel: boolean;
  aoSalvar: (texto: string) => void;
  aoCancelar: () => void;
}

export default function NovoItemModal({ visivel, aoSalvar, aoCancelar }: NovoItemModalProps) {
  const [textoInput, setTextoInput] = useState('');

  const finalizar = () => {
    aoSalvar(textoInput);
    setTextoInput('');  
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
            style={styles.input}
            value={textoInput}
            onChangeText={setTextoInput}
            autoFocus={true}
          />
          
          <TouchableOpacity style={styles.botaoSalvar} onPress={finalizar}>
            <Text style={{color: '#d7e3f4'}}>Adicionar </Text>
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
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12, 
    marginBottom: 20,
    fontSize: 16
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
