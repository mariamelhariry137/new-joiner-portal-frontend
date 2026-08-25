import { PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AllDoneCardProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AllDoneCard({
  open,
  onOpenChange,
}: AllDoneCardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/10">
            <PartyPopper className="h-8 w-8 text-green-600" />
          </div>

          <DialogTitle className="mt-2 text-xl">
            You&apos;re all caught up!
          </DialogTitle>

          <DialogDescription className="text-center">
            Every onboarding task has been completed. Nice work.
          </DialogDescription>
        </DialogHeader>

        <Button
          className="w-full"
          onClick={() => onOpenChange(false)}
        >
          Nice
        </Button>
      </DialogContent>
    </Dialog>
  );
}