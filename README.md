# Property Management Platform

A modern, multi-tenant property management solution built with Next.js 14 and payload cms, featuring role-based access control, dynamic tenant routing, and a comprehensive property management suite.

## 🏢 Overview

Property Management Platform is a SaaS application that enables property management companies to manage their properties, tenants, and operations efficiently. Each organization gets their own branded portal with specific admin and tenant access levels.

## ✨ Features

### Multi-tenancy
- Dedicated spaces for each property management organization
- Custom domain support
- Organization-specific branding and customization
- Isolated data and user management

### Role-Based Access Control
- **Admin Portal** (`/[organization]/admin`)
  - User management
  - Property portfolio oversight
  - Financial reporting
  - Organization settings

- **Tenant Portal** (`/[organization]/tenant`)
  - Property viewing and management
  - Maintenance requests
  - Payment processing
  - Document management

- **Public Website** (`/[organization]`)
  - Organization landing page
  - Property listings
  - Contact forms
  - About and services

### Technical Features
- Server-side rendering with Next.js 14
- Secure authentication with NextAuth.js
- Real-time updates
- Responsive design
- Dark mode support

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18.0 or later
npm or yarn
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/property-management-platform.git
cd property-management-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```env
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
DATABASE_URL=your-database-url

# Other configurations
...
PAYLOAD_SECRET= generate one using openssl
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_PORT=
SMTP_HOST=
FROM_ADDRESS=
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## 🏗 Project Structure

```
├── app/
│   ├── auth/                 # Authentication routes
│   │   ├── sign-up/           # Login page
|   |   ├── sign-in/            # Sign-in page
│   │   └── actions/         # Server actions
|   ├── (website)/           # public route for the website
|   |    ├──about             #about page
│   ├── [tenant]/            # Dynamic tenant routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── tenant/         # Tenant portal
│   │   └── (website)/      # Public website for the individual organization
│   │   └── layout.tsx      # Tenant layout
├── components/              # Reusable components
├── lib/                     # Utility functions
├── middleware.ts           # Auth & routing middleware
└── types/                  # TypeScript definitions
```

## 🔒 Authentication Flow

1. Users log in through `/auth/login`
2. JWT tokens are issued with role and organization data
3. Middleware validates routes based on:
   - Authentication status
   - Organization membership
   - User role permissions

## 🎨 Theming

The application uses a custom theme with support for both light and dark modes:

- Primary color: Professional teal (`hsl(187, 75%, 43%)`)
- Accent color: Warm coral
- Success indicators: Fresh green
- Error states: Vibrant red
- Neutral grays for UI elements

Theme customization is available per organization through the admin panel.

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 API Routes

### Authentication
- `POST /api/users/login`
- `POST /api/users/refresh-token`
- `POST /api/users/logout`

### Organization Management
- `GET /api/[tenant]/properties`
- `POST /api/[tenant]/properties`
- `PUT /api/[tenant]/properties/[id]`
- `DELETE /api/[tenant]/properties/[id]`
and more

## 🛠 Development

### Running Tests
```bash
npm run test
# or
yarn test
```

### Building for Production
```bash
npm run build
# or
yarn build
```

### Linting
```bash
npm run lint
# or
yarn lint
```



## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All contributors and users of the platform
- Payload CMS for the backend



