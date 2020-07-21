import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Loader, OTP } from "../../components/";

export const ModifiedOTP = (props) => {
  const [code, setCode] = useState("");
  const { isLoading, loadingText, onDone } = props;

  useEffect(() => {
    if (code.length >= 7) {
      onDone(code);
    }
  }, [code]);

  const handleRemove = () => {
    if (code.length > 0) {
      setCode(code.slice(0, -1));
    }
  };

  const handleChangeValue = (addedCode = "") => {
    if (code.length < 7) {
      setCode(code + addedCode);
    }
  };

  return (
    <React.Fragment>
      <OTP
        onChangeValue={handleChangeValue}
        onRemove={handleRemove}
        value={code}
      />
      <Loader isVisible={isLoading} loadingText={loadingText} />
    </React.Fragment>
  );
};

ModifiedOTP.propTypes = {
  isLoading: PropTypes.bool, 
  loadingText: PropTypes.string, 
  onDone: PropTypes.func.isRequired
}

export default ModifiedOTP;
