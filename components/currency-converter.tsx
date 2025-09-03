"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, DollarSign } from "lucide-react";
import "@/styles/currency-converter.css";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
];

const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.857, GBP: 0.744, JPY: 148.07, CNY: 7.1308, CAD: 1.3788,
    AUD: 1.5281, CHF: 0.8808, INR: 88.043, BRL: 5.392,
  },
  EUR: {
    USD: 1.1678, GBP: 0.867, JPY: 172.7, CNY: 8.32, CAD: 1.61,
    AUD: 1.78, CHF: 1.027, INR: 102.8, BRL: 6.3,
  },
  GBP: {
    USD: 1.3445, EUR: 1.153, JPY: 199.3, CNY: 9.6, CAD: 1.85,
    AUD: 2.02, CHF: 1.18, INR: 118.5, BRL: 7.4,
  },
  JPY: {
    USD: 0.00675, EUR: 0.00579, GBP: 0.00502, CNY: 0.048,
    CAD: 0.0093, AUD: 0.0102, CHF: 0.00595, INR: 0.595, BRL: 0.037,
  },
  CNY: {
    USD: 0.1402, EUR: 0.120, GBP: 0.104, JPY: 20.9,
    CAD: 0.195, AUD: 0.214, CHF: 0.123, INR: 12.35, BRL: 0.77,
  },
  CAD: {
    USD: 0.725, EUR: 0.621, GBP: 0.541, JPY: 107.6,
    CNY: 5.13, AUD: 1.11, CHF: 0.639, INR: 63.85, BRL: 3.9,
  },
  AUD: {
    USD: 0.654, EUR: 0.561, GBP: 0.495, JPY: 97.9,
    CNY: 4.67, CAD: 0.90, CHF: 0.575, INR: 57.5, BRL: 3.5,
  },
  CHF: {
    USD: 1.135, EUR: 0.973, GBP: 0.847, JPY: 168.0,
    CNY: 8.13, CAD: 1.56, AUD: 1.74, INR: 100.0, BRL: 6.2,
  },
  INR: {
    USD: 0.0114, EUR: 0.0097, GBP: 0.0084, JPY: 1.68,
    CNY: 0.081, CAD: 0.0156, AUD: 0.0174, CHF: 0.0100, BRL: 0.062,
  },
  BRL: {
    USD: 0.185, EUR: 0.159, GBP: 0.135, JPY: 27.0,
    CNY: 1.30, CAD: 0.256, AUD: 0.285, CHF: 0.161, INR: 16.1,
  },
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!amount || isNaN(Number(amount))) {
      setResult(null);
      return;
    }
    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      setResult(Number(amount) * rate);
    } else if (fromCurrency === toCurrency) {
      setResult(Number(amount));
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyData = currencies.find((c) => c.code === toCurrency);

  return (
    <div className="card">
      <div className="ccheader">
        <DollarSign className="currency-converter-icon" />
        <div>
          <h3 className="currency-converter-title">Currency Converter</h3>
          <p className="subtitle">Static Rates — Sept 2025</p>
        </div>
      </div>

      <div className="form">
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="currency-converter-input"
            />
          </div>

          <div className="form-group">
            <label className="label">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="select"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="currency-flag">{fromCurrencyData?.flag}</div>
          </div>

          <div className="form-group">
            <label className="label">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="select"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <div className="currency-flag">{toCurrencyData?.flag}</div>
          </div>
        </div>

        <div className="swap">
          <button className="swap-btn" onClick={swapCurrencies}>
            <ArrowRightLeft className="swap-icon" />
          </button>
        </div>

        {result !== null && (
          <div className="result">
            <div className="result-text">
              {fromCurrencyData?.flag} {amount} {fromCurrency} equals
            </div>
            <div className="result-value">
              {toCurrencyData?.flag}{" "}
              {result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {toCurrency}
            </div>
            <div className="rate">
              1 {fromCurrency} ={" "}
              {(exchangeRates[fromCurrency]?.[toCurrency] || 1).toFixed(4)}{" "}
              {toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
