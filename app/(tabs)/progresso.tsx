import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 

interface Task {
  id: string;
  texto: string;
  concluida: boolean;
}

export default function SeuProgresso() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const isFocused = useIsFocused(); 

  useEffect(() => {
    if (isFocused) {
      carregarDados();
    }
  }, [isFocused]);

  const carregarDados = async () => {
    try {
      const valor = await AsyncStorage.getItem('@minhas_tarefas');
      if (valor !== null) {
        setTasks(JSON.parse(valor));
      }
    } catch (e) {
      console.error("Erro ao carregar para estatísticas", e);
    }
  };

  const total = tasks.length;
  const concluidas = tasks.filter(t => t.concluida).length;
  const pendentes = total - concluidas;
  const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.numero}>{porcentagem}%</Text>
        <Text style={styles.label}>Tarefas Concluídas </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.cardPequeno, { backgroundColor: '#4CAF50' }]}>
          <Text style={styles.numeroPequeno}>{concluidas}</Text>
          <Text style={styles.labelPequena}>Concluídas </Text>
        </View>

        <View style={[styles.cardPequeno, { backgroundColor: '#FF5252' }]}>
          <Text style={styles.numeroPequeno}>{pendentes}</Text>
          <Text style={styles.labelPequena}>Pendentes </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#181818',
    width: '100%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  numero: {
    fontSize: 48,
    color: '#3368B9',
    fontWeight: 'bold',
  },
  label: {
    color: '#aaa',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardPequeno: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  numeroPequeno: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  labelPequena: {
    color: '#fff',
    opacity: 0.8,
  },
});