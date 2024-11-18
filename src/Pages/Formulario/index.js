import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from '../../Context';

const CheckoutScreen = ({ navigation }) => {
  const { getTotal, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cartão de Crédito');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [total, setTotal] = useState(getTotal());

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'DESCONTO10' && !discountApplied) {
      const discountedTotal = total * 0.9;
      setTotal(discountedTotal);
      setDiscountApplied(true);
      Alert.alert('Sucesso', 'Código de desconto aplicado!');
    } else {
      Alert.alert('Erro', 'Código de desconto inválido ou já aplicado.');
    }
  };

  const handleConfirmPurchase = () => {
    if (address.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira o endereço de entrega.');
      return;
    }

    Alert.alert('Compra Finalizada', `Total pago: R$ ${total.toFixed(2)}`);
    clearCart();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalizar Compra</Text>

      <Text style={styles.label}>Endereço de Entrega:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço completo"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Método de Pagamento:</Text>
      <View style={styles.paymentMethods}>
        {['Cartão de Crédito', 'PIX', 'Boleto'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentButton,
              paymentMethod === method && styles.selectedPaymentButton,
            ]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text
              style={[
                styles.paymentButtonText,
                paymentMethod === method && styles.selectedPaymentButtonText,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Código de Desconto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código de desconto"
        value={discountCode}
        onChangeText={setDiscountCode}
      />
      <TouchableOpacity style={styles.discountButton} onPress={handleApplyDiscount}>
        <Text style={styles.discountButtonText}>Aplicar Código</Text>
      </TouchableOpacity>

      <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPurchase}>
        <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedPaymentButton: {
    backgroundColor: '#007BFF',
  },
  paymentButtonText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedPaymentButtonText: {
    color: '#fff',
  },
  discountButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  discountButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
