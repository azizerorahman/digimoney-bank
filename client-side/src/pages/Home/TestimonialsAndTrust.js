import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Keyboard,
  EffectFade,
  EffectCreative,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Mock testimonial data (to be replaced with actual API fetch later)
const testimonialData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Personal Banking Customer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "The AI-powered insights have completely transformed how I manage my finances. I've saved over $2,000 in the past year by following DigiMoney's personalized recommendations.",
    rating: 5,
    featured: false,
    borderColor: "primary",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Small Business Owner",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "As a small business owner, DigiMoney's integrated platform has streamlined our operations tremendously. The instant payment processing and automated accounting features have saved us countless hours each month.",
    rating: 5,
    featured: true,
    borderColor: "white",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Premium Account Holder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "The security features at DigiMoney Bank are unmatched. I love the biometric authentication and real-time notifications. I feel completely confident that my money is safe and secure.",
    rating: 5,
    featured: false,
    borderColor: "secondary",
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Student Banking Customer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "The mobile app is incredibly intuitive! As a student, I love the automatic savings feature that rounds up my purchases and helps me build my emergency fund without even thinking about it.",
    rating: 5,
    featured: false,
    borderColor: "accent",
  },
  {
    id: 5,
    name: "James Peterson",
    role: "Retirement Planning Client",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "DigiMoney's retirement planning tools gave me clarity about my financial future. The personalized roadmap and investment suggestions have put me on track to retire 5 years earlier than I initially planned.",
    rating: 5,
    featured: false,
    borderColor: "primary",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    role: "International Banking User",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    quote:
      "The international transfer rates are the best I've found, and the process is seamless. I regularly send money to family abroad, and DigiMoney has made it affordable and instant.",
    rating: 5,
    featured: false,
    borderColor: "secondary",
  },
];

