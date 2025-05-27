# PC Marketplace

A modern marketplace for PC components and services built with Next.js, TypeScript, and Prisma.

## Features

- User authentication with JWT
- User roles (admin, user)
- Product listings
- Secure password handling
- Responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS
- JWT Authentication

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pc-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret-key"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for deployment on Vercel. Follow these steps to deploy:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

## License

MIT 