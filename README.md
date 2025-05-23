# Indian Second-Hand PC Parts Marketplace

A full-stack web application for buying and selling second-hand PC parts in India, with features like PC building, technician services, and dealer integration.

## Features

- User authentication with social login (Google, Facebook)
- Listings management for PC parts
- PC Builder tool with compatibility checking
- Technician portal for PC repair services
- Dealer integration for bulk purchases
- Admin dashboard for platform management
- Payment integration with Stripe/Razorpay

## Tech Stack

- Frontend: Next.js 14, Tailwind CSS
- Backend: Next.js API Routes
- Database: MongoDB
- Authentication: NextAuth.js
- Payment: Stripe/Razorpay
- Deployment: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Facebook OAuth
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

   # MongoDB
   MONGODB_URI=your-mongodb-uri

   # Stripe
   STRIPE_PUBLIC_KEY=your-stripe-public-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin dashboard
│   ├── builder/        # PC Builder tool
│   ├── listings/       # Parts listings
│   └── technicians/    # Technician portal
├── components/         # Reusable components
├── lib/               # Utility functions
└── types/             # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 