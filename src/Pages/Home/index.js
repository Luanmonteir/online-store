import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchProducts } from '../../API/api';
import { useCart } from '../../Context';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const { addItemToCart, cartItems, getTotal } = useCart(); // Obtendo os itens do carrinho e a função para adicionar itens

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts(); // Carrega os produtos da API
      setProducts(data);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (item) => {
    addItemToCart(item);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)} // Chama a função handleAddToCart quando o botão é pressionado
      >
        <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate('CartScreen')} // Navega para a tela de carrinho
        >
          <Ionicons name="cart" size={30} color="#000" />
          {cartItems.length > 0 && (
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
            </View>
          )}
          {/* Exibindo o total no cabeçalho */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.cartTotalText}>${String(getTotal() || 0)}</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItems.length, getTotal]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  productItem: {
    flex: 0.48,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cartIconContainer: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartItemCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartTotalText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
