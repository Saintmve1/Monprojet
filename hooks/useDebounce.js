import { useState, useEffect } from 'react';

export const useDebounce = (valeur, delai = 400) => {
  const [valeurDiffere, setValeurDiffere] = useState(valeur);

  useEffect(() => {
    const t = setTimeout(() => setValeurDiffere(valeur), delai);
    return () => clearTimeout(t); // annule si l'utilisateur tape encore
  }, [valeur, delai]);

  return valeurDiffere;
};