# FastFix Electronics Repair Service

A full-featured electronics repair service website with booking system, repair tracking, and customer dashboard. This project was built using React, TypeScript, PostgreSQL, and Express.

## Features

- **Homepage**: Showcasing services and company overview
- **Service Booking**: Schedule repairs for different electronic devices
- **Repair Tracking**: Track the status of repairs using a tracking code
- **User Dashboard**: View repair history and manage account
- **Blog & Guides**: Technical articles and repair guides
- **Live Support Chat**: Chat with customer service representatives

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query

## Setup & Installation

1. Clone the repository
```
git clone https://github.com/HarshitPatelPSIT/fastfix-electronics-repair.git
cd fastfix-electronics-repair
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file with the following:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

4. Run database migrations
```
npm run db:push
```

5. Start the development server
```
npm run dev
```

## Usage

- **Booking a Repair**: Navigate to the Booking page and fill out the form
- **Tracking a Repair**: Use the tracking page with your unique code (e.g., FF-2025-1234)
- **User Dashboard**: Login to view your repair history and status updates

## License

MIT