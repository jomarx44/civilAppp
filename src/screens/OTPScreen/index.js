import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, PixelRatio } from "react-native";
import { Container, Button, Text, Input } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Overlay from "library/components/Overlay";
import styles from "styles/commonStyle";

export const OTPScreen = ({ onDone, otp: otpProp, value, setValue }) => {
  useEffect(() => {
    if (value.length == 7) {
      onDone();
    }
  }, [value]);

  const handleRemove = () => {
    const otpLength = value.length;
    if (otpLength > 0) {
      setValue(value.slice(0, -1));
    }
  };

  const handlePress = (digit) => {
    const otpLength = value.length;
    if (otpLength < 7) {
      setValue(value + digit);
    }
  };

  return (
    <Container>
      <View style={[styles.containerBlue, { flex: 1 }]}>
        <View style={[{ flex: 1, marginTop: 40 }]}>
          <Text
            style={[
              localStyle.text,
              { fontSize: 32 / PixelRatio.getFontScale() },
            ]}
          >
            OTP
          </Text>
          <Text
            style={[
              localStyle.text,
              { fontSize: 16 / PixelRatio.getFontScale() },
            ]}
          >
            Please type the verification code sent to your mobile number.
          </Text>
        </View>

        <View style={[{ flex: 1 }]}>
          <View style={localStyle.item}>
            <Grid style={styles.grid}>
              <Col
                style={[localStyle.digit, value.charAt(0) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(0)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(1) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(1)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(2) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(2)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(3) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(3)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(4) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(4)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(5) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(5)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
              <Col
                style={[localStyle.digit, value.charAt(6) != "" && { borderBottomWidth: 0 }]}
              >
                <Input
                  value={value.charAt(6)}
                  style={[localStyle.digit_text]}
                  editable={false}
                />
              </Col>
            </Grid>
          </View>
        </View>
        <View style={[{ flex: 4 }]}>
          <View style={localStyle.kpgrid}>
            <View style={localStyle.kprow}>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("1")}>
                  <Text style={localStyle.kptext}>1</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("2")}>
                  <Text style={localStyle.kptext}>2</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("3")}>
                  <Text style={localStyle.kptext}>3</Text>
                </Button>
              </Col>
            </View>

            <View style={localStyle.kprow}>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("4")}>
                  <Text style={localStyle.kptext}>4</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("5")}>
                  <Text style={localStyle.kptext}>5</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("6")}>
                  <Text style={localStyle.kptext}>6</Text>
                </Button>
              </Col>
            </View>

            <View style={localStyle.kprow}>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("7")}>
                  <Text style={localStyle.kptext}>7</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("8")}>
                  <Text style={localStyle.kptext}>8</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("9")}>
                  <Text style={localStyle.kptext}>9</Text>
                </Button>
              </Col>
            </View>

            <View style={localStyle.kprow}>
              <Col style={[localStyle.kpdigit]}></Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handlePress("0")}>
                  <Text style={localStyle.kptext}>0</Text>
                </Button>
              </Col>
              <Col style={[localStyle.kpdigit]}>
                <Button transparent light onPress={() => handleRemove()}>
                  <Text style={localStyle.kptext}>&lt;</Text>
                </Button>
              </Col>
            </View>
          </View>
        </View>
      </View>
      {otpProp.isFetching && (
        <Overlay>
          <ActivityIndicator color="#FFF" size="large" />
        </Overlay>
      )}
    </Container>
  );
};

export default OTPScreen;

const localStyle = StyleSheet.create({
  digit: {
    marginHorizontal: "2.25%",
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1
  },
  digit_text: {
    color: '#ffffff',
    fontFamily: "Avenir_Medium",
    fontSize: 29,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  grid: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    height: 35,
    paddingHorizontal: '1.45%',
    marginTop: '3%',
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: "#FFFFFF"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  },
  kptext: {
    flex: 1,
    fontSize: 32,
    color: "#FFFFFF",
    textAlign: "center"
  },
  kpdigit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  kpgrid: {
    flex: 4,
    flexDirection: "column"
  },
  kprow: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
    flexDirection: "row"
  },

  kpitem: {
    height: 52,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});

