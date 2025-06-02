import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useUserInfo from '../../hooks/useUserInfo';
import { useState, useEffect } from 'react';

const BalanceCard = () => {
  const [user] = useAuthState(auth);
    const uId = localStorage.getItem("userId");
  console.log("User ID from Balance Card:", uId);
  const { userInfo, isLoading: dataLoading } = useUserInfo(uId);
  const [isLoading, setIsLoading] = useState(true);

  // Extended loading state (original loading + 5 seconds)
  useEffect(() => {
    if (!dataLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000); // 5 seconds additional loading time
      
      return () => clearTimeout(timer);
    }
  }, [dataLoading]);

  // Format account number to look like a card number
  const formatAccountNumber = (accountNumber) => {
    if (!accountNumber) return '•••• •••• •••• ••••';
    
    // Convert to string first to ensure we can use string methods
    let accountStr = String(accountNumber);
    
    // Pad the account number to 16 digits if it's shorter
    while (accountStr.length < 16) {
      accountStr = '0' + accountStr;
    }
    
    // If it's longer than 16 digits, truncate it
    if (accountStr.length > 16) {
      accountStr = accountStr.substring(0, 16);
    }
    
    // Add spaces every 4 digits
    return accountStr.replace(/(\d{4})/g, '$1 ').trim();
  };

  if (isLoading || dataLoading) {
    return (
      <div className="card bg-[#6160DC] dark:bg-[#514fbd] shadow-xl rounded-xl h-full min-h-[200px] w-full flex flex-col animate-pulse">
        <div className="p-5 flex-grow flex flex-col justify-between relative">
          {/* Top row with chip and bank name - skeleton */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-8 h-6 bg-gray-300/30 dark:bg-gray-200/20 rounded-sm mr-3"></div>
              <div className="w-6 h-6">
                <div className="w-6 h-4 bg-gray-300/30 dark:bg-gray-200/20 rounded-t-full"></div>
              </div>
            </div>
            <div>
              <div className="w-8 h-8 bg-gray-300/30 dark:bg-gray-200/20 rounded-full"></div>
            </div>
          </div>

          {/* Balance section - skeleton */}
          <div className="my-4">
            <div className="h-5 bg-gray-300/30 dark:bg-gray-200/20 rounded w-24 mb-3"></div>
            <div className="h-9 bg-gray-300/30 dark:bg-gray-200/20 rounded w-48"></div>
          </div>

          {/* Card number - skeleton */}
          <div className="text-center my-4">
            <div className="h-6 bg-gray-300/30 dark:bg-gray-200/20 rounded w-48 mx-auto"></div>
          </div>

          {/* Footer info - skeleton */}
          <div className="flex justify-between items-end mt-auto">
            <div>
              <div className="h-3 bg-gray-300/30 dark:bg-gray-200/20 rounded w-20 mb-1"></div>
              <div className="h-5 bg-gray-300/30 dark:bg-gray-200/20 rounded w-24"></div>
            </div>
            <div className="flex items-end">
              <div className="mr-4">
                <div className="h-3 bg-gray-300/30 dark:bg-gray-200/20 rounded w-20 mb-1"></div>
                <div className="h-5 bg-gray-300/30 dark:bg-gray-200/20 rounded w-16"></div>
              </div>
              <div className="flex">
                <div className="w-5 h-5 bg-gray-300/30 dark:bg-gray-200/20 rounded-full"></div>
                <div className="w-5 h-5 bg-gray-300/30 dark:bg-gray-200/20 rounded-full -ml-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Parse the amount to a number if it's a string
  const balanceAmount = typeof userInfo.amount === 'string' 
    ? parseInt(userInfo.amount, 10) 
    : userInfo.amount || 0;

  return (
    <div className="card bg-[#6160DC] dark:bg-[#514fbd] text-white shadow-xl rounded-xl h-full min-h-[200px] w-full flex flex-col">
      <div className="p-5 flex-grow flex flex-col justify-between relative">
        {/* Top row with chip and bank name */}
        <div className="flex justify-between items-start mb-4">
          {/* Left side with chip */}
          <div className="flex items-center">
            <div className="w-8 h-6 bg-yellow-400 rounded-sm mr-3"></div>
            <div className="w-6 h-6">
              <div className="w-6 h-4 border-t-2 border-l-2 border-r-2 border-white/70 rounded-t-full"></div>
            </div>
          </div>
          
          {/* Dollar sign logo */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8"></path>
              <path d="M12 6v2m0 8v2"></path>
            </svg>
          </div>
        </div>
        
        {/* Balance section */}
        <div className="my-4">
          <p className="text-sm text-white/90 mb-1">
            My Balance
          </p>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-xl mr-1">$</span>
            {balanceAmount.toLocaleString()}
          </h2>
        </div>
        
        {/* Card number - dynamically displayed */}
        <div className="text-center my-4">
          <p className="font-mono tracking-wider text-lg">
            {formatAccountNumber(userInfo.accountNumber)}
          </p>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-xs font-medium mb-1">Card Holder</p>
            <p className="text-sm font-bold truncate max-w-[120px]">
              {userInfo.name || userInfo.displayName || 'User Name'}
            </p>
          </div>
          <div className="flex items-end">
            <div className="mr-4">
              <p className="text-xs font-medium mb-1">Valid Thru</p>
              <p className="text-sm font-bold">03/25</p>
            </div>
            {/* Network logo */}
            <div className="flex">
              <div className="w-5 h-5 rounded-full bg-red-500"></div>
              <div className="w-5 h-5 rounded-full bg-yellow-500 -ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
