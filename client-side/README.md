# DigiMoney Bank - Frontend Client

## 🌟 Overview

DigiMoney Bank Frontend is a modern, responsive React.js application that provides a comprehensive banking experience. Built with cutting-edge technologies, it offers role-based dashboards, real-time financial data, and an intuitive user interface for various banking operations.

## 🚀 Features

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure user authentication and authorization
- **Role-based Access Control** - Multi-tier permission system (User, Super Admin, Account Manager, Loan Officer, CSR)
- **Protected Routes** - Secure navigation based on user roles
- **JWT Token Management** - Secure API communication

### 👤 User Dashboard
- **Account Overview** - Real-time balance and account information
- **Transaction History** - Detailed transaction logs with filtering
- **Budget Management** - Personal finance tracking and budgeting tools
- **Investment Portfolio** - Investment tracking and performance metrics
- **Credit Score & Reports** - Credit monitoring and financial health reports
- **Loan & Mortgage Management** - Loan applications and management
- **Insurance Coverage** - Insurance policy management
- **Alerts & Notifications** - Real-time banking alerts

### 🛡️ Super Admin Dashboard
- **User Management** - Complete user administration and role assignment
- **Financial Reports** - Comprehensive banking analytics and reports
- **Audit Logs** - System activity tracking and compliance monitoring
- **System Configuration** - Platform settings and configuration management
- **Security & Compliance** - Security monitoring and regulatory compliance tools

### 💼 Account Manager Dashboard
- **Customer Portfolio** - Client relationship management
- **Investment Performance** - Portfolio performance tracking
- **Revenue Analytics** - Revenue analysis and forecasting
- **Calendar & Meetings** - Appointment scheduling and management
- **Communications** - Client communication tools
- **Transaction Alerts** - Real-time transaction monitoring

### 🏦 Loan Officer Dashboard
- **Loan Portfolio** - Loan management and tracking
- **Application Pipeline** - Loan application processing workflow
- **Credit Analysis** - Credit assessment and risk evaluation
- **Risk Assessment** - Comprehensive risk analysis tools
- **Communications** - Client communication and documentation

### 🎧 Customer Service Representative (CSR) Dashboard
- **Customer Profile** - Comprehensive customer information management
- **Service Requests** - Customer service ticket management
- **Quick Actions** - Common banking operations shortcuts
- **Transaction Support** - Transaction assistance and dispute resolution

### 🎨 UI/UX Features
- **Dark/Light Mode** - Theme switching with persistent preferences
- **Responsive Design** - Mobile-first, cross-device compatibility
- **Modern Components** - DaisyUI and Tailwind CSS styling
- **Animations** - Smooth transitions with Framer Motion and GSAP
- **Interactive Charts** - Data visualization with Recharts
- **Real-time Updates** - Live data updates using React Query

## 🛠️ Technology Stack

### Core Framework
- **React 18.2.0** - Modern React with hooks and concurrent features
- **React Router DOM 6.3.0** - Client-side routing and navigation
- **Redux Toolkit 1.8.5** - State management with modern Redux patterns

### Styling & UI
- **Tailwind CSS 3.1.6** - Utility-first CSS framework
- **DaisyUI 2.19.0** - Tailwind CSS component library
- **React Icons 4.4.0** - Comprehensive icon library
- **Framer Motion 12.9.7** - Advanced animations and transitions
- **GSAP 3.13.0** - High-performance animations

### Data & State Management
- **React Query 4.1.0** - Server state management and caching
- **Axios 0.27.2** - HTTP client for API communication
- **React Hook Form 7.33.1** - Efficient form handling
- **Redux Toolkit** - Global state management

### Authentication & Security
- **Firebase 9.9.1** - Authentication and real-time database
- **React Firebase Hooks 5.0.3** - Firebase integration hooks
- **Crypto-js 4.2.0** - Encryption and security utilities

### Data Visualization
- **Recharts 2.1.13** - React charting library
- **React Leaflet 5.0.0** - Interactive maps integration
- **Leaflet 1.9.4** - Mobile-friendly interactive maps

### Development Tools
- **React Scripts 5.0.1** - Build tools and development server
- **PostCSS 8.4.14** - CSS processing and optimization
- **Autoprefixer 10.4.7** - CSS vendor prefixing

### Additional Libraries
- **Date-fns 2.29.2** & **Moment 2.29.4** - Date manipulation
- **React Toastify 9.0.8** - Toast notifications
- **React Dropzone 14.3.8** - File upload handling
- **React Webcam 7.0.1** - Camera integration
- **React Slick 0.29.0** - Carousel components

## 📁 Project Structure

