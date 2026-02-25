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
        alignItems: 'center',
        paddingBottom: 30
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
        color: '#e6e9ef',
        fontSize: 16,
        fontWeight: 'bold',
    }
});