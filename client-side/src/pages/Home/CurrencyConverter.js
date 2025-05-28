import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  // Create refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const converterRef = useRef(null);
  const ratesRef = useRef(null);

  // Currency state
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popularRates, setPopularRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Complete currency list with all available currencies
  const allCurrencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
    { code: "DKK", name: "Danish Krone", symbol: "kr" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
    { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
    { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
    { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    { code: "PLN", name: "Polish Złoty", symbol: "zł" },
    { code: "RON", name: "Romanian Leu", symbol: "lei" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "THB", name: "Thai Baht", symbol: "฿" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
  ];

  // Use useMemo to prevent the availableRates object from being recreated on every render
  const availableRates = React.useMemo(() => ({
    AUD: 1.5369802457,
    BGN: 1.7152403329,
    BRL: 5.7050907095,
    CAD: 1.3767201571,
    CHF: 0.8257501468,
    CNY: 7.2287907519,
    CZK: 21.9396822056,
    DKK: 6.5768708058,
    EUR: 0.8812401351,
    GBP: 0.7487100997,
    HKD: 7.7488508024,
    HRK: 6.3382010433,
    HUF: 355.937713721,
    IDR: 16458.676696973,
    ILS: 3.5972404692,
    INR: 84.4253456025,
    ISK: 129.379404676,
    JPY: 143.0059432502,
    KRW: 1372.3638159005,
    MXN: 19.6382223551,
    MYR: 4.2383807363,
    NOK: 10.2638520261,
    NZD: 1.6621401775,
    PHP: 55.3898292067,
    PLN: 3.7599605681,
    RON: 4.4861806268,
    RUB: 81.6056917129,
    SEK: 9.5696413794,
    SGD: 1.2879801708,
    THB: 32.6455756318,
    TRY: 38.6625848629,
    USD: 1,
    ZAR: 18.1933619443,
  }), []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        setShowFromDropdown(false);
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Using freecurrencyapi.com API
        const API_KEY = process.env.REACT_APP_FC_API_KEY;
        console.log("API_KEY", API_KEY);
        console.log("fromCurrency", fromCurrency);
        const response = await axios.get(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency},EUR,GBP,JPY,CAD,USD`
        );

        // Set exchange rate for the selected currency
        const rates = response.data.data;
        setExchangeRate(rates[toCurrency]);
        setConvertedAmount((amount * rates[toCurrency]).toFixed(2));

        // Set popular rates (against selected base currency)
        const popularCurrencies = ["EUR", "GBP", "JPY", "CAD"];
        const popularRatesData = {};
        popularCurrencies.forEach((curr) => {
          if (curr !== fromCurrency && rates[curr]) {
            popularRatesData[curr] = rates[curr].toFixed(4);
          }
        });

        // Add USD to popular rates if not already the base currency
        if (fromCurrency !== "USD" && rates["USD"]) {
          popularRatesData["USD"] = rates["USD"].toFixed(4);
        }

        setPopularRates(popularRatesData);

        // Set last updated time
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Error fetching exchange rate:", error);

        // Fallback to static data if API fails
        try {
          const baseRate = availableRates[fromCurrency];
          const targetRate = availableRates[toCurrency];

          // Calculate exchange rate
          const rate = targetRate / baseRate;
          setExchangeRate(rate);
          setConvertedAmount((amount * rate).toFixed(2));

          // Set popular rates (against selected base currency)
          const popularCurrencies = ["EUR", "GBP", "JPY", "CAD"];
          const popularRatesData = {};
          popularCurrencies.forEach((curr) => {
            if (curr !== fromCurrency) {
              const currRate = availableRates[curr] / baseRate;
              popularRatesData[curr] = currRate.toFixed(4);
            }
          });

          // Add USD to popular rates if not already the base currency
          if (fromCurrency !== "USD") {
            const usdRate = availableRates["USD"] / baseRate;
            popularRatesData["USD"] = usdRate.toFixed(4);
          }

          setPopularRates(popularRatesData);

          // Set last updated time
          setLastUpdated("Using offline data");
        } catch (fallbackError) {
          setError("Failed to fetch exchange rates. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount, availableRates]);

  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Handle currency swap
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Handle currency selection
  const handleFromCurrencySelect = (currency) => {
    setFromCurrency(currency);
    setShowFromDropdown(false);
  };

  const handleToCurrencySelect = (currency) => {
    setToCurrency(currency);
    setShowToDropdown(false);
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const converter = converterRef.current;
    const rates = ratesRef.current;

    // Initial state (hidden)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";
    converter.style.opacity = "0";
    converter.style.transform = "translateY(30px)";
    rates.style.opacity = "0";
    rates.style.transform = "translateY(30px)";

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate heading
          setTimeout(() => {
            heading.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0)";
          }, 200);

          // Animate description
          setTimeout(() => {
            description.style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            description.style.opacity = "1";
            description.style.transform = "translateY(0)";
          }, 400);

          // Animate converter
          setTimeout(() => {
            converter.style.transition =
              "opacity 0.8s ease, transform 0.8s ease";
            converter.style.opacity = "1";
            converter.style.transform = "translateY(0)";
          }, 600);

          // Animate rates
          setTimeout(() => {
            rates.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            rates.style.opacity = "1";
            rates.style.transform = "translateY(0)";
          }, 800);

          // Disconnect after animation
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Get currency details
  const getCurrencyDetails = (code) => {
    return (
      allCurrencies.find((c) => c.code === code) || {
        code,
        name: code,
        symbol: "",
      }
    );
  };

  // Get from currency details
  const fromCurrencyDetails = getCurrencyDetails(fromCurrency);
  // Get to currency details
  const toCurrencyDetails = getCurrencyDetails(toCurrency);

  return (
    <section
      ref={sectionRef}
      className="pb-16 md:pb-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white/90"
          >
            Global <span className="text-primary dark:text-primary-content">Currency</span> Converter
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 text-lg"
          >
            Get real-time exchange rates and convert between major currencies
            with our easy-to-use converter.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left: Currency Converter */}
          <div
            ref={converterRef}
            className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">
                Currency Converter
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Last updated: {lastUpdated || "Loading..."}
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
              >
                Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* Currency Selection with Swap Button in Center */}
            <div className="relative mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Currency - Custom Dropdown */}
                <div className="relative" ref={fromDropdownRef}>
                  <label
                    htmlFor="fromCurrency"
                    className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                  >
                    From
                  </label>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                  >
                    <div className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-bold">
                          {fromCurrencyDetails.symbol}
                        </span>
                        <span>
                          {fromCurrencyDetails.code} -{" "}
                          {fromCurrencyDetails.name}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                          showFromDropdown ? "transform rotate-180" : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Dropdown */}
                    {showFromDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-gray-50 dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600">
                          <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                            placeholder="Search currency..."
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              // You can add search functionality here
                            }}
                          />
                        </div>
                        {allCurrencies.map((currency) => (
                          <div
                            key={`from-${currency.code}`}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              fromCurrency === currency.code
                                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent"
                                : "text-gray-800 dark:text-white/90"
                            }`}
                            onClick={() =>
                              handleFromCurrencySelect(currency.code)
                            }
                          >
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                              {currency.symbol}
                            </span>
                            <span>
                              {currency.code} - {currency.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* To Currency - Custom Dropdown */}
                <div className="relative" ref={toDropdownRef}>
                  <label
                    htmlFor="toCurrency"
                    className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                  >
                    To
                  </label>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => setShowToDropdown(!showToDropdown)}
                  >
                    <div className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-bold">
                          {toCurrencyDetails.symbol}
                        </span>
                        <span>
                          {toCurrencyDetails.code} - {toCurrencyDetails.name}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                          showToDropdown ? "transform rotate-180" : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Dropdown */}
                    {showToDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="sticky top-0 bg-gray-50 dark:bg-gray-700 p-2 border-b border-gray-200 dark:border-gray-600">
                          <input
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-accent"
                            placeholder="Search currency..."
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              // You can add search functionality here
                            }}
                          />
                        </div>
                        {allCurrencies.map((currency) => (
                          <div
                            key={`to-${currency.code}`}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              toCurrency === currency.code
                                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent"
                                : "text-gray-800 dark:text-white/90"
                            }`}
                            onClick={() =>
                              handleToCurrencySelect(currency.code)
                            }
                          >
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-xs">
                              {currency.symbol}
                            </span>
                            <span>
                              {currency.code} - {currency.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Swap Button - Centered between dropdowns */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1 z-10 hidden md:block">
                <button
                  onClick={handleSwapCurrencies}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-700 shadow-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 group"
                  aria-label="Swap currencies"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 text-primary dark:text-accent group-hover:-rotate-90 transition-transform duration-300 rotate-90"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zm10-4a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Swap Button */}
              <div className="flex justify-center mt-4 md:hidden">
                <button
                  onClick={handleSwapCurrencies}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zm10-4a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Swap Currencies
                </button>
              </div>
            </div>

            {/* Result */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-600 mt-8">
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary dark:border-accent"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 dark:text-red-400 py-4">
                  {error}
                </div>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500 dark:text-white/60">
                      {amount} {fromCurrency} equals
                    </p>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white/90 mt-1">
                      {convertedAmount} {toCurrency}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-white/60 mt-2">
                      1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button className="px-6 py-2 bg-primary dark:bg-accent text-white font-medium rounded-lg hover:shadow-md transition-all duration-200">
                      Get Started with DigiMoney
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Exchange Rates & Features */}
          <div ref={ratesRef} className="w-full lg:w-1/2">
            {/* Popular Exchange Rates */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white/90">
                Popular Exchange Rates
              </h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary dark:border-accent"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(popularRates).map(([currency, rate]) => (
                    <div
                      key={currency}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-accent/20 flex items-center justify-center text-primary dark:text-accent font-bold">
                          {getCurrencyDetails(currency).symbol}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {currency}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-white/60">
                            {getCurrencyDetails(currency).name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {rate}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-white/60">
                          {fromCurrency}/{currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-content/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary dark:text-primary-content"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-1 text-gray-800 dark:text-white/90">
                  Real-Time Rates
                </h4>
                <p className="text-gray-600 dark:text-white/70">
                  Our currency converter uses real-time market rates updated
                  every hour.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-1 text-gray-800 dark:text-white/90">
                  Fee-Free Transfers
                </h4>
                <p className="text-gray-600 dark:text-white/70">
                  DigiMoney customers enjoy fee-free currency exchanges up to
                  $10,000 per month.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-1 text-gray-800 dark:text-white/90">
                  Mobile Alerts
                </h4>
                <p className="text-gray-600 dark:text-white/70">
                  Set rate alerts and get notified when your target exchange
                  rate is reached.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-content/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary dark:text-primary-content"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold mb-1 text-gray-800 dark:text-white/90">
                  Market Analysis
                </h4>
                <p className="text-gray-600 dark:text-white/70">
                  Access expert currency market analysis and forecasts to make
                  informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
