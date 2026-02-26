import React, { useMemo } from "react";
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
 const listaOrdenada = useMemo(() => { //useMemo garante que a função só seja executada novamente se uma das dependências for alterada.
  return [...tarefas].sort((a, b) => {
    const converter = (dataStr: string) => {
      const [dia, mes, ano] = dataStr.split('/');
      return new Date(`${ano}-${mes}-${dia}`).getTime();
    };
    return converter(a.prazo) - converter(b.prazo);
  });
}, [tarefas]);
  //console.log(listaOrdenada);
  return (
    <FlatList
      data={listaOrdenada}
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