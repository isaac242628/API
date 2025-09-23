import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { createProdutos } from "./Api";

export default function Cadastro({ navigation }) {
  const [registro, setRegistros] = useState([]);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");

  const [selectedProdutoId, setSelectedProdutoId] = useState(null);

  const handleSubmit = async () => {
    if (!nome || !marca || !preco) {
      Alert.alert("Atenção", "Preencha tododos os campos antes de cadastrar.");
      return;
    }

    const newProduto = { nome, marca, preco };

    if (selectedProdutoId) {
      await updateProdutos(selectedProdutoId, newProduto);
      selectedProdutoId(null);
    } else {
      const addedProduto = await createProdutos(newProduto);
      if (addedProduto) {
        Alert.alert("Sucesso!", "Cadastro realizado com sucesso!", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      }
    }

    setNome("");
    setMarca("");
    setPreco("");
  };

  return (
    <View>
      <TextInput placeholder="Produto" value={nome} onChandeText={setNome} />
      <TextInput placeholder="Marca" value={marca} onChandeText={setMarca} />
      <TextInput placeholder="Preco" value={preco} onChandeText={setPreco} />

      <Button title="Cadastrar" onPress={handleSubmit} />
    </View>
  );
}
