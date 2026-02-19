import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Lista from '../../components/Lista';

export default function TabOneScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', texto: 'Aprender React Native', concluida: false },
    { id: '3', texto: 'Criar meu app de tarefas', concluida: true },
  ]);

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t
    ));
  };

  return (
    <View style={styles.container}>
       <Lista 
        tarefas={tasks} 
        onDelete={handleRemoveTask} 
        onToggle={handleToggleTask} 
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  
});