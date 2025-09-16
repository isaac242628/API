import React, {useEffect} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native'

const SplashScreen = ({navigation}) => {
    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={StyleSheet.splashContainer}>
            <Image source={{ uri: ''}} style={StyleSheet.splashImage} />
            <ActivityIndicator size="large" color= "#0000ff" style={StyleSheet.loader}/>
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    splashImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    loader:{
        marginTop: 20,
    },
});

export default SplashScreen;