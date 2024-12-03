import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FreightBookingData } from "./FreightBookingForm";

interface RequestQuoteCardProps {
  bookings: FreightBookingData[]
  freightForwarderId: string
  onConfirm: (bookingId: string, freightForwarderId: string) => void
}

export function RequestQuoteCard({ bookings, freightForwarderId, onConfirm }: RequestQuoteCardProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)

  const handleConfirm = () => {
    if (selectedBookingId) {
      onConfirm(selectedBookingId, freightForwarderId)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Request Quote</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <RadioGroup onValueChange={setSelectedBookingId} className="space-y-2">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center space-x-2">
              <RadioGroupItem value={booking.id} id={booking.id} />
              <Label htmlFor={booking.id}>{`${booking.product} - ${booking.id} `}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <DialogFooter>
        <Button onClick={handleConfirm} disabled={!selectedBookingId}>
          Confirm Request Quote
        </Button>
      </DialogFooter>
    </>
  )
}

