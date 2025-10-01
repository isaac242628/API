const API_URL = "https://apiestoque.webapptech.site/api/produtos/";
import { Alert } from "react-native";

export const fetchProdutos = async (setRegistros) => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error ao buscar no estoque.");
    }

    const data = await response.json();
    console.log("Estoques recebidos da API: ", data);
    setRegistros(data.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProdutos = async (ProdutosData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProdutosData),
    });

    if (response.status === 204) {
      Alert.alert("Sucesso", "Cadastro Realizado com sucesso!");
      return {};
    }

    const textResponse = await response.text();
    console.log(`Resposta bruta ${textResponse}`);

    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch (error) {
      console.warn(`JSON inválido.`);
      responseData = null;
    }

    if (!response.ok || !responseData) {
      throw new Error(responseData?.message || "Erro desconhecido.");
    }

    return responseData;
  } catch (error) {
    console.log(error);
    console.error(`Erro ao cadastrar estoque: ${error.message}`);
    Alert.alert(`Erro ao cadastrar. Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteProdutos = async (ProdutosId, setRegistros) => {
    try {
        const response = await fetch(API_URL + ProdutosId, {
            method: 'DELETE'
        })

        if(response.ok){
            const responseData = await response.json()

            if(responseData.success){
                Alert.alert('Sucesso!', responseData.message)

                setRegistros((prevRegistros) => {
                    const novaLista = prevRegistros.filter((Produtos) => Produtos.id != ProdutosId);
                    console.log(`Nova lista de Estoques: ${novaLista}`)
                    return novaLista;
                })
            } else {
                Alert.alert(`Erro: ${responseData.message}`)
            }
        } else {
            const textResponse = await response.text();
            let responseData =null

            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.log(`JSON inválido.`)
            }

            throw new Error(responseData?.message || 'ERRO DESCONHECIDO.')
        }
    } catch(error) {
        console.error(`Erro ao destruir estoque: ${error.message}`)
        Alert.alert(`Erro ao excluir. Detalhes: ${error.message}`)
    }
}

export const updateProdutos = async (ProdutosId, updatedData, navigation) => {
  try {
    const response = await fetch(API_URL + ProdutosId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    console.log('Dados enviados:', updatedData);

    if (response.status === 200) {
      Alert.alert('Sucesso!', 'Estoque atualizado com sucesso!');
      navigation.navigate('Home');
    } else {
      const textResponse = await response.text();
      let responseData;
      try {
        responseData = JSON.parse(textResponse);
      } catch (error) {
        console.warn('A resposta não é um JSON válido.');
        responseData = null;
      }

      throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o Estoque');
    }
  } catch (error) {
    console.error('Erro ao atualizar o Estoque:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};