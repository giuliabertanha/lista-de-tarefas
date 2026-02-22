import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BotoesProps {
    onPress: () => void;
}

export default function Botoes({ onPress }: BotoesProps) { 
    return (
        <View 
            style={styles.container}
        >
            <TouchableOpacity
                style={styles.botao} 
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Text style={styles.texto}>Nova tarefa</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        width: "100%",
        alignItems: 'center'
    },
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3368B9',
        borderRadius: 8,
        padding: 10,
        width: "88%"
    },
    texto: {
        color: '#bacbe5',
        fontSize: 16,
        fontWeight: 'bold',
    }
});