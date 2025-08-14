import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // Create refs for animation elements
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on component mount with IntersectionObserver for better performance
  useEffect(() => {
    // Elements to animate
    const hero = heroRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const cards = cardsRef.current.children;

    // Initial state (hidden)
    hero.style.opacity = "0";
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    content.style.opacity = "0";
    content.style.transform = "translateY(20px)";
    image.style.opacity = "0";
    image.style.transform = "scale(0.95)";

    // Apply to all cards
    Array.from(cards).forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
    });

    // Create IntersectionObserver for triggering animations when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    // Animation sequence
    if (isVisible) {
      // Animate hero background with easing
      hero.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      hero.style.opacity = "1";

      // Animate heading with spring-like motion
      setTimeout(() => {
        heading.style.transition =
          "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";
      }, 200);

      // Animate content
      setTimeout(() => {
        content.style.transition =
          "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 400);

      // Animate image with subtle bounce
      setTimeout(() => {
        image.style.transition =
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        image.style.opacity = "1";
        image.style.transform = "scale(1)";
      }, 600);

      // Animate cards with staggered delay and better easing
      Array.from(cards).forEach((card, index) => {
        setTimeout(() => {
          card.style.transition =
            "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 800 + index * 150);
      });
    }

    // Cleanup observer
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={heroRef}
      className="pt-24 md:pt-32 lg:pt-36 pb-20 md:pb-28 lg:pb-32 bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800 overflow-hidden"
      aria-label="Hero Section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 xl:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10 text-white dark:text-base-content">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/80 dark:bg-primary-content/20 backdrop-blur-sm mb-7 shadow-lg"
              aria-label="Smart Banking Feature"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium text-accent tracking-wide">
                Smart Banking
              </span>
            </div>
            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 text-white"
            >
              Banking Made <span className="text-accent">Simple</span> and{" "}
              <span className="text-secondary">Secure</span>
            </h1>
            {/* Content area (paragraph and buttons) */}
            <div ref={contentRef} className="space-y-8">
              <p className="text-lg sm:text-xl text-white/90 dark:text-white/90 leading-relaxed max-w-2xl">
                Experience the future of digital banking with DigiMoney. Manage
                your finances with confidence, security, and ease from anywhere.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 sm:gap-5">
                <Link
                  to="/register"
                  className="group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-accent text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 focus:ring-2 focus:ring-teal-500/50 focus:outline-none focus:ring-offset-2 focus:ring-offset-indigo-900"
                  aria-label="Open a Bank Account"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Open an Account</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  <span className="absolute inset-0 bg-teal-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
                <Link
                  to="/products"
                  className="group px-6 py-3.5 sm:px-8 sm:py-4 border-2 border-purple-400/80 text-white dark:text-purple-200 font-medium rounded-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400/50 focus:outline-none focus:ring-offset-2 focus:ring-offset-indigo-900 hover:bg-purple-400/20"
                  aria-label="Explore Banking Services"
                >
                  <span className="flex items-center gap-2">
                    <span>Explore Services</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-4 text-white/90 dark:text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/30 flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-teal-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">FDIC Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-indigo-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5.001 5.001 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
            <div
              ref={imageRef}
              className="bg-white/10 dark:bg-base-100/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl overflow-hidden border border-white/10"
            >
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Digital Banking Interface"
                className="w-full h-auto rounded-xl shadow-lg"
                loading="eager"
              />

              {/* AI Badge overlay */}
              <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/80 backdrop-blur-md text-teal-400 text-sm font-medium shadow-lg">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>AI Assistant</span>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/40 rounded-full blur-3xl"></div>
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-teal-500/40 rounded-full blur-3xl"></div>
            </div>

            {/* Floating Cards Container */}
            <div ref={cardsRef}>
              {/* Floating Stats Card - Improved for consistency */}
              <div className="absolute hidden sm:block -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-lg shadow-xl max-w-[240px] border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shadow-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6 text-teal-600 dark:text-teal-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                      Total Savings
                    </p>
                    <p className="text-lg md:text-xl font-bold text-teal-600 dark:text-teal-400">
                      $2.4M+
                    </p>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full mb-3 overflow-hidden">
                  <div className="h-2 bg-teal-500 dark:bg-teal-400 rounded-full w-0 animate-[growWidth_1.5s_ease-out_forwards]"></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Customers saved with our tools in 2025
                </p>
              </div>

              {/* Floating Security Card - Fixed positioning to avoid overflow */}
              <div className="absolute hidden sm:block -top-6 -right-6 md:-top-8 md:-right-8 bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-lg shadow-xl max-w-[240px] border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-transform z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center shadow-inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                        Security Rating
                      </p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100">
                        New
                      </span>
                    </div>
                    <p className="text-lg md:text-xl font-bold text-purple-600 dark:text-purple-400">
                      A+ Certified
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Advanced protection for your financial data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
