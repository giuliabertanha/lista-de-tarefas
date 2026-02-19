import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ItemProps {
  data: {
    id: string;
    texto: string;
    concluida: boolean;
  };
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function Item({ data, onDelete, onToggle }: ItemProps) {
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
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(data.id)}>
        <Ionicons name="trash-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 20, 
    width: '68%',  
  },
  taskArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
    marginRight: 10, 
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  textConcluido: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0',
  }
});