// usePayment.ts
import { useStripe } from '@stripe/stripe-react-native';
import { useBearStore } from '@/zustand/store';
import { Alert } from 'react-native';

export const usePayment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { allowUserToSwipe } = useBearStore();

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`http://192.168.1.107:3000/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();
      return { paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.log(error);
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer }:any = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: { name: 'Jane Doe' },
    });
    if (!error) {
      // Set loading if required
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      allowUserToSwipe();
      initializePaymentSheet();
      Alert.alert('Success', 'Payment Successfully Done');
    }
  };

  return { initializePaymentSheet, openPaymentSheet };
};
