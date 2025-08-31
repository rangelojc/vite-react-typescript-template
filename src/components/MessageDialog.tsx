import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

type MessageDialogProps = {
  title?: string;
  message?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeText?: string;
  hideCloseButton?: boolean;
};

const MessageDialog = ({
  title,
  message,
  open,
  onOpenChange,
  closeText,
  hideCloseButton = false,
}: MessageDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:max-w-md">
        <DialogHeader>
          <DialogTitle>{title || t("common.info")}</DialogTitle>
          <DialogDescription className="mt-2 text-base">
            {message || "Message"}
          </DialogDescription>
        </DialogHeader>

        {!hideCloseButton && (
          <div className="mt-8 flex justify-end">
            <DialogClose asChild>
              <Button variant="default">{closeText || t("common.ok")}</Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
