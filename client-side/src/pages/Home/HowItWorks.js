import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  // Create refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepsRef = useRef(null);
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animations with improved performance
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const steps = stepsRef.current;
    const image = imageRef.current;
    const stepItems = steps.querySelectorAll(".step-item");

    // Initial state (hidden)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";
    image.style.opacity = "0";
    image.style.transform = "translateX(20px)";

    // Apply to all step items
    stepItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
    });

    // Create observer with better options for performance
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px", // Trigger slightly before fully in view
      }
    );

    observer.observe(section);

    // Animation sequence when visible
    if (isVisible) {
      // Animate heading with spring-like motion
      setTimeout(() => {
        heading.style.transition =
          "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";
      }, 100);

      // Animate description with improved easing
      setTimeout(() => {
        description.style.transition =
          "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        description.style.opacity = "1";
        description.style.transform = "translateY(0)";
      }, 250);

      // Animate image with subtle bounce
      setTimeout(() => {
        image.style.transition =
          "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        image.style.opacity = "1";
        image.style.transform = "translateX(0)";
      }, 400);

      // Animate step items with optimized staggered delay
      stepItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition =
            "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, 600 + index * 150);
      });
    }

    // Cleanup observer
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden relative"
      aria-label="How DigiMoney Works Section"
    >
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 mb-5">
            <span className="text-sm font-medium text-primary dark:text-primary-content">
              Simple Process
            </span>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white/90 tracking-tight"
          >
            How{" "}
            <span className="text-primary dark:text-primary-content">
              DigiMoney
            </span>{" "}
            Works for You
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 text-lg leading-relaxed"
          >
            Our seamless digital banking experience is designed to make your
            financial journey simple, secure, and rewarding from day one.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left: Steps */}
          <div ref={stepsRef} className="w-full lg:w-1/2 space-y-6">
            {/* Step 1 */}
            <div className="step-item flex gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white/90">
                  Create Your Account
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  Sign up in minutes with our streamlined application process.
                  No paperwork, no branch visits—just simple, secure digital
                  onboarding.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-item flex gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-xl font-bold text-secondary">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white/90">
                  Connect Your Finances
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  Link your existing accounts and financial services to get a
                  complete view of your money in one secure dashboard.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-item flex gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white/90">
                  Receive Personalized Insights
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  Our AI analyzes your spending patterns and financial goals to
                  provide actionable recommendations tailored just for you.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="step-item flex gap-4 p-6 rounded-2xl bg-gradient-to-br from-indigo-900 to-primary text-white shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-800">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold text-white">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Grow Your Wealth
                </h3>
                <p className="text-white/80">
                  Take advantage of our smart savings tools, investment options,
                  and automated features to build your financial future.
                </p>
                <div className="mt-3 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                    Most Popular
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image/Illustration */}
          <div ref={imageRef} className="w-full lg:w-1/2 relative">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="DigiMoney Banking Process"
                className="w-full h-auto rounded-xl"
              />

              {/* Overlay elements */}
              <div className="absolute top-12 right-12 flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-accent"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Verified
                </span>
              </div>

              {/* Floating chart */}
              <div className="absolute bottom-16 -left-6 md:-left-10 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-[200px] border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white/90">
                    Growth Trend
                  </h4>
                  <span className="text-xs text-green-500">+24%</span>
                </div>
                <div className="h-16 flex items-end gap-1">
                  {[30, 45, 25, 60, 75, 45, 65, 80].map((height, index) => (
                    <div
                      key={index}
                      className="w-3 bg-primary/80 dark:bg-primary/60 rounded-t"
                      style={{
                        height: `${height}%`,
                        animation: `growHeight 1s ease-out ${index * 0.1}s`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-white/60">
                    Your savings are growing faster than 80% of users
                  </p>
                </div>
              </div>

              {/* Security badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
