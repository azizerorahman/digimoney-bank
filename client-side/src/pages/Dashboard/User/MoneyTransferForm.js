import React, { useState } from 'react';
import { 
  ArrowRight, User, DollarSign, Calendar,
  CheckCircle, AlertTriangle, X, Search, Building,
  Smartphone, Globe, Shield, Info,
  ArrowUpDown, Send, Plus, Minus, Eye, EyeOff
} from 'lucide-react';

const MoneyTransferForm = ({ onClose, onTransferComplete }) => {
  const [transferType, setTransferType] = useState('intra'); // 'intra' or 'inter'
  const [step, setStep] = useState(1); // 1: Details, 2: Review, 3: Confirmation
  const [showAccountSearch, setShowAccountSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPin, setShowPin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Form data state
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    recipientName: '',
    recipientBank: '',
    recipientBankCode: '',
    amount: '',
    currency: 'USD',
    transferMethod: 'immediate', // 'immediate', 'scheduled'
    scheduledDate: '',
    scheduledTime: '',
    purpose: '',
    description: '',
    reference: '',
    pin: '',
    saveRecipient: false,
    notifyRecipient: true,
    smsNotification: true,
    emailNotification: true
  });

  // Mock data for accounts and banks
  const userAccounts = [
    {
      id: 'ACC-001',
      accountNumber: '****1234',
      accountName: 'John Doe - Savings',
      type: 'Savings',
      balance: 15000.00,
      currency: 'USD'
    },
    {
      id: 'ACC-002',
      accountNumber: '****5678',
      accountName: 'John Doe - Checking',
      type: 'Checking',
      balance: 8500.00,
      currency: 'USD'
    },
    {
      id: 'ACC-003',
      accountNumber: '****9012',
      accountName: 'Business Account',
      type: 'Business',
      balance: 45000.00,
      currency: 'USD'
    }
  ];

  const bankList = [
    { code: 'BANK001', name: 'First National Bank', swift: 'FNBKUS33' },
    { code: 'BANK002', name: 'City Commercial Bank', swift: 'CCBKUS44' },
    { code: 'BANK003', name: 'Metro Trust Bank', swift: 'MTBKUS55' },
    { code: 'BANK004', name: 'Regional Savings Bank', swift: 'RSBKUS66' }
  ];

  const transferPurposes = [
    'Personal Transfer',
    'Business Payment',
    'Bill Payment',
    'Loan Payment',
    'Investment',
    'Gift',
    'Education',
    'Medical',
    'Emergency',
    'Other'
  ];

  // Mock search for recipient accounts
  const searchAccounts = (query) => {
    if (query.length < 3) return [];
    
    const mockResults = [
      {
        id: 'REC-001',
        accountNumber: '1234567890',
        name: 'Alice Johnson',
        bank: 'First National Bank',
        type: 'Savings'
      },
      {
        id: 'REC-002',
        accountNumber: '0987654321',
        name: 'Bob Smith',
        bank: 'City Commercial Bank',
        type: 'Checking'
      },
      {
        id: 'REC-003',
        accountNumber: '5555666677',
        name: 'Carol Davis',
        bank: 'Metro Trust Bank',
        type: 'Business'
      }
    ];

    return mockResults.filter(result => 
      result.name.toLowerCase().includes(query.toLowerCase()) ||
      result.accountNumber.includes(query)
    );
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setTransferData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle account search
  const handleAccountSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      const results = searchAccounts(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Select recipient from search results
  const selectRecipient = (recipient) => {
    setTransferData(prev => ({
      ...prev,
      toAccount: recipient.accountNumber,
      recipientName: recipient.name,
      recipientBank: recipient.bank
    }));
    setShowAccountSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!transferData.fromAccount) newErrors.fromAccount = 'Please select source account';
    if (!transferData.toAccount) newErrors.toAccount = 'Please enter recipient account';
    if (!transferData.recipientName) newErrors.recipientName = 'Please enter recipient name';
    if (!transferData.amount || parseFloat(transferData.amount) <= 0) {
      newErrors.amount = 'Please enter valid amount';
    }
    if (transferType === 'inter' && !transferData.recipientBank) {
      newErrors.recipientBank = 'Please select recipient bank';
    }
    if (transferData.transferMethod === 'scheduled') {
      if (!transferData.scheduledDate) newErrors.scheduledDate = 'Please select date';
      if (!transferData.scheduledTime) newErrors.scheduledTime = 'Please select time';
    }
    if (!transferData.purpose) newErrors.purpose = 'Please select transfer purpose';

    // Check if amount exceeds balance
    const selectedAccount = userAccounts.find(acc => acc.id === transferData.fromAccount);
    if (selectedAccount && parseFloat(transferData.amount) > selectedAccount.balance) {
      newErrors.amount = 'Amount exceeds available balance';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateForm()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!transferData.pin) {
        setErrors({ pin: 'Please enter your PIN' });
        return;
      }
      
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        onTransferComplete && onTransferComplete({
          ...transferData,
          transactionId: `TXN${Date.now()}`,
          status: 'completed',
          timestamp: new Date().toISOString()
        });
      }, 3000);
    }
  };

  // Calculate fees
  const calculateFees = () => {
    const amount = parseFloat(transferData.amount) || 0;
    let fee = 0;
    
    if (transferType === 'intra') {
      fee = amount > 1000 ? 2.50 : 0; // Free for amounts under $1000
    } else {
      fee = Math.max(5, amount * 0.01); // 1% with minimum $5 for inter-bank
    }
    
    return fee;
  };

  const fee = calculateFees();
  const totalAmount = (parseFloat(transferData.amount) || 0) + fee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white">Money Transfer</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step === 1 ? 'Enter transfer details' : 
                 step === 2 ? 'Review and confirm' : 
                 'Processing transfer'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Review</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Transfer Details */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Transfer Type Selection */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-3">
                  Transfer Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTransferType('intra')}
                    className={`p-4 border-2 rounded-lg text-left ${
                      transferType === 'intra'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ArrowUpDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-black dark:text-white">Intra-Bank Transfer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Transfer within same bank
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setTransferType('inter')}
                    className={`p-4 border-2 rounded-lg text-left ${
                      transferType === 'inter'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-black dark:text-white">Inter-Bank Transfer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Transfer to other banks
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* From Account */}
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    From Account *
                  </label>
                  <select
                    value={transferData.fromAccount}
                    onChange={(e) => handleInputChange('fromAccount', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                      errors.fromAccount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select source account</option>
                    {userAccounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.accountName} - {account.accountNumber} (${account.balance.toLocaleString()})
                      </option>
                    ))}
                  </select>
                  {errors.fromAccount && (
                    <p className="text-red-500 text-xs mt-1">{errors.fromAccount}</p>
                  )}
                </div>

                {/* To Account */}
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    To Account *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={transferData.toAccount}
                      onChange={(e) => handleInputChange('toAccount', e.target.value)}
                      placeholder="Enter account number"
                      className={`w-full px-3 py-2 pr-10 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                        errors.toAccount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowAccountSearch(true)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                  {errors.toAccount && (
                    <p className="text-red-500 text-xs mt-1">{errors.toAccount}</p>
                  )}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    value={transferData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    placeholder="Enter recipient full name"
                    className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                      errors.recipientName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.recipientName && (
                    <p className="text-red-500 text-xs mt-1">{errors.recipientName}</p>
                  )}
                </div>

                {transferType === 'inter' && (
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Recipient Bank *
                    </label>
                    <select
                      value={transferData.recipientBank}
                      onChange={(e) => {
                        const selectedBank = bankList.find(bank => bank.name === e.target.value);
                        handleInputChange('recipientBank', e.target.value);
                        handleInputChange('recipientBankCode', selectedBank?.code || '');
                      }}
                      className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                        errors.recipientBank ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select recipient bank</option>
                      {bankList.map(bank => (
                        <option key={bank.code} value={bank.name}>
                          {bank.name} ({bank.swift})
                        </option>
                      ))}
                    </select>
                    {errors.recipientBank && (
                      <p className="text-red-500 text-xs mt-1">{errors.recipientBank}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Amount and Currency */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Amount *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={transferData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      placeholder="0.00"
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                        errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Currency
                  </label>
                  <select
                    value={transferData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>

              {/* Transfer Method */}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-3">
                  Transfer Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleInputChange('transferMethod', 'immediate')}
                    className={`p-4 border-2 rounded-lg text-left ${
                      transferData.transferMethod === 'immediate'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-black dark:text-white">Immediate Transfer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Process transfer now
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleInputChange('transferMethod', 'scheduled')}
                    className={`p-4 border-2 rounded-lg text-left ${
                      transferData.transferMethod === 'scheduled'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="font-medium text-black dark:text-white">Scheduled Transfer</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Schedule for later
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Scheduled Transfer Details */}
              {transferData.transferMethod === 'scheduled' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Scheduled Date *
                    </label>
                    <input
                      type="date"
                      value={transferData.scheduledDate}
                      onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                        errors.scheduledDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.scheduledDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.scheduledDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Scheduled Time *
                    </label>
                    <input
                      type="time"
                      value={transferData.scheduledTime}
                      onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                        errors.scheduledTime ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.scheduledTime && (
                      <p className="text-red-500 text-xs mt-1">{errors.scheduledTime}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Transfer Purpose and Description */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Transfer Purpose *
                  </label>
                  <select
                    value={transferData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                      errors.purpose ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select purpose</option>
                    {transferPurposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                  {errors.purpose && (
                    <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={transferData.reference}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    placeholder="Enter reference number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={transferData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter transfer description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveRecipient"
                    checked={transferData.saveRecipient}
                    onChange={(e) => handleInputChange('saveRecipient', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="saveRecipient" className="ml-2 text-sm text-black dark:text-white">
                    Save recipient for future transfers
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="notifyRecipient"
                    checked={transferData.notifyRecipient}
                    onChange={(e) => handleInputChange('notifyRecipient', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="notifyRecipient" className="ml-2 text-sm text-black dark:text-white">
                    Notify recipient about transfer
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotification"
                    checked={transferData.smsNotification}
                    onChange={(e) => handleInputChange('smsNotification', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="smsNotification" className="ml-2 text-sm text-black dark:text-white">
                    Send SMS confirmation
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotification"
                    checked={transferData.emailNotification}
                    onChange={(e) => handleInputChange('emailNotification', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="emailNotification" className="ml-2 text-sm text-black dark:text-white">
                    Send email confirmation
                  </label>
                </div>
              </div>
            </div>
          )}

                    {/* Step 2: Review */}
                    {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Transfer Summary
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* From Account Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-black dark:text-white mb-3 flex items-center">
                      <Minus className="h-4 w-4 text-red-500 mr-2" />
                      From Account
                    </h4>
                    {(() => {
                      const fromAccount = userAccounts.find(acc => acc.id === transferData.fromAccount);
                      return fromAccount ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Account Name</p>
                          <p className="font-medium text-black dark:text-white">{fromAccount.accountName}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
                          <p className="font-medium text-black dark:text-white">{fromAccount.accountNumber}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Available Balance</p>
                          <p className="font-medium text-green-600 dark:text-green-400">
                            ${fromAccount.balance.toLocaleString()}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>

                  {/* To Account Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium text-black dark:text-white mb-3 flex items-center">
                      <Plus className="h-4 w-4 text-green-500 mr-2" />
                      To Account
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Recipient Name</p>
                      <p className="font-medium text-black dark:text-white">{transferData.recipientName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
                      <p className="font-medium text-black dark:text-white">{transferData.toAccount}</p>
                      {transferType === 'inter' && (
                        <>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Bank</p>
                          <p className="font-medium text-black dark:text-white">{transferData.recipientBank}</p>
                        </>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">Transfer Type</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transferType === 'intra' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {transferType === 'intra' ? 'Intra-Bank' : 'Inter-Bank'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-black dark:text-white mb-3">Amount Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Transfer Amount</span>
                      <span className="font-medium text-black dark:text-white">
                        ${parseFloat(transferData.amount || 0).toLocaleString()} {transferData.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Transfer Fee</span>
                      <span className="font-medium text-black dark:text-white">
                        ${fee.toFixed(2)} {transferData.currency}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-black dark:text-white">Total Amount</span>
                        <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                          ${totalAmount.toFixed(2)} {transferData.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfer Details */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-black dark:text-white mb-3">Transfer Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Transfer Method</p>
                      <p className="font-medium text-black dark:text-white capitalize">
                        {transferData.transferMethod}
                        {transferData.transferMethod === 'scheduled' && transferData.scheduledDate && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            on {new Date(transferData.scheduledDate).toLocaleDateString()} at {transferData.scheduledTime}
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Purpose</p>
                      <p className="font-medium text-black dark:text-white">{transferData.purpose}</p>
                    </div>
                    {transferData.reference && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Reference</p>
                        <p className="font-medium text-black dark:text-white">{transferData.reference}</p>
                      </div>
                    )}
                    {transferData.description && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                        <p className="font-medium text-black dark:text-white">{transferData.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notifications */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-medium text-black dark:text-white mb-3">Notification Settings</h4>
                  <div className="space-y-2">
                    {transferData.notifyRecipient && (
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Recipient will be notified
                      </div>
                    )}
                    {transferData.smsNotification && (
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                        <Smartphone className="h-4 w-4 mr-2" />
                        SMS confirmation enabled
                      </div>
                    )}
                    {transferData.emailNotification && (
                      <div className="flex items-center text-sm text-purple-600 dark:text-purple-400">
                        <Globe className="h-4 w-4 mr-2" />
                        Email confirmation enabled
                      </div>
                    )}
                    {transferData.saveRecipient && (
                      <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                        <User className="h-4 w-4 mr-2" />
                        Recipient will be saved for future transfers
                      </div>
                    )}
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-yellow-800 dark:text-yellow-300">Important Notice</h5>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-400 mt-2 space-y-1">
                        <li>• Please verify all details carefully before confirming the transfer</li>
                        <li>• {transferType === 'intra' ? 'Intra-bank transfers are usually processed immediately' : 'Inter-bank transfers may take 1-3 business days'}</li>
                        <li>• Transfer fees are non-refundable once the transaction is processed</li>
                        <li>• You will receive a confirmation once the transfer is completed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              {!isProcessing ? (
                <>
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                      Secure Transfer Confirmation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Please enter your PIN to authorize this transfer
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="text-center mb-6">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${totalAmount.toFixed(2)} {transferData.currency}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        to {transferData.recipientName}
                      </p>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Enter your PIN *
                      </label>
                      <div className="relative">
                        <input
                          type={showPin ? "text" : "password"}
                          value={transferData.pin}
                          onChange={(e) => handleInputChange('pin', e.target.value)}
                          placeholder="Enter 4-digit PIN"
                          maxLength="4"
                          className={`w-full px-3 py-3 text-center text-lg border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700 ${
                            errors.pin ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPin(!showPin)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.pin && (
                        <p className="text-red-500 text-xs mt-1 text-center">{errors.pin}</p>
                      )}
                    </div>

                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-blue-800 dark:text-blue-300">Security Information</h5>
                          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                            Your PIN is encrypted and secure. This transaction will be logged for security purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                    Processing Transfer...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we process your transfer securely
                  </p>
                  <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      Do not close this window or navigate away during processing
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Back
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 flex items-center"
                >
                  {step === 1 && (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      Confirm Transfer
                      <Shield className="h-4 w-4 ml-2" />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      Authorize Transfer
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Account Search Modal */}
        {showAccountSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Search Recipients</h3>
                  <button 
                    onClick={() => setShowAccountSearch(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleAccountSearch(e.target.value)}
                    placeholder="Search by name or account number"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                    autoFocus
                  />
                </div>
                
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map(result => (
                      <button
                        key={result.id}
                        onClick={() => selectRecipient(result)}
                        className="w-full p-3 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="font-medium text-black dark:text-white">{result.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {result.accountNumber} • {result.bank}
                        </div>
                      </button>
                    ))
                  ) : searchQuery.length >= 3 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No recipients found
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Enter at least 3 characters to search
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoneyTransferForm;

