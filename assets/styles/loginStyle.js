import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
        TitleText : {
                color: '#FA8043',
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 20,
                marginLeft: 40,
        },
        TextInputStyleClass: {
                marginTop: 23,
                alignSelf: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                height: 30,
                borderWidth: 1,
                borderColor: '#FA8043',
                color: '#FA8043',
                borderRadius: 7 ,
                backgroundColor : "#FFFFFF"
        },
        hairline: {
            marginTop: 23,
            alignSelf: 'center',
            backgroundColor: '#d5d5d5',
            height: 1,
        },
        button: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#FA8043',
                backgroundColor:'#FA8043',
                marginTop: 35,
                height: 24,
                alignSelf: 'center',
                borderWidth: 1,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 6
        },
        buttonText: {
                color: '#ffffff',
                fontSize: 17
        }
});


export default styles;
