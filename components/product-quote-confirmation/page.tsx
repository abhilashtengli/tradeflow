import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ProductQuoteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export function ProductQuoteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  productName
}: ProductQuoteConfirmationProps) {
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Quote Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to request a quote for <span className="font-semibold text-zinc-700">{productName}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
}
