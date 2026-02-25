import React from "react";
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Item from "./Item";

interface Task {
  id: string;
  texto: string;
  prazo: string;
  concluida: boolean;
}

interface ListaProps {
  tarefas: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function Lista({ tarefas, onDelete, onToggle }: ListaProps) {
  return (
    <FlatList
      data={tarefas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Item 
          data={item} 
          onDelete={onDelete} 
          onToggle={onToggle} 
        />
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma tarefa por aqui... </Text>
        </View>
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});