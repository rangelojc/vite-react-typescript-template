import loadingIcon from "@/assets/loading.svg";
import { Show } from "@/components/Show";
import { cn } from "@/lib/utils";

export default function LoaderSpinner(props: {
  show?: boolean;
  className?: string;
}) {
  return (
    <Show when={props.show}>
      {() => (
        <div
          className={cn(
            "flex-row-center h-full w-full py-10 opacity-50",
            props.className
          )}
        >
          <img
            src={loadingIcon}
            className="animate-spin-slow size-12 text-primary"
          />
        </div>
      )}
    </Show>
  );
}
