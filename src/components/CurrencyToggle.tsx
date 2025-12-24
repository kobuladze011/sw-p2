import React, { useState, useEffect } from 'react';
import { currencyApi } from '../api/apiService';
import styles from './CurrencyToggle.module.css';

interface CurrencyToggleProps {
  onRateChange: (rate: number, currency: string) => void;
}

const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ onRateChange }) => {
  const [currency, setCurrency] = useState<'USD' | 'GEL'>('USD');

  useEffect(() => {
    const fetchRate = async () => {
      if (currency === 'GEL') {
        const newRate = await currencyApi.getRate('USD', 'GEL');
        onRateChange(newRate, 'GEL');
      } else {
        onRateChange(1, 'USD');
      }
    };

    void fetchRate();
  }, [currency, onRateChange]);

  return (
    <div className={styles.currencyToggle}>
      <button
        className={`${styles.currencyButton} ${currency === 'USD' ? styles.active : ''}`}
        onClick={() => setCurrency('USD')}
      >
        USD ($)
      </button>
      <button
        className={`${styles.currencyButton} ${currency === 'GEL' ? styles.active : ''}`}
        onClick={() => setCurrency('GEL')}
      >
        GEL (₾)
      </button>
    </div>
  );
};

export default CurrencyToggle;
