"use client";

import { useState, useEffect } from "react";
import { ArrowRightLeft, DollarSign } from "lucide-react";
import "./CurrencyConverter.css"; // <-- We'll define custom styles here

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

// Mock exchange rates
const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CNY: 6.45,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    INR: 74.5,
    BRL: 5.2,
  },
  EUR: {
    USD: 1.18,
    GBP: 0.86,
    JPY: 129,
    CNY: 7.6,
    CAD: 1.47,
    AUD: 1.59,
    CHF: 1.08,
    INR: 87.8,
    BRL: 6.1,
  },
  GBP: {
    USD: 1.37,
    EUR: 1.16,
    JPY: 150,
    CNY: 8.8,
    CAD: 1.71,
    AUD: 1.85,
    CHF: 1.26,
    INR: 102,
    BRL: 7.1,
  },
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) {
      setResult(null);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
      const convertedAmount = Number(amount) * rate;
      setResult(convertedAmount);
      setLoading(false);
    }, 300);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency);
  const toCurrencyData = currencies.find((c) => c.code === toCurrency);

  return (
    <div className="card">
      <div className="header">
        <DollarSign className="icon" />
        <div>
          <h3 className="title">Currency Converter</h3>
          <p className="subtitle">Live exchange rates</p>
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
              className="input"
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

        <div className="quick-rates">
          <div className="rate-card">🇺🇸 USD → $1.00</div>
          <div className="rate-card">🇪🇺 EUR → €0.85</div>
          <div className="rate-card">🇬🇧 GBP → £0.73</div>
          <div className="rate-card">🇯🇵 JPY → ¥110</div>
        </div>
      </div>
    </div>
  );
}
