import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface BotoesProps {
    onPress: () => void;
}

export default function Botoes({ onPress }: BotoesProps) { 
    return (
        <TouchableOpacity
            style={styles.botao} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.texto}>Nova tarefa</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4384e4',
        borderRadius: 8,
        padding: 10,
        width: "88%"
    },
    texto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});