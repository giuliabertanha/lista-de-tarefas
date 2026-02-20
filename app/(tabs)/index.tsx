import { StyleSheet } from 'react-native';
import React, {useState} from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Lista from '../../components/Lista';
import Botoes from '../../components/Botoes';
import NovoItemModal from '../../components/ModalNovoItem';

interface Task {
  id: string;
  texto: string;
  concluida: boolean;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTask = (textoDaTarefa: string) => {
    const novaTarefa = {
      id: Math.random().toString(),
      texto: textoDaTarefa,
      concluida: false,
    };
    setTasks([...tasks, novaTarefa]);
    setModalVisible(false); 
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

      <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
        <Botoes onPress={() => setModalVisible(true)} />
      </View>

      <NovoItemModal 
        visivel={modalVisible} 
        aoSalvar={handleAddTask} 
        aoCancelar={() => setModalVisible(false)} 
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
  }
});