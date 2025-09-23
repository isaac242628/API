import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Text, IconButton } from "react-native-paper";
import { fetchEstoque, deleteEstoque } from "./Api";

export default function Home({ navigation }) {
  const [registro, setRegistros] = useState([]);

  useEffect(() => {
    fetchEstoque(setRegistros);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Tem certeza de que deseja deletar este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        onPress: () => deleteEstoque(id, setRegistros),
      },
    ]);
  };
  return (
    <View style={StyleSheet.container}>
      <FlatList
        data={registro}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={StyleSheet.card}>
            <View style={StyleSheet.cardContent}>
              {/* Coluna da esquerda: texto */}
              <View style={StyleSheet.infoColumn}>
                <Text style={StyleSheet.title}>Código: {item.id}</Text>
                <Text>Produto: {item.produto}</Text>
                <Text>Marca: {item.marca}</Text>
                <Text>Valor: {item.valor}</Text>
              </View>

              {/* Coluna da direita: botões */}
              <View style={StyleSheet.actionsColumn}>
                <IconButton
                  icon="pencil"
                  size={24}
                  iconColor="#3498db"
                  onPress={() =>
                    navigation.navigate("Alterar", { Estoque: item })
                  }
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

      <TouchableOpacity
        style={StyleSheet.floatingButton}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={StyleSheet.plusIcon}> + </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 5,
    elevation: 3,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
  },
  actionsColumn: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#27ae60",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  plusIcon: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 36,
    marginBottom: 2,
  },
});
