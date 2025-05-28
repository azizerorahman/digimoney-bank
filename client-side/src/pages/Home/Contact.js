import React, { useState, useEffect, useRef } from "react";
import map from "../../assets/images/map.png";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
 const [mapLoadError, setMapLoadError] = useState(false);
const [iframeLoaded, setIframeLoaded] = useState(false);

  // Create refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const iframeRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormErrors({});

      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    const map = mapRef.current;

    // Initial state (hidden)
    heading.style.opacity = "0";
    heading.style.transform = "translateY(20px)";
    description.style.opacity = "0";
    description.style.transform = "translateY(20px)";
    form.style.opacity = "0";
    form.style.transform = "translateY(30px)";
    info.style.opacity = "0";
    info.style.transform = "translateY(30px)";
    map.style.opacity = "0";
    map.style.transform = "translateY(30px)";

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

          // Animate form
          setTimeout(() => {
            form.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            form.style.opacity = "1";
            form.style.transform = "translateY(0)";
          }, 600);

          // Animate info
          setTimeout(() => {
            info.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            info.style.opacity = "1";
            info.style.transform = "translateY(0)";
          }, 800);

          // Animate map
          setTimeout(() => {
            map.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            map.style.opacity = "1";
            map.style.transform = "translateY(0)";
          }, 1000);

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

  useEffect(() => {
  if (iframeLoaded || mapLoadError) return;
  const timer = setTimeout(() => {
    setMapLoadError(true);
  }, 5000);
  return () => clearTimeout(timer);
}, [iframeLoaded, mapLoadError]);

const handleIframeLoad = () => {
  setIframeLoaded(true);
  setMapLoadError(false);
};
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white/90"
          >
            Get in{" "}
            <span className="text-primary dark:text-primary-content">
              Touch
            </span>{" "}
            With Us
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto text-gray-600 dark:text-white/70 text-lg"
          >
            Have questions or need assistance? Our dedicated team is here to
            help you with all your banking and financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white/90">
              Send Us a Message
            </h3>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg">
                <p className="text-green-700 dark:text-green-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg">
                <p className="text-red-700 dark:text-red-400 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Something went wrong. Please try again later.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-lg border ${
                      formErrors.name
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                    } text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-lg border ${
                      formErrors.email
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                    } text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200"
                  placeholder="(123) 456-7890"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    formErrors.subject
                      ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                  } text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200`}
                  placeholder="How can we help you?"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-white/70 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`block w-full px-4 py-3 rounded-lg border ${
                    formErrors.message
                      ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                  } text-gray-800 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all duration-200`}
                  placeholder="Please describe how we can assist you..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 focus:ring-3 focus:ring-primary dark:focus:ring-accent"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="privacy"
                    className="text-gray-600 dark:text-white/70"
                  >
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      className="text-primary dark:text-accent hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary dark:bg-accent text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-between gap-8 lg:gap-12">
            {/* Contact Info Card */}
            <div
              ref={infoRef}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white/90">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-accent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                      Our Location
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">
                      152/1, D Block, Shuangliu
                      <br />
                      Chengdu, Sichuan, 610000
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-accent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                      Call Us
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">
                      <a
                        href="tel:+8618001234567"
                        className="hover:text-primary dark:hover:text-accent transition-colors"
                      >
                        +86 1800 123 4567
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-accent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                      Email Us
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white/70 mt-1">
                      <a
                        href="mailto:support@digimoney.com"
                        className="hover:text-primary dark:hover:text-accent transition-colors"
                      >
                        support@digimoney.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-900 dark:text-white/90 mb-3">
                  Follow Us
                </p>
                <div className="flex space-x-4">
                  <a
                    href="/"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-white/70 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div
              ref={mapRef}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white/90">
                Find Us
              </h3>
              <div className="rounded-lg overflow-hidden h-64 bg-gray-100 dark:bg-gray-700">
  <div className="w-full h-full relative">
    {!mapLoadError ? (
      <iframe
        ref={iframeRef}
        src="https://www.openstreetmap.org/export/embed.html?bbox=104.00861978530885%2C30.52544836359175%2C104.02278184890748%2C30.53374719811603&amp;layer=mapnik&amp;marker=30.529597869463927%2C104.01570081710815"
        title="DigiMoney Location Map"
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        style={{
          borderRadius: "inherit",
          backgroundColor: "transparent",
        }}
        onLoad={handleIframeLoad}
        onError={() => setMapLoadError(true)}
      />
    ) : (
      <img
        src={map}
        alt="DigiMoney Location Map"
        className="w-full h-full object-none"
        style={{ borderRadius: "inherit" }}
      />
    )}
    <div className="absolute top-2 right-2 z-10">
      {!mapLoadError ? (
        <a
          href="https://www.openstreetmap.org/?mlat=30.5296&mlon=104.0157#map=17/30.5296/104.0157"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-md text-primary dark:text-accent hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          View Larger Map
        </a>
      ) : (
        <a
          href="https://surl.amap.com/AxLFxgZlaiK"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-md text-primary dark:text-accent hover:bg-white dark:hover:bg-gray-800 transition-colors"
        >
          View Larger Map
        </a>
      )}
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
