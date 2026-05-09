# UnwindCabins - Luxury Cabin Booking Platform

A full-stack web application for discovering, booking, and managing luxury cabin retreats. Built with modern web technologies, UnwindCabins provides a seamless experience for users to browse cabins, manage bookings, and for admins to manage content and users.

## 🏗️ Project Structure

```
UnwindCabins/
├── client/              # React frontend for users
├── admin/               # React frontend for admins
├── server/              # Node.js/Express backend
└── README.md            # This file
```

## 🎯 Key Features

### 👥 User Features

#### Authentication & Account Management
- **User Registration** - Create new accounts with email and password
- **User Login** - Secure authentication with JWT tokens
- **Profile Management** - View and manage user profile information
- **Session Management** - Persistent login sessions with localStorage
- **Protected Routes** - Secure navigation for authenticated users

#### Cabin Discovery & Browsing
- **Homepage** - Engaging hero section with featured cabins
- **Cabins Listing** - Browse all available cabins with filtering options
- **Cabin Details** - Comprehensive cabin information pages with ratings and reviews
- **Search & Discovery** - Search functionality with location, check-in/check-out dates, and guest count
- **Ratings & Reviews** - View cabin ratings and customer testimonials
- **Inspiration Categories** - Curated cabin suggestions by interest (nature exploration, relaxation, pet-friendly)

#### Content Sections
- **About Page** - Information about UnwindCabins platform
- **Contact Page** - Contact form for inquiries
- **FAQ Section** - Frequently asked questions
- **Media Gallery** - Photo galleries showcasing cabins and experiences

#### User Navigation
- **Responsive Navbar** - Navigation bar with search and user menu
- **Footer** - Links and social media information
- **404 Page** - Custom not found page
- **Mobile Responsive** - Fully responsive design for all devices

### 🔐 Admin Features

#### Dashboard
- **Admin Login** - Hardcoded admin authentication for security
- **Dashboard Home** - Overview of admin operations
- **Protected Admin Routes** - Secure admin area access

#### Content Management
- **Content Management System** - Manage cabin listings and content
- **Edit Cabin Information** - Update cabin details, descriptions, and pricing
- **Manage Amenities** - Handle cabin amenities and features
- **Content Publishing** - Control content visibility and publication

#### User Management
- **User List** - View all registered users
- **User Details** - Access user information and account status
- **User Activity Tracking** - Monitor user bookings and activities
- **User Administration** - Handle user accounts and permissions

#### Administrative Controls
- **Sidebar Navigation** - Easy navigation between admin sections
- **Dashboard Interface** - Intuitive admin control panel

## 🛠️ Technology Stack

### Frontend (Client)
- **React 19.2.5** - UI library
- **React Router 7.15.0** - Client-side routing
- **Vite 8.0.10** - Build tool and dev server
- **Tailwind CSS 3.4.5** - Utility-first CSS framework
- **Framer Motion 12.38.0** - Animation library
- **Lucide React 1.14.0** - Icon library
- **PostCSS 8.5.14** - CSS processor
- **Autoprefixer 10.5.0** - CSS vendor prefixing

### Admin Dashboard
- **React 18.2.0** - UI library
- **React Router 6.14.2** - Routing
- **Vite 4.4.5** - Build tool
- **Tailwind CSS 3.3.3** - Styling
- **Axios 1.4.0** - HTTP client
- **PostCSS 8.4.24** - CSS processing

### Backend (Server)
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MongoDB** - Database (via Mongoose 7.5.0)
- **Mongoose 7.5.0** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **Bcryptjs 2.4.3** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.3.1** - Environment variable management
- **Express Validator 7.0.1** - Input validation
- **Nodemon 3.0.1** - Development tool for auto-restart

## 📊 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Admin Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'admin'),
  timestamps: true
}
```

### Cabin Data Structure
```javascript
{
  id: String,
  location: String,
  title: String,
  price: String,
  description: String,
  rating: Number,
  reviews: Number,
  image: String
}
```

## 🔗 API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user profile (protected)

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `POST /register` - Admin registration (disabled)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation & Setup

#### 1. Clone and Navigate to Project
```bash
git clone <repository-url>
cd UnwindCabins
```

#### 2. Server Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file with the following variables
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/unwindcabins
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@unwindcabins.com
ADMIN_PASSWORD=your_admin_password" > .env

# Start server
npm run dev
```

#### 3. Client Setup
```bash
cd ../client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

#### 4. Admin Dashboard Setup
```bash
cd ../admin

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

### Running All Services Together

**Option 1: Separate Terminals**
```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev

# Terminal 3 - Admin
cd admin && npm run dev
```

**Option 2: Single Terminal with Concurrently** (optional setup)
Install concurrently globally or locally and create a root package.json script.

## 📁 Project Architecture

