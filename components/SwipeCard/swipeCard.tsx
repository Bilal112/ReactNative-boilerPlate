/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useRef } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    type ImageSourcePropType,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Swiper, type SwiperCardRefType } from 'rn-swiper-list';
import ActionButton from './actionButton';

interface SwipeCard {
    data: any,
    onSwipe: (swipeTypeType: string, swipeData: any) => void
}
const SwipeCard = (props: SwipeCard) => {
    let imageDefault='https://plus.unsplash.com/premium_photo-1682096259050-361e2989706d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D'
    const { onSwipe, data } = props
    const ref = useRef<SwiperCardRefType>();
    const renderCard = useCallback(
        (image: any) => {
            const { image: UserImage } = image;
            return (
                <View style={styles.renderCardContainer}>
                    <Image
                        source={{ uri: imageDefault?? UserImage }}
                        style={styles.renderCardImage}
                        resizeMode="cover"
                    />
                </View>
            );
        },
        []
    );
    const OverlayLabelRight = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'green',
                    },
                ]}
            />
        );
    }, []);
    const OverlayLabelLeft = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        backgroundColor: 'red',
                    },
                ]}
            />
        );
    }, []);
    const OverlayLabelTop = useCallback(() => {
        return (
            <View
                style={[
                    styles.overlayLabelContainer,
                    {
                        // backgroundColor: 'blue',
                    },
                ]}
            />
        );
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.subContainer}>
                <Swiper
                    ref={ref}
                    cardStyle={styles.cardStyle}
                    disableTopSwipe={true}
                    disableBottomSwipe={true}
                    data={data}
                    renderCard={renderCard}
                    onIndexChange={(index) => {
                        // console.log('Current Active index', index);
                    }}
                    onSwipeRight={(cardIndex) => {
                        onSwipe('left', props.data[cardIndex])
// 
                        // console.log('cardIndex', cardIndex);
                    }}
                    onSwipedAll={() => {
                        // console.log('onSwipedAll');
                    }}
                    onSwipeLeft={(cardIndex) => {
                        onSwipe('left', props.data[cardIndex])
                        // console.log('onSwipeLeft', cardIndex);
                    }}

                    OverlayLabelRight={OverlayLabelRight}
                    OverlayLabelLeft={OverlayLabelLeft}
                // onSwipeActive={() => {
                //     console.log('onSwipeActive');
                // }}
                // onSwipeStart={() => {
                //     console.log('onSwipeStart');
                // }}
                // onSwipeEnd={() => {
                //     console.log('onSwipeEnd');
                // }}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeLeft();
                    }}
                >
                    <AntDesign name="close" size={32} color="white" />
                </ActionButton>
                <ActionButton
                    style={styles.button}
                    onTap={() => {
                        ref.current?.swipeRight();
                    }}
                >
                    <AntDesign name="heart" size={32} color="white" />
                </ActionButton>
            </View>
        </GestureHandlerRootView>
    );
};

export default SwipeCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        bottom: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 80,
        borderRadius: 40,
        marginHorizontal: 20,
        aspectRatio: 1,
        backgroundColor: '#3A3D45',
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardStyle: {
        width: '95%',
        height: '75%',
        borderRadius: 15,
        marginVertical: 20,
    },
    renderCardContainer: {
        flex: 1,
        borderRadius: 15,
        height: '75%',
        width: '100%',
    },
    renderCardImage: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
});

