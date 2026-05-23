# Flight Management App

## Setup
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase keys
4. Run `npm run dev`

## Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

## Test Account
Email: test@flightapp.com
Password: test123456

## Zustand Store
- useFlightStore: manages search, selected flight/seat, booking step
- Passport numbers excluded from localStorage via partialize
- resetStore called on cancellation/logout

## Features
- Flight search by origin/destination
- Interactive seat map with realtime updates
- Booking with passenger details
- Cancel bookings (blocked within 2hrs of departure)
- Auth with Supabase