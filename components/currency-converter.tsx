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

interface CurrencyData {
  currencies: Currency[];
  exchangeRates: Record<string, Record<string, number>>;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load currency data from JSON file
  useEffect(() => {
    const loadCurrencyData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/currency-converter.json");
        if (!response.ok) {
          throw new Error("Failed to load currency data");
        }
        const data: CurrencyData = await response.json();
        setCurrencyData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load currency data"
        );
        console.error("Error loading currency data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencyData();
  }, []);

  useEffect(() => {
    if (!currencyData || !amount || isNaN(Number(amount))) {
      setResult(null);
      return;
    }
    const rate = currencyData.exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      setResult(Number(amount) * rate);
    } else if (fromCurrency === toCurrency) {
      setResult(Number(amount));
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, currencyData]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Loading state
  if (loading) {
    return (
      <div className="card">
        <div className="ccheader">
          <DollarSign className="currency-converter-icon" />
          <div>
            <h3 className="currency-converter-title">Currency Converter</h3>
            <p className="subtitle">Loading...</p>
          </div>
        </div>
        <div className="form">
          <div className="loading-spinner">
            <DollarSign className="animate-spin" size={32} />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card">
        <div className="ccheader">
          <DollarSign className="currency-converter-icon" />
          <div>
            <h3 className="currency-converter-title">Currency Converter</h3>
            <p className="subtitle">Error loading data</p>
          </div>
        </div>
        <div className="form">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!currencyData) {
    return null;
  }

  const fromCurrencyData = currencyData.currencies.find(
    (c) => c.code === fromCurrency
  );
  const toCurrencyData = currencyData.currencies.find(
    (c) => c.code === toCurrency
  );

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
              {currencyData.currencies.map((currency) => (
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
              {currencyData.currencies.map((currency) => (
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
              {(
                currencyData.exchangeRates[fromCurrency]?.[toCurrency] || 1
              ).toFixed(4)}{" "}
              {toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
