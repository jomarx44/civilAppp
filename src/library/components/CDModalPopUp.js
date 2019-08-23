import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Animated  } from 'react-native';
import Modal from "react-native-modal";
import CDFade from 'library/components/CDFadeAnimation.js'

let screen = Dimensions.get('window')
export default class CDModalPopUp extends React.Component {
   
  constructor(props){
    super(props)
    this.state = {
      visible: true,
      showAnimation: new Animated.Value(),
      animationDone: false,
      showStatus: false,
      showText: 'show more',
      heightOfModal: 0,
    } 
  }

  showDetail=()=> {
    let finalValue   = this.state.showStatus ? this.state.heightOfModal : (this.state.heightOfModal + 80)

    if( this.state.showStatus  == false) {
      this.setState({
        showText: 'show less', 
        showStatus: true,  
      }, () => {
        Animated.timing(     
        this.state.showAnimation, {
          toValue: finalValue,
          duration: 800
        }).start(this.setState({animationDone:true}));
      });

    }  else {
      this.setState({
        showText: 'show more', 
        animationDone: false,
      }, () => {
        Animated.timing(     
        this.state.showAnimation, {
          toValue: finalValue,
          duration: 800
        }).start(()=>{this.setState({showStatus:false})});
      });
    }

  }

  resizeModal(event) {
    let hasChoiceHeight = 0
    let hasMoreDetailHeight = 0

    if( this.props.hasChoice == true ){
      hasChoiceHeight = 37
    } 

    if( this.props.hasMoreDetail == true ){
      hasMoreDetailHeight = 30
    } 

    this.setState({
      heightOfModal: event.nativeEvent.layout.height + 40 + hasChoiceHeight + hasMoreDetailHeight,
    });
    this.state.showAnimation.setValue(event.nativeEvent.layout.height + 40 + hasChoiceHeight + hasMoreDetailHeight);
  } 

  render () {
    return (
      <View>
        <Modal 
          isVisible = {this.state.visible}
          backdropColor = {'#ffffff'}
          backdropOpacity = {0.8}
          animationInTiming = {1000}
          animationOutTiming = {800}
          useNativeDriver ={true}
          onRequestClose = {() => this.setState({ visible: false })}
          onBackdropPress = {() => this.setState({ visible: false })} 
          onModalHide = {() => this.props.setModalVisibleFalse()}
          backdropOpacity= {0.4}  
          style={[styles.modal]}
        >
          <Animated.View  style = {[styles.modalView, {height: this.state.showAnimation, width:screen.width}]} >
            
            <View style={[styles.modalContext]}>
              <View style={[styles.modalMessage]} >
                <Text style={[styles.modalMessageText]} onLayout={(ev)=>{this.resizeModal(ev)}}>{this.props.modalMessage}</Text>
              </View> 

              { this.props.hasMoreDetail == true && this.state.showStatus == true? 
                <CDFade visible={this.state.animationDone} speed={800}>
                  <View style={[styles.modalMessage]} >
                    <Text style={[styles.modalMessageText]}>{this.props.modalMoreDetail}</Text>
                  </View>
                </CDFade>
                :
                <View></View>
              }
              
            </View> 

            <View style={[styles.clickables]}>
              <View style={[styles.clickablesContent]}>
                { this.props.hasMoreDetail == true ?
                    <TouchableOpacity style={[styles.showDetailButton]} onPress={this.showDetail}>
                        <Text style={[styles.showDetailText]} > {this.state.showText} </Text>
                    </TouchableOpacity>  
                  :
                  <View></View>
                }

                { this.props.hasChoice == true ?                 
                  <View style={[styles.buttonRow]}>
                    <TouchableOpacity style={[styles.buttonActive,styles.button]} onPress={()=> this.props.setIsAccepted(true) }>
                      <Text style={[styles.buttonText]} >ACCEPT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonInactive,styles.button]} onPress={()=> this.props.setIsAccepted(false)}>
                      <Text style={[styles.buttonText]} >DECLINE</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View></View>
                }
              </View>
            </View>

          </Animated.View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button:{
    height: 27,
    width: 112,
    marginLeft:16,
    marginRight:16,
    borderRadius: 6 ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive:{
    backgroundColor:'#FA8043',
    borderColor: '#FA8043',
  },
  buttonInactive:{
    backgroundColor:'#cacaca',
    borderColor: '#cacaca',
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
  },
  buttonRow:{
    flex:1,
    marginTop:10,
    flexDirection:'row',
    justifyContent: 'center', 
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  clickables:{
    position:'absolute',
    bottom: 15,
    width: '100%',
  },
  clickablesContent:{
    flex:1,
  },
  modal:{
    margin:0
  },
  modalContext:{
    marginTop:20,
  },
  modalMessage:{
    marginRight: 35,
    marginLeft: 35,
    marginBottom: 10
  },
  modalMessageText:{
    color: '#7d7d7d',
    fontSize: 12,
  },
  modalView:{
    position: 'absolute',
    bottom: 80,
    color: '#7d7d7d',
    backgroundColor: '#ffedd9', 
  },
  showDetailButton:{
    flex:1,
    marginTop:10,
    textAlign: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'   
  },
  showDetailText:{
    color: '#000000',
    fontSize: 12
  },
  modalMoreMessage:{
    marginRight: 35,
    marginLeft: 35,
    marginTop:10,
  },
  
  

})