import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // Create refs for animation elements
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const cardsRef = useRef(null);

  // Animation on component mount
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

    // Animate hero background
    setTimeout(() => {
      hero.style.transition = "opacity 0.6s ease";
      hero.style.opacity = "1";
    }, 100);

    // Animate heading
    setTimeout(() => {
      heading.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      heading.style.opacity = "1";
      heading.style.transform = "translateY(0)";
    }, 300);

    // Animate content
    setTimeout(() => {
      content.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 500);

    // Animate image
    setTimeout(() => {
      image.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      image.style.opacity = "1";
      image.style.transform = "scale(1)";
    }, 700);

    // Animate cards with staggered delay
    Array.from(cards).forEach((card, index) => {
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 900 + index * 200);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-indigo-950 via-primary to-indigo-900 dark:from-gray-900 dark:via-primary dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-white dark:text-base-content">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-primary-content/20 backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium text-accent">
                Smart Banking
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 dark:text-white/90"
            >
              Banking Made <span className="text-accent">Simple</span> and{" "}
              <span className="text-secondary">Secure</span>
            </h1>

            {/* Content area (paragraph and buttons) */}
            <div ref={contentRef}>
              <p className="text-lg md:text-xl text-white/80 dark:text-white/90 mb-8 max-w-2xl">
                Experience the future of digital banking with DigiMoney. Manage
                your finances with confidence, security, and ease from anywhere.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/register"
                  className="group relative px-6 py-3 bg-accent text-white font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  <span className="relative z-10">Open an Account</span>
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 border-2 border-white/80 dark:border-white/90 text-white dark:text-white/90 font-medium rounded-lg hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 dark:text-white/90">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-secondary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>FDIC Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-secondary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-secondary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Illustration */}
          <div className="w-full lg:w-1/2 relative">
            <div
              ref={imageRef}
              className="bg-white/10 dark:bg-base-100/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Digital Banking"
                className="w-full h-auto rounded-xl"
              />

              {/* AI Badge overlay */}
              <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 dark:bg-base-content/20 backdrop-blur-md text-white dark:text-base-content text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                AI-Powered
              </div>
            </div>

            {/* Floating Cards Container */}
            <div ref={cardsRef}>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white dark:bg-base-100 p-4 rounded-lg shadow-lg max-w-xs border border-gray-100 dark:border-base-content/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent"
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
                    <p className="text-sm text-gray-600 dark:text-base-content/70">
                      Total Savings
                    </p>
                    <p className="text-lg font-bold text-primary">$2.4M+</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-200 dark:bg-base-content/20 rounded-full mb-2">
                  <div className="h-1 bg-accent rounded-full animate-growWidth"></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-base-content/60">
                  Customers saved with our tools in 2024
                </p>
              </div>

              {/* Floating Security Card */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-white dark:bg-base-100 p-4 rounded-lg shadow-lg max-w-xs border border-gray-100 dark:border-base-content/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-secondary"
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
                      <p className="text-sm text-gray-600 dark:text-base-content/70">
                        Security Rating
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      A+ Certified
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-base-content/60">
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
