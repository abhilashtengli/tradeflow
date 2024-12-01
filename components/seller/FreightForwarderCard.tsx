import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface FreightForwarderProps {
  name: string;
  email: string;
  companyName: string;
  companyAddress: string;
  country: string;
  onRequestQuote: () => void;
}

export function FreightForwarderCard({
  name,
  email,
  companyName,
  companyAddress,
  country,
  onRequestQuote
}: FreightForwarderProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Company:</strong> {companyName}
        </p>
        <p>
          <strong>Address:</strong> {companyAddress}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onRequestQuote}>Request Quote</Button>
      </CardFooter>
    </Card>
  );
}
