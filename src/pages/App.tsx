import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import useDelay from "@/hooks/useDelay";
import { initI18n } from "@/i18n";
import { useAppStore } from "@/store/store";
import "@/styles/fonts.css";
import "@/styles/utils.css";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

initI18n();

function App() {
  const { pathname } = useLocation();
  const { toast, dismiss } = useToast();
  const appError = useAppStore((s) => s.appError);
  const setAppError = useAppStore((s) => s.setAppError);

  const delay = useDelay(3000);

  useEffect(() => {
    if (appError) {
      console.error("Unexpected Error:", appError);
      toast({
        title: "Unexpected Error",
        description: appError,
        variant: "destructive",
      });
      delay(dismiss);
    }
  }, [appError]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setAppError(null);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen">
      <Outlet />

      <Toaster />
    </div>
  );
}

export default App;
