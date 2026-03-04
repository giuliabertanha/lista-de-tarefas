import { StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import { View } from '../../components/Themed';
import Lista from '../../components/Lista';
import Botoes from '../../components/Botoes';
import NovoItemModal from '../../components/ModalNovoItem';
import ModalExclusao from '../../components/ModalExclusao';
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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleOpenDeleteModal = (id: string) => {
    setTaskToDelete(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      setTaskToDelete(null);
      setDeleteModalVisible(false);
    }
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

  const handleEditTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingTask(task);
      setModalVisible(true);
    } 
  };

  const handleSaveTask  = (textoDaTarefa: string, prazo: string) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => 
        t.id === editingTask.id ? { ...t, texto: textoDaTarefa, prazo } : t
      ));
      setEditingTask(null);
    } else {
      const novaTarefa = {
        id: Math.random().toString(),
        texto: textoDaTarefa,
        prazo: prazo,
        concluida: false,
      };
      setTasks([...tasks, novaTarefa]);
    }
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
        onDelete={handleOpenDeleteModal} 
        onToggle={handleToggleTask} 
        onEdit={handleEditTask}
      />

      <View style={{ width: '100%', alignItems: 'center', marginVertical: 20 }}>
        <Botoes onPress={() => {
          setEditingTask(null); 
          setModalVisible(true);
        }} />
      </View>

      <NovoItemModal 
        visivel={modalVisible} 
        tarefaEditar={editingTask}
        aoSalvar={handleSaveTask} 
        aoCancelar={() => {
          setEditingTask(null); 
          setModalVisible(false);
        }} 
      />

      <ModalExclusao
        visivel={deleteModalVisible}
        onDelete={handleConfirmDelete}
        onCancel={() => {
          setTaskToDelete(null);
          setDeleteModalVisible(false);
        }}
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