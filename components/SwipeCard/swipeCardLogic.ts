// SwipeCardLogic.ts
import { Alert } from 'react-native';
import { LikeAndDislike } from '@/utils/apis';
import { useBearStore } from '@/zustand/store';
import { usePayment } from '../payments/payment';

export const useSwipeHandler = () => {
  const { count, setCount, paidAccount } = useBearStore();
  const { openPaymentSheet } = usePayment();

  const onSwipe = async (swipeType: string, swipeData: any) => {
    try {
      if (count >= 4 && !paidAccount) {
        Alert.alert('Make Payment to Like and Dislike', 'Payment will be charged', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => openPaymentSheet(),
          },
        ]);
      } else {
        const swipeValue = swipeType === 'right' ? '1' : '0';
        await LikeAndDislike(swipeValue, swipeData?.id);
        setCount();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { onSwipe };
};
