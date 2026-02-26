import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 

interface Task {
  id: string;
  texto: string;
  prazo: string;
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

  const { porcentagem, concluidas, pendentes, atrasadas, paraHoje } = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const hojeTimestamp = hoje.getTime();

    const total = tasks.length;
    if (total === 0) {
      return { porcentagem: 0, concluidas: 0, pendentes: 0, atrasadas: 0, paraHoje: 0 };
    }

    const concluidasCount = tasks.filter(t => t.concluida).length;

    const stats = tasks.reduce((acc, task) => {
      if (!task.concluida) {
        const [dia, mes, ano] = task.prazo.split('/');
        const prazo = new Date(Number(ano), Number(mes) - 1, Number(dia));
        const prazoTimestamp = prazo.getTime();

        if (prazoTimestamp < hojeTimestamp) {
          acc.atrasadas++;
        } else if (prazoTimestamp === hojeTimestamp) {
          acc.paraHoje++;
        }
      }
      return acc;
    }, { atrasadas: 0, paraHoje: 0 });

    return {
      porcentagem: Math.round((concluidasCount / total) * 100),
      concluidas: concluidasCount,
      pendentes: total - concluidasCount,
      atrasadas: stats.atrasadas,
      paraHoje: stats.paraHoje,
    };
  }, [tasks]);

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.numero}>{porcentagem}%</Text>
        <Text style={styles.label}>Tarefas Concluídas </Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.cardPequeno, { backgroundColor: '#2a962d' }]}>
          <Text style={styles.numeroPequeno}>{concluidas}</Text>
          <Text style={styles.labelPequena}>Concluídas </Text>
        </View>

        <View style={[styles.cardPequeno, { backgroundColor: '#aa1414' }]}>
          <Text style={styles.numeroPequeno}>{pendentes}</Text>
          <Text style={styles.labelPequena}>Pendentes </Text>
        </View>
      </View>

      <View style={[styles.card, { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }]}>
          <Text style={[
            styles.numeroPequeno,
            atrasadas > 0 && styles.atrasadas
          ]}>{atrasadas}</Text>
          <Text style={[styles.label, { marginLeft: 15, color: '#bdbdbd'}]}>Atrasadas </Text>
        </View>

        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }]}>
          <Text style={styles.numeroPequeno}>{paraHoje}</Text>
          <Text style={[styles.label, { marginLeft: 15, color: '#bdbdbd'}]}>Para hoje </Text>
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
    marginBottom: 20,
  },
  numeroPequeno: {
    fontSize: 24,
    color: '#bdbdbd',
    fontWeight: 'bold',
  },
  labelPequena: {
    color: '#bdbdbd',
    opacity: 0.8,
  },
  atrasadas: {
    color: '#d12c2c'
  }
});