import { StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import { View } from '../../components/Themed';
import Lista from '../../components/Lista';
import Botoes from '../../components/Botoes';
import NovoItemModal from '../../components/ModalNovoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  texto: string;
  prazo: string;
  concluida: boolean;
}

export default function TabOneScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        const valor = await AsyncStorage.getItem('@minhas_tarefas');
        if (valor !== null) {
          setTasks(JSON.parse(valor));
        }
      } catch (e) {
        console.error("Erro ao carregar tarefas", e);
      } finally {
        setIsLoaded(true);
      }
    };

    carregarTarefas();
  }, []);

  // Salva as mudanças automaticamente após o carregamento inicial
  useEffect(() => {
    if (isLoaded) {
      salvarNoDispositivo(tasks);
    }
  }, [tasks, isLoaded]);

  const handleAddTask = (textoDaTarefa: string, prazo: string) => {
    const novaTarefa = {
      id: Math.random().toString(),
      texto: textoDaTarefa,
      prazo: prazo,
      concluida: false,
    };
    setTasks([...tasks, novaTarefa]);
    setModalVisible(false); 
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, concluida: !t.concluida } : t // Se for o mesmo id, inverte o valor de 'concluida'
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

const salvarNoDispositivo = async (tarefasAtualizadas: Task[]) => {
  try {
    const jsonValue = JSON.stringify(tarefasAtualizadas);
    await AsyncStorage.setItem('@minhas_tarefas', jsonValue);
    console.log("Dados salvos com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar no AsyncStorage", e);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
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