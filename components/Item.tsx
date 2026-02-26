import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ItemProps {
  data: {
    id: string;
    texto: string;
    prazo: string;
    concluida: boolean;
  };
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function Item({ data, onDelete, onToggle }: ItemProps) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const [dia, mes, ano] = data.prazo.split('/');
  const prazo = new Date(`${ano}-${mes}-${dia}T12:00:00`);
  prazo.setHours(0, 0, 0, 0);

  //console.log(`Texto: ${data.texto} | Prazo: ${prazo} | Prazo: ${hoje}`);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.taskArea} 
        onPress={() => onToggle(data.id)}
        activeOpacity={0.7}
      >
        <Ionicons 
          name={data.concluida ? "checkbox" : "square-outline"} 
          size={24} 
          color={data.concluida ? "#4CAF50" : "#666"} 
        />
        <Text style={[
          styles.text, 
          data.concluida && styles.textConcluido
        ]}>
          {data.texto}
        </Text>
        <Text style={[
          styles.text, 
          data.concluida && styles.textConcluido,
          {marginRight: -40},
          prazo < hoje && !data.concluida && styles.atrasado
        ]}>
          {data.prazo}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(data.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20, 
    width: '68%',  
    borderWidth: 1,
    borderColor: '#333',
  },
  taskArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
    marginRight: 10, 
  },
  text: {
    fontSize: 16,
    color: '#bcbcbc',
    marginLeft: 10,
    flex: 1,
  },
  textConcluido: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0',
  },
  atrasado: {
    color: '#FF5252',
  }
});