const TestimonialsAndTrust = () => {
  // Create refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const trustBadgesRef = useRef(null);
  const swiperRef = useRef(null);

  // Swiper breakpoints for responsive design
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const trustBadges = trustBadgesRef.current;

    // Initial state (hidden)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";

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

          // Animate trust badges with staggered delay
          const trustItems = trustBadges.querySelectorAll(".trust-badge");
          trustItems.forEach((badge, index) => {
            setTimeout(() => {
              badge.style.transition = "opacity 0.5s ease, transform 0.5s ease";
              badge.style.opacity = "1";
              badge.style.transform = "translateY(0)";
            }, 1000 + index * 100);
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

  // Apply initial styles to trust badges
  useEffect(() => {
    if (trustBadgesRef.current) {
      const trustItems =
        trustBadgesRef.current.querySelectorAll(".trust-badge");
      trustItems.forEach((badge) => {
        badge.style.opacity = "0";
        badge.style.transform = "translateY(20px)";
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pb-16 md:pb-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white/90"
          >
            Trusted by{" "}
            <span className="text-primary dark:text-primary-content">
              Thousands
            </span>{" "}
            of Happy Customers
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 text-lg"
          >
            See what our customers have to say about their experience with
            DigiMoney Bank's innovative digital banking solutions.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div ref={testimonialsRef} className="relative mb-20">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Pagination, Navigation, Keyboard, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            breakpoints={breakpoints}
            loop={true}
            className="testimonial-swiper px-4 py-8"
          >
            {testimonialData.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto">
                <div
                  className={`testimonial-card group p-6 rounded-2xl h-full ${
                    testimonial.featured
                      ? "bg-gradient-to-br from-indigo-900 to-primary text-white shadow-lg border border-indigo-800"
                      : "bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
                  } hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col`}
                >
                  {testimonial.featured && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-accent text-white text-xs font-bold rounded-bl-lg">
                      Featured
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                  <div className="relative z-10 flex flex-col flex-grow">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote
                      className={`${
                        testimonial.featured
                          ? "text-white/90"
                          : "text-gray-600 dark:text-white/70"
                      } mb-6 flex-grow min-h-[110px]`}
                    >
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author - Always at the bottom */}
                    <div className="flex items-center mt-auto pt-4 border-t border-gray-100/10">
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden mr-4 border-2 ${
                          testimonial.featured
                            ? "border-white/30"
                            : `border-${testimonial.borderColor}/20 dark:border-${testimonial.borderColor}/40`
                        }`}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4
                          className={`font-bold ${
                            testimonial.featured
                              ? "text-white"
                              : "text-gray-800 dark:text-white/90"
                          }`}
                        >
                          {testimonial.name}
                        </h4>
                        <p
                          className={`text-sm ${
                            testimonial.featured
                              ? "text-white/70"
                              : "text-gray-500 dark:text-white/60"
                          }`}
                        >
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <div className="swiper-button-prev !text-teal-500 dark:!text-teal-400 !w-10 !h-10 !rounded-full !bg-white dark:!bg-gray-800 !shadow-lg after:!text-lg"></div>
          <div className="swiper-button-next !text-teal-500 dark:!text-teal-400 !w-10 !h-10 !rounded-full !bg-white dark:!bg-gray-800 !shadow-lg after:!text-lg"></div>
        </div>

        {/* Trust Badges */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white/90">
            Trusted by Industry Leaders
          </h3>

          <div
            ref={trustBadgesRef}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
          >
            {/* Badge 1 */}
            <div className="trust-badge group">
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10H40C45.523 10 50 14.477 50 20V30C50 35.523 45.523 40 40 40H20C14.477 40 10 35.523 10 30V20C10 14.477 14.477 10 20 10Z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M30 15L35 25L30 35H25L30 25L25 15H30Z"
                    fill="white"
                  />
                  <path
                    d="M70 10H90C95.523 10 100 14.477 100 20V30C100 35.523 95.523 40 90 40H70C64.477 40 60 35.523 60 30V20C60 14.477 64.477 10 70 10Z"
                    fill="#4F46E5"
                  />
                  <path d="M80 15V35H75V15H80Z" fill="white" />
                  <path d="M85 15V20H75V15H85Z" fill="white" />
                  <path d="M85 25V30H75V25H85Z" fill="white" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                FDIC Member
              </p>
            </div>

            {/* Badge 2 */}
            <div className="trust-badge group">
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 10C38.954 10 30 18.954 30 30C30 41.046 38.954 50 50 50C61.046 50 70 41.046 70 30C70 18.954 61.046 10 50 10Z"
                    fill="#10B981"
                  />
                  <path
                    d="M50 15C41.716 15 35 21.716 35 30C35 38.284 41.716 45 50 45C58.284 45 65 38.284 65 30C65 21.716 58.284 15 50 15Z"
                    fill="white"
                  />
                  <path
                    d="M50 20C44.477 20 40 24.477 40 30C40 35.523 44.477 40 50 40C55.523 40 60 35.523 60 30C60 24.477 55.523 20 50 20Z"
                    fill="#10B981"
                  />
                  <path d="M47 25L53 30L47 35V25Z" fill="white" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                Norton Secured
              </p>
            </div>

            {/* Badge 3 */}
            <div className="trust-badge group">
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10H80C85.523 10 90 14.477 90 20V30C90 35.523 85.523 40 80 40H20C14.477 40 10 35.523 10 30V20C10 14.477 14.477 10 20 10Z"
                    fill="#F59E0B"
                  />
                  <circle cx="30" cy="25" r="10" fill="white" />
                  <circle cx="50" cy="25" r="10" fill="white" />
                  <path
                    d="M60 25C60 19.477 55.523 15 50 15C44.477 15 40 19.477 40 25C40 30.523 44.477 35 50 35C55.523 35 60 30.523 60 25Z"
                    fill="#F59E0B"
                  />
                  <circle cx="70" cy="25" r="10" fill="white" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                MasterCard Secure
              </p>
            </div>

            {/* Badge 4 */}
            <div className="trust-badge group">
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 10H80C85.523 10 90 14.477 90 20V30C90 35.523 85.523 40 80 40H20C14.477 40 10 35.523 10 30V20C10 14.477 14.477 10 20 10Z"
                    fill="#0EA5E9"
                  />
                  <path d="M30 20L40 30H30V20Z" fill="white" />
                  <path d="M50 20H40V30L50 20Z" fill="white" />
                  <path d="M50 20L60 30H50V20Z" fill="white" />
                  <path d="M70 20H60V30L70 20Z" fill="white" />
                  <path d="M70 20L80 30H70V20Z" fill="white" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                Visa Verified
              </p>
            </div>

            {/* Badge 5 */}
            <div className="trust-badge group">
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M50 10L60 20H40L50 10Z" fill="#EC4899" />
                  <path d="M40 20V30H30V40H20L20 20H40Z" fill="#EC4899" />
                  <path d="M60 20V30H70V40H80V20H60Z" fill="#EC4899" />
                  <path d="M40 30H60V40H40V30Z" fill="#EC4899" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50 mt-2">
                SSL Secured
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2">
              2.5M+
            </div>
            <p className="text-gray-600 dark:text-white/70">Happy Customers</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2">
              $4.7B
            </div>
            <p className="text-gray-600 dark:text-white/70">Assets Managed</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2">
              99.9%
            </div>
            <p className="text-gray-600 dark:text-white/70">Uptime Guarantee</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 text-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-3xl md:text-4xl font-bold text-primary dark:text-accent mb-2">
              24/7
            </div>
            <p className="text-gray-600 dark:text-white/70">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndTrust;
