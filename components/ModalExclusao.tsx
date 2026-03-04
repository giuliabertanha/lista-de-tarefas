import React from 'react';
import { Modal, Text, TouchableOpacity,View, TextInput, StyleSheet } from 'react-native';

interface ModalExclusaoProps {
  visivel: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export default function ModalExclusao({ visivel, onDelete, onCancel }: ModalExclusaoProps) {
  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalConteudo}>
          <Text style={styles.title}>Deseja excluir essa tarefa?</Text>
          
          <TouchableOpacity style={[styles.botao, styles.excluir]} onPress={onDelete}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Excluir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, styles.voltar]} onPress={onCancel}>
            <Text>Voltar</Text>
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
  botao: {  
    padding: 12, 
    alignItems: 'center', 
    borderRadius: 5,
    marginTop: 10,
  },
  excluir: {
    backgroundColor: '#FF5252',
  },
  voltar: {
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  }
});
