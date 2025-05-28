import React from "react";

const MobileApp = () => {
  const appFeatures = [
    {
      id: 1,
      icon: "fingerprint",
      title: "Secure Authentication",
      description: "Log in quickly and securely with fingerprint or facial recognition."
    },
    {
      id: 2,
      icon: "transfer",
      title: "Instant Transfers",
      description: "Send money to friends and family with just a few taps."
    },
    {
      id: 3,
      icon: "notification",
      title: "Real-time Alerts",
      description: "Stay informed with instant transaction notifications."
    },
    {
      id: 4,
      icon: "card",
      title: "Card Controls",
      description: "Lock, unlock, or set limits on your cards anytime."
    }
  ];
  
  // Icon component based on name
  const Icon = ({ name }) => {
    switch (name) {
      case "fingerprint":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        );
      case "transfer":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        );
      case "notification":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case "card":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-3">
              Mobile Banking
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Banking at Your Fingertips
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Experience the convenience of banking anytime, anywhere with our award-winning mobile app. Manage your accounts, make payments, and track your spending with ease.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {appFeatures.map((feature) => (
                <div key={feature.id} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={feature.icon} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5675 12.0084C17.5531 9.53125 19.5468 8.10937 19.6359 8.05156C18.4781 6.38906 16.6781 6.15469 16.0422 6.13906C14.5031 5.98594 13.0172 7.04063 12.2344 7.04063C11.4375 7.04063 10.2328 6.15469 8.9297 6.18125C7.23282 6.20781 5.64845 7.15625 4.76564 8.65312C2.9375 11.7188 4.32814 16.2422 6.07501 18.6797C6.95782 19.8703 7.98439 21.2109 9.31564 21.1625C10.6187 21.1141 11.1094 20.3312 12.6766 20.3312C14.2297 20.3312 14.6922 21.1625 16.0516 21.1344C17.4531 21.1141 18.3359 19.9375 19.1891 18.7328C20.2016 17.3453 20.6078 16.0 20.625 15.9375C20.5922 15.9234 17.5859 14.7469 17.5675 12.0084Z"/>
                  <path d="M15.0891 4.33125C15.8016 3.45312 16.2781 2.25937 16.1469 1.05C15.1219 1.09219 13.8469 1.74375 13.1062 2.6075C12.4453 3.37969 11.8734 4.61719 12.0187 5.78906C13.1625 5.87344 14.3625 5.20781 15.0891 4.33125Z"/>
                </svg>
                App Store
              </a>
              <a href="#" className="inline-flex items-center bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.26429 3.60535C4.95406 3.93347 4.75 4.43535 4.75 5.0497V18.9497C4.75 19.5641 4.95406 20.066 5.26429 20.3941L5.35353 20.4722L14.3535 11.5V11.5L5.35353 2.52719L5.26429 3.60535Z"/>
                  <path d="M17.4641 14.6107L14.3535 11.5L17.4641 8.38873L21.1464 10.5387C22.2839 11.1813 22.2839 12.3187 21.1464 12.9613L17.4641 14.6107Z"/>
                  <path d="M17.4641 8.38873L14.3535 11.5L5.35353 2.52719C5.70376 2.13347 6.23023 2.04424 6.84658 2.30535L17.4641 8.38873Z"/>
                  <path d="M17.4641 14.6107L6.84658 20.6941C6.23023 20.9552 5.70376 20.866 5.35353 20.4722L14.3535 11.5L17.4641 14.6107Z"/>
                </svg>
                Google Play
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 mx-auto max-w-xs">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-xl">
                <div className="bg-gray-800 rounded-[2.8rem] overflow-hidden">
                  <div className="relative bg-white">
                    <img 
                      src="/images/app-screenshot.png" 
                      alt="DigiMoney Mobile App" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-gray-900 rounded-b-xl z-20"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -right-16 w-40 h-40 bg-primary/10 rounded-full filter blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full filter blur-lg"></div>
          </div>
        </div>
        
        {/* App ratings */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex items-center">
            <div className="mr-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">4.8 on App Store</p>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="ml-3">
              <p className="font-bold text-gray-900">100K+</p>
              <p className="text-sm text-gray-500">Downloads</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="mr-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-500">4.7 on Google Play</p>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="ml-3">
              <p className="font-bold text-gray-900">10M+</p>
              <p className="text-sm text-gray-500">Transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
