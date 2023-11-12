import { useEffect, useState } from 'react';
import { useMediaQuery as useMQ } from 'react-responsive';

export const useMediaQuery = (...parameters: Parameters<typeof useMQ>) => {
  const [isMatched, setIsMatched] = useState(false);
  const result = useMQ(...parameters);

  useEffect(() => {
    setIsMatched(result);
  }, [result]);

  return isMatched;
};
