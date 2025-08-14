"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft, DollarSign } from "lucide-react"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
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
]

// Mock exchange rates (in real app, fetch from API)
const exchangeRates: Record<string, Record<string, number>> = {
  USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CNY: 6.45, CAD: 1.25, AUD: 1.35, CHF: 0.92, INR: 74.5, BRL: 5.2 },
  EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CNY: 7.6, CAD: 1.47, AUD: 1.59, CHF: 1.08, INR: 87.8, BRL: 6.1 },
  GBP: { USD: 1.37, EUR: 1.16, JPY: 150, CNY: 8.8, CAD: 1.71, AUD: 1.85, CHF: 1.26, INR: 102, BRL: 7.1 },
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency])

  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) {
      setResult(null)
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
      const convertedAmount = Number(amount) * rate
      setResult(convertedAmount)
      setLoading(false)
    }, 300)
  }

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const fromCurrencyData = currencies.find((c) => c.code === fromCurrency)
  const toCurrencyData = currencies.find((c) => c.code === toCurrency)

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-6 h-6 text-green-600" />
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Currency Converter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Live exchange rates</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-500">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span>{currency.flag}</span>
                      <span>{currency.code}</span>
                      <span className="text-gray-500">- {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapCurrencies}
            className="rounded-full w-10 h-10 p-0 bg-transparent"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </Button>
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {fromCurrencyData?.flag} {amount} {fromCurrency} equals
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {toCurrencyData?.flag}{" "}
                {result.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {toCurrency}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                1 {fromCurrency} = {(exchangeRates[fromCurrency]?.[toCurrency] || 1).toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
            <div className="font-medium">🇺🇸 USD</div>
            <div className="text-gray-600 dark:text-gray-400">$1.00</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
            <div className="font-medium">🇪🇺 EUR</div>
            <div className="text-gray-600 dark:text-gray-400">€0.85</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
            <div className="font-medium">🇬🇧 GBP</div>
            <div className="text-gray-600 dark:text-gray-400">£0.73</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-center">
            <div className="font-medium">🇯🇵 JPY</div>
            <div className="text-gray-600 dark:text-gray-400">¥110</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
