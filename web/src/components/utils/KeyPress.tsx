import { useEffect } from 'react';
import { setShiftPressed, setAltPressed } from '../../store/inventory';
import useKeyPress from '../../hooks/useKeyPress';
import { useAppDispatch } from '../../store';

const KeyPress: React.FC = () => {
  const dispatch = useAppDispatch();
  const shiftPressed = useKeyPress('Shift');
  const altPressed = useKeyPress('Alt');

  useEffect(() => {
    dispatch(setShiftPressed(shiftPressed));
  }, [shiftPressed, dispatch]);

  useEffect(() => {
    dispatch(setAltPressed(altPressed));
  }, [altPressed, dispatch]);

  return <></>;
};

export default KeyPress;
