import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

ConfettiAnimation.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

function ConfettiAnimation(props) {
  const { width, height } = useWindowSize();

  return (
    <Confetti height={height}
              onConfettiComplete={props.onComplete}
              recycle={false}
              width={width} />
  );
}

export default ConfettiAnimation;
