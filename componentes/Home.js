import React, {useState, useEffect} from 'react';
import {View, Alert, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text, IconButton} from 'react-native-paper';
import {fetchEstoque, deleteEstoque} from './Api';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function Home({ navigation }) {
    const [registro, setRegistros] = useState([]);

    useEffect(() => {
        fetchEstoque(setEstoque);
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'confirmação',
            'tem certeza de que deseja deletar este item?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Deletar',
                    onPress: () => deleteEstoque(id, setRegistros),
                },
            ]
        );
    };

    return (
        <View style={StyleSheet.container}>
            <FlatList
            data={registro}
            keyStractor={(Item) => Item.id.toString()}
            renderItem={({item}) => (
                <Card style={StyleSheet.card}>
                    <View style={StyleSheet.cardContent}>
                        <View style={StyleSheet.infoColumn}>
                            <Text style={StyleSheet.title}>Código: {item.id}</Text>
                            <Text>Produto: {item.produto}</Text>
                            <Text>Marca: {item.marca}</Text>
                            <Text>Valor: {item.valor}</Text>
                        </View>

                        {/* Coluna da direita: botões*/}
                        <View style={StyleSheet.actionsColumn}>
                            <IconButton
                            icon="pencil"
                            size={24}
                            iconColor="#3498db"
                            onPress={() => navigation.navigate('Alterar', {Estoque: item})}
                            />
                            <IconButton
                            icon="delete"
                            size={24}
                            iconColor="#e74c3c"
                            onPress={() => handleDelete(item.id)}
                            />
                        </View>
                    </View>
                </Card>
                )}
            />

            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Cadastro')}>
                <Text style={Styles.plusIcon}>+</Text>
            </TouchableOpacity>
        </View>
    )
}