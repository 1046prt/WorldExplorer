"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRightLeft, DollarSign, RefreshCw, Search } from "lucide-react";
import "@/styles/currency-converter.css";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface CurrencyData {
  currencies: Currency[];
}

interface ExchangeRateResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<
    string,
    number
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFromDropdown(false);
        setFromSearch("");
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target as Node)
      ) {
        setShowToDropdown(false);
        setToSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load currency data from JSON file
  useEffect(() => {
    const loadCurrencyData = async () => {
      try {
        const response = await fetch("/data/currency-converter.json");
        if (!response.ok) {
          throw new Error("Failed to load currency data");
        }
        const data = await response.json();
        setCurrencyData({ currencies: data.currencies });
      } catch (err) {
        setError("Failed to load currency data");
        console.error("Error loading currency data:", err);
      }
    };

    loadCurrencyData();
  }, []);

  // Fetch live exchange rates
  const fetchExchangeRates = async (baseCurrency: string = "USD") => {
    try {
      setRefreshing(true);

      // Check if API key is available
      if (!API_KEY) {
        throw new Error("Exchange Rate API key not configured");
      }

      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`);
      }

      const data: ExchangeRateResponse = await response.json();

      if (data.result === "success") {
        setExchangeRates(data.conversion_rates);
        setLastUpdated(
          new Date(data.time_last_update_unix * 1000).toLocaleString()
        );
        setError(null);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch exchange rates"
      );
      console.error("Error fetching exchange rates:", err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchExchangeRates(fromCurrency);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh rates when base currency changes
  useEffect(() => {
    if (currencyData && !loading) {
      fetchExchangeRates(fromCurrency);
    }
  }, [fromCurrency]); // eslint-disable-line react-hooks/exhaustive-deps

  // Calculate conversion result
  useEffect(() => {
    if (!exchangeRates || !amount || isNaN(Number(amount))) {
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(Number(amount));
      return;
    }

    const rate = exchangeRates[toCurrency];
    if (rate) {
      setResult(Number(amount) * rate);
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleRefresh = () => {
    fetchExchangeRates(fromCurrency);
  };

  // Filter currencies based on search
  const filteredFromCurrencies = useMemo(() => {
    if (!currencyData) return [];
    return currencyData.currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(fromSearch.toLowerCase()) ||
        currency.name.toLowerCase().includes(fromSearch.toLowerCase())
    );
  }, [currencyData, fromSearch]);

  const filteredToCurrencies = useMemo(() => {
    if (!currencyData) return [];
    return currencyData.currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(toSearch.toLowerCase()) ||
        currency.name.toLowerCase().includes(toSearch.toLowerCase())
    );
  }, [currencyData, toSearch]);

  // Handle currency selection
  const handleFromCurrencySelect = (currency: Currency) => {
    setFromCurrency(currency.code);
    setFromSearch("");
    setShowFromDropdown(false);
  };

  const handleToCurrencySelect = (currency: Currency) => {
    setToCurrency(currency.code);
    setToSearch("");
    setShowToDropdown(false);
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
          <p className="subtitle">
            {lastUpdated
              ? `Live Rates — Updated: ${lastUpdated}`
              : "Loading live rates..."}
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="refresh-button"
          title="Refresh exchange rates"
        >
          <RefreshCw
            className={`refresh-icon ${refreshing ? "animate-spin" : ""}`}
            size={16}
          />
        </button>
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
            <div className="currency-select-container" ref={fromDropdownRef}>
              <div
                className="currency-display"
                onClick={() => setShowFromDropdown(!showFromDropdown)}
              >
                <span className="currency-flag-display">
                  {fromCurrencyData?.flag}
                </span>
                <span className="currency-code">{fromCurrency}</span>
                <span className="currency-name">{fromCurrencyData?.name}</span>
              </div>
              {showFromDropdown && (
                <div className="currency-dropdown">
                  <div className="search-container">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search currencies..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="currency-search"
                      autoFocus
                    />
                  </div>
                  <div className="currency-options">
                    {filteredFromCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="currency-option"
                        onClick={() => handleFromCurrencySelect(currency)}
                      >
                        <span className="currency-flag-option">
                          {currency.flag}
                        </span>
                        <span className="currency-code">{currency.code}</span>
                        <span className="currency-name-option">
                          {currency.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="label">To</label>
            <div className="currency-select-container" ref={toDropdownRef}>
              <div
                className="currency-display"
                onClick={() => setShowToDropdown(!showToDropdown)}
              >
                <span className="currency-flag-display">
                  {toCurrencyData?.flag}
                </span>
                <span className="currency-code">{toCurrency}</span>
                <span className="currency-name">{toCurrencyData?.name}</span>
              </div>
              {showToDropdown && (
                <div className="currency-dropdown">
                  <div className="search-container">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search currencies..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="currency-search"
                      autoFocus
                    />
                  </div>
                  <div className="currency-options">
                    {filteredToCurrencies.map((currency) => (
                      <div
                        key={currency.code}
                        className="currency-option"
                        onClick={() => handleToCurrencySelect(currency)}
                      >
                        <span className="currency-flag-option">
                          {currency.flag}
                        </span>
                        <span className="currency-code">{currency.code}</span>
                        <span className="currency-name-option">
                          {currency.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
              {fromCurrency === toCurrency
                ? "1.0000"
                : (exchangeRates?.[toCurrency] || 0).toFixed(4)}{" "}
              {toCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
