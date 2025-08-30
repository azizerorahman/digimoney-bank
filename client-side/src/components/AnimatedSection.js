import React, { useEffect, useRef, useState } from "react";

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  duration = "duration-700",
  animation = "slideUp",
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  const animations = {
    slideUp: {
      initial: "translate-y-10 opacity-0",
      animate: "translate-y-0 opacity-100",
    },
    slideDown: {
      initial: "-translate-y-10 opacity-0",
      animate: "translate-y-0 opacity-100",
    },
    slideLeft: {
      initial: "translate-x-10 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    slideRight: {
      initial: "-translate-x-10 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    fadeIn: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    scaleIn: {
      initial: "scale-95 opacity-0",
      animate: "scale-100 opacity-100",
    },
    blur: {
      initial: "blur-sm opacity-0",
      animate: "blur-0 opacity-100",
    },
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "50px" }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold, once, hasAnimated]);

  const selectedAnimation = animations[animation] || animations.slideUp;

  return (
    <div
      ref={elementRef}
      className={`transform transition-all ease-out ${duration} ${
        isVisible ? selectedAnimation.animate : selectedAnimation.initial
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
