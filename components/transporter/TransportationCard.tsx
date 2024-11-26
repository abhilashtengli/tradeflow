import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Truck, MapPin, Package, Calendar } from 'lucide-react'

interface TransportationRequest {
  id: string
  type: string
  load: number
  loadUnit: string
  origin: string
  destination: string
  userConfirmBooking: boolean
  createdAt: string
  updatedAt: string
  price: number
  distance: number
}

interface TransportationCardProps {
  request: TransportationRequest
  onAccept: () => void
}

export function TransportationCard({ request, onAccept }: TransportationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAccept = () => {
    setIsDialogOpen(false)
    onAccept()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{request.type}</span>
            <Badge variant={request.userConfirmBooking ? "default" : "secondary"}>
              {request.userConfirmBooking ? "Confirmed" : "Pending"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              <span>Load: {request.load} {request.loadUnit}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>From: {request.origin}</span>
            </div>
            <div className="flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              <span>To: {request.destination}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Created: {new Date(request.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">Price: Rs.{request.price.toFixed(2)}</span>
              <span>Distance: {request.distance} km</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setIsDialogOpen(true)}>Accept</Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transportation Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to accept this transportation request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAccept}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

