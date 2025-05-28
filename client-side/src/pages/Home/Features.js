import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Features = () => {
  // Create refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const features = featuresRef.current;
    const featureItems = features.querySelectorAll('.feature-card');

    // Initial state (hidden)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";

    // Apply to all feature cards
    featureItems.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
    });

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
            description.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            description.style.opacity = "1";
            description.style.transform = "translateY(0)";
          }, 400);

          // Animate feature cards with staggered delay
          featureItems.forEach((card, index) => {
            setTimeout(() => {
              card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 600 + index * 150);
          });

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

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white/90"
          >
            <span className="text-primary dark:text-primary-content">Smart</span> Banking Features for{" "}
            <span className="text-accent">Modern</span> Life
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 text-lg"
          >
            DigiMoney Bank combines cutting-edge technology with personalized service
            to provide you with the tools you need to manage your finances effortlessly.
          </p>
        </div>

        {/* Features grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Feature 1 */}
          <div className="feature-card group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary-content/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-primary dark:text-primary-content"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white/90">Personalized Banking</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                AI-powered insights tailored to your financial habits and goals, helping you make smarter decisions with your money.
              </p>
              
              <div className="flex items-center mt-auto">
                <Link
                  to="#"
                  className="text-primary dark:text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white/90">Enhanced Security</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                Advanced biometric authentication, real-time fraud detection, and end-to-end encryption to keep your finances secure.
              </p>
              
              <div className="flex items-center mt-auto">
                <Link
                  to="#"
                  className="text-secondary dark:text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 dark:from-accent/10 dark:to-secondary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white/90">Smart Investing</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                Automated investment portfolios with real-time market analysis and personalized recommendations for your financial goals.
              </p>
              
              <div className="flex items-center mt-auto">
                <Link
                  to="#"
                  className="text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary-content/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-primary dark:text-primary-content"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white/90">Instant Transfers</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                Send and receive money instantly with zero fees between DigiMoney accounts, and competitive rates for international transfers.
              </p>
              
              <div className="flex items-center mt-auto">
                <Link
                  to="#"
                  className="text-primary dark:text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-card group p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 dark:from-secondary/10 dark:to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white/90">Virtual Cards</h3>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                Create unlimited virtual cards for online shopping with custom spending limits and one-click card freezing for added security.
              </p>
              
              <div className="flex items-center mt-auto">
                <Link
                  to="#"
                  className="text-secondary dark:text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 6 - Highlighted */}
          <div className="feature-card group p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">Instant Credit Decisions</h3>
              <p className="text-white/80 mb-4">
                Get pre-approved for loans and credit cards in seconds with our AI-powered credit assessment system.
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <Link
                  to="/credit"
                  className="text-white font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                >
                  Apply now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                  Popular
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 border border-gray-100 dark:border-gray-700 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white/90">
            Ready to experience modern banking?
          </h3>
          <p className="text-gray-600 dark:text-white/70 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their financial experience with DigiMoney Bank.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Open an Account
            </Link>
            <Link
              to="/demo"
              className="px-6 py-3 border-2 border-primary dark:border-accent text-primary dark:text-accent font-medium rounded-lg hover:bg-primary/5 dark:hover:bg-accent/5 transition-all duration-300"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
