# TradeFlow

## Overview
TradeFlow is a robust platform designed to connect buyers, sellers, local transporters, and freight forwarders, enabling seamless global trade. The platform allows users to manage product discovery, quotation requests, bookings, and logistics efficiently across borders. 

With TradeFlow, users can:

- **Buyers**: Discover products globally, request quotes, and book shipments.
- **Sellers**: Manage orders, connect with freight forwarders for vessel bookings, and coordinate local transport.
- **Freight Forwarders**: Handle container bookings and delivery from port to port.
- **Transporters**: Assist sellers with product delivery from manufacturers to ports.

---

## Features

- **Global Product Discovery**: Buyers can search for products and request quotes.
- **Role-Based Authentication**: Different user roles (Buyer, Seller, Transporter, Freight Forwarder) enable tailored access to features.
- **Container Booking**: Sellers connect with freight forwarders to book vessel containers and manage shipments.
- **Transport Coordination**: Sellers can assign transporters to deliver goods from the manufacturer to the port.
- **Travel Distance Calculation**: Uses Google Maps API to calculate the travel distance between the manufacturer and port. Based on the distance, the commute price is automatically calculated.
- **Secure APIs**: Routes are protected using middleware for enhanced security.
- **User Authentication**: Secure user sign-up and sign-in with `NextAuth`.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) for a fast, server-rendered user interface.
- **UI Components**: Built using [V0 AI](https://v0.dev/).
- **Backend**: API endpoints secured with middleware.
- **Database**: PostgreSQL for reliable, structured data storage.
- **Authentication**: [NextAuth](https://next-auth.js.org/) for secure authentication.
- **Maps Integration**: Google Maps API for distance calculation.

---

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [PostgreSQL](https://www.postgresql.org/)
- A valid **Google Maps API Key**

### Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tradeflow.git
   cd tradeflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. Open the project at `http://localhost:3000`.

---

## User Roles

### 1. **Buyer**
- Discover products across the globe.
- Request quotes from sellers.
- Book shipments.

### 2. **Seller**
- Connect with freight forwarders to book containers.
- Assign transporters for local delivery.

### 3. **Transporter**
- Manage and facilitate local deliveries from the manufacturer to ports.

### 4. **Freight Forwarder**
- Handle container bookings and port-to-port logistics.

---

## Project Structure
```
├── app/
│   ├── (pages)/       # UI pages for the application
│   ├── api/           # API routes for backend services
├── components/        # UI components built with V0 AI
├── middleware/        # Route security and API protection
├── lib/               # Database configurations (Prisma and PostgreSQL)
├── public/            # Static assets
└── .env               # Environment variables
```

---

## Security
- **NextAuth** ensures secure user authentication.
- **Middleware** protects sensitive API routes.
- **Role-based Access Control** ensures users only access appropriate features.

---

## Future Enhancements
- **Real-time Notifications** for order updates.
- **Advanced Analytics Dashboard** for buyers and sellers.
- **Integration with Shipping Providers** for automated tracking.

---

## Contributing
Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Submit a pull request.

---

## Contact
For any questions or feedback, feel free to reach out:
- **Email**: tengliabhilash01@gmail.com
- **LinkedIn**: [abhitengli30](https://www.linkedin.com/in/abhitengli30/)
- **GitHub**: [abhilashtengli](https://github.com/abhilashtengli)
