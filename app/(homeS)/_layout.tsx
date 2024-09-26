// HomeLayout.tsx
import React, { useEffect } from 'react';
import { View, Text, Linking } from 'react-native';
import SwipeCard from '@/components/SwipeCard/swipeCard';
import { useBearStore } from '@/zustand/store';
import { StripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';
import { PUBLIC_KEY } from '@/utils/keys';
import { usePayment } from '@/components/payments/payment';
import { useSwipeHandler } from '@/components/SwipeCard/swipeCardLogic';
import GenderSelector from '@/components/genderSelect/GenderSelector';

let urlScheme = Constants.appOwnership === 'expo' ? 'expo://' : Linking.createURL('');

const HomeLayout = () => {
  const { listOfUser } = useBearStore();
  const { initializePaymentSheet } = usePayment();
  const { onSwipe } = useSwipeHandler();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <StripeProvider publishableKey={PUBLIC_KEY} urlScheme={urlScheme}>
      <View style={{ flex: 1 }}>
        {listOfUser.length === 0 ? <GenderSelector /> : <SwipeCard data={listOfUser} onSwipe={onSwipe} />}
      </View>
    </StripeProvider>
  );
};

export default HomeLayout;