### Client (`/client/src`)
```
components/          # Reusable React components
├── Button.jsx       # Animated button component
├── CabinCard.jsx    # Cabin listing card
├── FAQItem.jsx      # FAQ accordion item
├── Footer.jsx       # Footer section
├── InspirationCard.jsx # Inspiration category card
└── Navbar.jsx       # Navigation bar

pages/              # Page components
├── HomePage.jsx    # Landing page
├── CabinsPage.jsx  # Cabins listing
├── CabinDetailPage.jsx # Cabin details
├── LoginPage.jsx   # User login
├── RegisterPage.jsx # User registration
├── ProfilePage.jsx # User profile
├── AboutPage.jsx   # About page
├── ContactPage.jsx # Contact page
└── NotFoundPage.jsx # 404 page

routes/            # Routing configuration
└── ProtectedRoute.jsx # Protected route wrapper

services/          # API and business logic
└── authService.jsx # Authentication context and functions

data/              # Static data
└── content.js     # Cabin listings, FAQs, and content data
```

### Admin (`/admin/src`)
```
components/        # Admin-specific components
├── Sidebar.jsx    # Admin navigation sidebar
├── DashboardHome.jsx # Dashboard overview
├── ContentManagement.jsx # Manage cabin content
└── UserManagement.jsx # Manage users

pages/
├── Dashboard.jsx  # Main admin dashboard
└── Login.jsx      # Admin login

routes/
└── ProtectedRoute.jsx # Admin route protection

services/
└── authService.jsx # Admin authentication
```

### Server (`/server`)
```
config/            # Configuration files
└── db.js          # MongoDB connection

controllers/       # Business logic
├── userController.js # User auth and profile
└── adminController.js # Admin operations

middleware/        # Express middleware
├── authMiddleware.js # JWT verification
├── adminAuth.js    # Admin authorization
└── errorHandler.js # Error handling

models/           # Database schemas
├── User.js        # User schema
└── Admin.js       # Admin schema

routes/           # API endpoints
├── index.js       # Route aggregation
├── userRoutes.js  # User endpoints
└── adminRoutes.js # Admin endpoints

utils/            # Helper functions
└── helpers.js     # Utility functions
```

## 🎨 Design & UI

### Color Scheme
- **Primary**: `#064b35` (Dark green)
- **Primary Dark**: `#002f21` (Darker green)
- **Accent**: `#ffb85f` (Warm orange)
- **Mint**: `#effbf9` (Light mint green)
- **Text**: `#242538` (Dark ink)
- **Body**: `#5b6466` (Medium gray)

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Fully responsive navigation and layouts
- Mobile-optimized forms and interactions

### Animations
- **Framer Motion** for smooth page transitions
- **Hover effects** on buttons and cards
- **Staggered animations** for list items
- **Scale and opacity** transitions

## 🔐 Authentication & Security

### JWT Implementation
- Tokens expire after 1 hour
- Stored in localStorage on client
- Validated on protected routes
- Sent via Authorization header

### Password Security
- Passwords hashed with bcryptjs (salt rounds: 10)
- Never stored in plain text
- Compared securely during login

### Admin Security
- Hardcoded admin credentials (environment variables)
- Separate admin authentication flow
- Admin role verification middleware

## 📝 Development Guidelines

### Code Style
- Use ES6+ syntax
- Functional React components with hooks
- Clear naming conventions
- Comments for complex logic

### Component Best Practices
- Single responsibility principle
- Reusable component design
- Props documentation
- Event handler naming (handle*)

### Git Workflow
- Create feature branches
- Commit descriptive messages
- Push to remote regularly
- Create pull requests for review

## 🚀 Build & Deployment

### Building for Production

**Client:**
```bash
cd client
npm run build
# Output: dist/ folder
```

**Admin:**
```bash
cd admin
npm run build
# Output: dist/ folder
```

**Server:**
- Deploy Node.js server to hosting service (Heroku, Vercel, AWS, etc.)
- Ensure environment variables are set on hosting platform
- MongoDB Atlas for cloud database

### Deployment Platforms
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Admin**: Vercel, Netlify
- **Backend**: Heroku, Railway, Render, AWS

## 🐛 Known Issues & Limitations

- Admin registration endpoint is disabled (security measure)
- Cabin bookings functionality is under development
- Email notifications not yet implemented
- Payment processing not integrated

## 🔄 Future Enhancements

- [ ] Integrate payment gateway (Stripe/PayPal)
- [ ] Booking calendar and confirmation system
- [ ] Email notifications for bookings
- [ ] User reviews and ratings submission
- [ ] Search filters (price range, amenities, dates)
- [ ] Wishlist/favorites persistence
- [ ] Real-time chat support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics for admins
- [ ] Image upload for cabins
- [ ] Multi-language support
- [ ] Dark mode theme

## 📞 Support & Contact

For issues, questions, or contributions:
- Create an issue in the repository
- Contact the development team
- Review documentation and guides

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Contributors

- Development Team
- Design Team
- Project Management

---

**Last Updated**: May 2026
**Version**: 1.0.0
