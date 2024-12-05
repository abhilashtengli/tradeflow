export interface Transporter {
  id: string;
  name: string;
  email: string;
  companyName: string;
  companyAddress: string;
}

export interface Booking {
  id: string;
  origin: string;
  destination: string;
  load: number;
  loadUnit: string;
  type: string;
  price: number;
  distance: number;
  accepted: boolean;
  dispatched: boolean;
  delivered: boolean;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  userConfirmBooking: boolean;
  transporter?: Transporter;
  transporterId?: string;
  userId: string;
}