```
client-side/
├── public/                     # Static assets
│   ├── index.html             # Main HTML template
│   ├── favicon.png            # App favicon
│   ├── manifest.json          # PWA manifest
│   ├── NewsData.json          # Sample news data
│   └── preloader.gif          # Loading animation
│
├── src/
│   ├── App.js                 # Main application component
│   ├── App.css                # Global styles
│   ├── index.js               # Application entry point
│   ├── firebase.init.js       # Firebase configuration
│   │
│   ├── assets/                # Static assets
│   │   └── images/            # Image assets
│   │       ├── dashboard-icon/
│   │       ├── logo/
│   │       └── service/
│   │
│   ├── components/            # Reusable components
│   │   ├── NavBar.js          # Navigation component
│   │   ├── Footer.js          # Footer component
│   │   ├── Loading.js         # Loading spinner
│   │   ├── RegionSelector.js  # Region selection
│   │   └── ScrollToTop.js     # Scroll utility
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAdmin.js        # Admin role hook
│   │   ├── useToken.js        # Authentication token hook
│   │   ├── useUserInfo.js     # User information hook
│   │   ├── useTransaction.js  # Transaction data hook
│   │   └── useFindTransection.js
│   │
│   ├── pages/                 # Page components
│   │   ├── Home/              # Landing page
│   │   ├── Auth/              # Authentication pages
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── Admin.js
│   │   │
│   │   ├── Dashboard/         # Dashboard pages
│   │   │   ├── User/          # User dashboard
│   │   │   ├── SuperAdmin/    # Super admin dashboard
│   │   │   ├── AccountManager/ # Account manager dashboard
│   │   │   ├── LoanOfficer/   # Loan officer dashboard
│   │   │   ├── CSR/           # CSR dashboard
│   │   │   └── Modal/         # Modal components
│   │   │
│   │   ├── About/             # About page
│   │   ├── Blog/              # Blog and articles
│   │   ├── Cards/             # Card services
│   │   ├── Company/           # Company information
│   │   └── Service/           # Services page
│   │
│   └── redux/                 # Redux store and reducers
│       ├── store/             # Redux store configuration
│       └── reducers/          # Redux reducers
│
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digimoney-bank/client-side
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id

   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔧 Configuration

### Tailwind CSS Configuration

The application uses a custom Tailwind configuration with:
- **Dark mode support** - Class-based dark mode switching
- **Custom animations** - fadeIn, float, and pulse animations
- **Extended color palette** - Custom banking-themed colors
- **Responsive breakpoints** - Mobile-first responsive design
- **Custom components** - DaisyUI component integration

### Firebase Configuration

Firebase is used for:
- **Authentication** - User login/logout and session management
- **Security Rules** - Role-based access control
- **Real-time Updates** - Live data synchronization

### Redux Store Configuration

The Redux store manages:
- **User State** - Authentication and user information
- **Dashboard State** - Role-specific dashboard data
- **Transaction State** - Financial transaction data
- **UI State** - Theme preferences and loading states

## 🎨 Theming

### Dark/Light Mode
The application supports both dark and light themes:
- **Automatic Detection** - Respects system preferences
- **Manual Toggle** - User can switch themes manually
- **Persistent Storage** - Theme preference saved in localStorage
- **Smooth Transitions** - Animated theme switching

### Customization
- Modify colors in `tailwind.config.js`
- Update component styles in respective CSS files
- Customize animations and transitions

## 🔐 Authentication Flow

### Login Process
1. User enters credentials on login page
2. Firebase validates credentials
3. JWT token received and stored
4. User redirected to role-appropriate dashboard
5. Protected routes activated based on user role

### Role-Based Access
- **User** - Personal banking features
- **Super Admin** - Full system administration
- **Account Manager** - Client relationship management
- **Loan Officer** - Loan processing and management
- **CSR** - Customer service operations

## 📱 Responsive Design

### Breakpoints
- **Mobile** - 320px - 768px
- **Tablet** - 768px - 1024px
- **Desktop** - 1024px+

### Mobile Features
- Touch-friendly interface
- Optimized navigation
- Progressive Web App (PWA) capabilities
- Offline support for key features

## 🔗 API Integration

### Endpoints Integration
The frontend communicates with the backend API for:
- **Authentication** - Login, register, logout
- **User Management** - Profile, roles, permissions
- **Transactions** - Money transfers, payments, history
- **Account Operations** - Balance, statements, cards
- **Administrative** - User management, reports, analytics

### Data Flow
1. **React Query** manages server state and caching
2. **Axios** handles HTTP requests with interceptors
3. **Redux** manages global application state
4. **Custom hooks** encapsulate API logic

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

### Testing Libraries
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **User Event** - User interaction simulation

## 🚀 Deployment

### Build Optimization
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Unused code elimination
- **Asset Optimization** - Image and CSS optimization
- **Bundle Analysis** - Bundle size analysis tools

### Deployment Platforms
- **Netlify** - Recommended for static hosting
- **Vercel** - Alternative static hosting
- **AWS S3 + CloudFront** - Enterprise deployment
- **Firebase Hosting** - Google Cloud integration

### Environment Variables
Set the following environment variables in your deployment platform:
- All Firebase configuration variables
- API URLs for different environments
- Feature flags for environment-specific features

## 🛠️ Development

### Available Scripts
- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (not recommended)

### Code Style
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting (if configured)
- **Husky** - Git hooks for code quality (if configured)

### Development Workflow
1. Create feature branch from main
2. Develop feature with tests
3. Run linting and tests
4. Submit pull request
5. Code review and merge

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Code Guidelines
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive tests
- Follow existing code style

## 📈 Performance

### Optimization Features
- **React.memo** - Component memoization
- **useMemo & useCallback** - Hook optimization
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Responsive images
- **Bundle Analysis** - Performance monitoring

### Performance Monitoring
- **Web Vitals** - Core web vitals tracking
- **React DevTools** - Component performance profiling
- **Lighthouse** - Performance auditing

## 🔧 Troubleshooting

### Common Issues

**Build Failures**
- Clear node_modules and package-lock.json, reinstall dependencies
- Check Node.js version compatibility
- Verify environment variables

**Authentication Issues**
- Check Firebase configuration
- Verify API endpoint connectivity
- Clear browser storage and cache

**Styling Issues**
- Rebuild Tailwind CSS
- Check for conflicting CSS
- Verify DaisyUI theme configuration

### Debug Mode
Enable debug logging by setting:
```env
REACT_APP_DEBUG=true
```

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: support@digimoneybank.com
- **Documentation**: [Internal Wiki]
- **Issue Tracker**: [Project Issues]

---

**DigiMoney Bank Frontend** - Building the future of digital banking experiences.