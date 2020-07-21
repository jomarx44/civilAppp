import { ViewPropTypes } from "react-native"
import PropTypes from 'prop-types'

export const propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string)
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string)
      })
    )
  ]),
  style: ViewPropTypes.style
};

export default propTypes;
