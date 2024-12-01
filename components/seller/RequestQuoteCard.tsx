import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RequestQuoteCardProps {
  bookingIds: string[];
  freightForwarderId: string;
  onConfirm: (bookingId: string, freightForwarderId: string) => void;
}

export function RequestQuoteCard({
  bookingIds,
  freightForwarderId,
  onConfirm
}: RequestQuoteCardProps) {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const handleConfirm = () => {
    if (selectedBookingId) {
      onConfirm(selectedBookingId, freightForwarderId);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Request Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={setSelectedBookingId} className="space-y-2">
          {bookingIds.map(id =>
            <div key={id} className="flex items-center space-x-2">
              <RadioGroupItem value={id} id={id} />
              <Label htmlFor={id}>
                {id}
              </Label>
            </div>
          )}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleConfirm} disabled={!selectedBookingId}>
          Confirm Request Quote
        </Button>
      </CardFooter>
    </Card>
  );
}
