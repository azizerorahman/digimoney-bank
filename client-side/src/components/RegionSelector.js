import { useState, useEffect, useCallback } from "react";
import { Globe, ChevronDown } from "lucide-react";

const RegionSelector = ({ scrolled, isMobile = false, onMobileClose }) => {
    const [region, setRegion] = useState(() => {
        return localStorage.getItem("region") || "global";
    });
    const [isDetecting, setIsDetecting] = useState(false);

    const detectAndSetRegion = useCallback(async () => {
        setIsDetecting(true);
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();

            let detectedRegion = "global";

            if (data.country_code === "CN" || data.country_name === "China") {
                detectedRegion = "china";
            }

            setRegion(detectedRegion);
            localStorage.setItem("region", detectedRegion);
        } catch (error) {
            console.error("Error detecting IP location:", error);

            try {
                const ipResponse = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipResponse.json();

                const locationResponse = await fetch(
                    `http://ip-api.com/json/${ipData.ip}`
                );
                const locationData = await locationResponse.json();

                let detectedRegion = "global";

                if (
                    locationData.countryCode === "CN" ||
                    locationData.country === "China"
                ) {
                    detectedRegion = "china";
                }

                setRegion(detectedRegion);
                localStorage.setItem("region", detectedRegion);
            } catch (fallbackError) {
                console.error("Fallback IP detection also failed:", fallbackError);
            }
        } finally {
            setIsDetecting(false);
        }
    }, []);

    useEffect(() => {
        detectAndSetRegion();
    }, [detectAndSetRegion]);

    const handleRegionChange = (newRegion) => {
        setRegion(newRegion);
        localStorage.setItem("region", newRegion);

        if (isMobile && onMobileClose) {
            onMobileClose();
        }
    };

    const handleManualDetection = () => {
        detectAndSetRegion();
    };

    const regions = [
        {
            id: "global",
            name: "Global",
            flag: "🌍",
            description: "International services",
        },
        {
            id: "china",
            name: "China",
            flag: "🇨🇳",
            description: "中国大陆服务",
        },
    ];

    const currentRegion = regions.find((r) => r.id === region);

    if (!isMobile) {
        return (
            <div className="dropdown dropdown-end">
                <label
                    tabIndex="0"
                    className={`btn btn-sm border-0 gap-2 transition-all duration-300 hover:scale-105 ${
                        scrolled
                            ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-900 dark:bg-indigo-800 dark:hover:bg-indigo-700 dark:text-white"
                            : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                    } ${isDetecting ? "loading" : ""}`}
                >
                    <span className="text-lg">{currentRegion?.flag}</span>
                    <span className="hidden sm:inline font-medium">
                        {isDetecting ? "Detecting..." : currentRegion?.name}
                    </span>
                    <ChevronDown className="w-3 h-3" />
                </label>
                <ul
                    tabIndex="0"
                    className={`dropdown-content z-[1] menu p-2 shadow-xl rounded-xl w-64 backdrop-blur-md animate-fadeIn border ${
                        scrolled
                            ? "bg-white/95 text-gray-800 border-gray-200 dark:bg-gray-800/95 dark:text-white dark:border-gray-600"
                            : "bg-indigo-900/90 text-white border-indigo-800"
                    }`}
                >
                    <li className="menu-title px-3 py-2">
                        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                            <Globe className="w-3 h-3" />
                            Select Region
                            {isDetecting && (
                                <span className="loading loading-spinner loading-xs"></span>
                            )}
                        </span>
                    </li>
                    {regions.map((regionOption) => (
                        <li key={regionOption.id}>
                            <button
                                onClick={() => handleRegionChange(regionOption.id)}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-opacity-10 hover:bg-gray-400 ${
                                    region === regionOption.id
                                        ? scrolled
                                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-l-4 border-emerald-500"
                                            : "bg-emerald-500/20 text-emerald-300 border-l-4 border-emerald-400"
                                        : ""
                                }`}
                            >
                                <span className="text-xl">{regionOption.flag}</span>
                                <div className="flex flex-col items-start">
                                    <span className="font-medium">{regionOption.name}</span>
                                    <span className="text-xs opacity-70">
                                        {regionOption.description}
                                    </span>
                                </div>
                                {region === regionOption.id && (
                                    <div className="ml-auto">
                                        <div
                                            className={`w-2 h-2 rounded-full ${
                                                scrolled ? "bg-emerald-500" : "bg-emerald-400"
                                            }`}
                                        ></div>
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`border-t mt-2 pt-2 ${
                            scrolled
                                ? "border-gray-200 dark:border-gray-600"
                                : "border-indigo-700"
                        }`}
                    >
                        <button
                            onClick={handleManualDetection}
                            disabled={isDetecting}
                            className={`flex items-center gap-2 p-2 text-xs transition-colors ${
                                scrolled
                                    ? "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    : "text-indigo-300 hover:text-white"
                            }`}
                        >
                            <Globe className="w-3 h-3" />
                            {isDetecting ? "Detecting..." : "Auto-detect region"}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div className="px-5 py-3 border-b border-white/10">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-70">Region:</span>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex="0"
                        className={`btn btn-sm bg-white/10 border-0 gap-2 hover:bg-white/20 transition-colors ${
                            isDetecting ? "loading" : ""
                        }`}
                    >
                        <span className="text-lg">{currentRegion?.flag}</span>
                        <span className="font-medium">
                            {isDetecting ? "Detecting..." : currentRegion?.name}
                        </span>
                        <ChevronDown className="w-3 h-3" />
                    </label>
                    <ul
                        tabIndex="0"
                        className="dropdown-content z-[1] menu p-2 shadow-xl rounded-xl w-56 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 backdrop-blur-md"
                    >
                        <li className="menu-title px-3 py-2">
                            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                <Globe className="w-3 h-3" />
                                Select Region
                                {isDetecting && (
                                    <span className="loading loading-spinner loading-xs"></span>
                                )}
                            </span>
                        </li>
                        {regions.map((regionOption) => (
                            <li key={regionOption.id}>
                                <button
                                    onClick={() => handleRegionChange(regionOption.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                        region === regionOption.id
                                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-l-4 border-emerald-500"
                                            : ""
                                    }`}
                                >
                                    <span className="text-lg">{regionOption.flag}</span>
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">{regionOption.name}</span>
                                        <span className="text-xs opacity-70">
                                            {regionOption.description}
                                        </span>
                                    </div>
                                    {region === regionOption.id && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        </div>
                                    )}
                                </button>
                            </li>
                        ))}
                        <li className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                            <button
                                onClick={handleManualDetection}
                                disabled={isDetecting}
                                className="flex items-center gap-2 p-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <Globe className="w-3 h-3" />
                                {isDetecting ? "Detecting..." : "Auto-detect region"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RegionSelector;
