import { cn, motionEnterFromFadeY } from "@/lib/utils";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export const Wrapper = (props: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "w-full flex-1 mx-auto px-4 lg:w-[70%] 4xl:!w-[50%] md:px-0",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export const FadeInWrapper = (
  props: { delay?: number } & ComponentPropsWithoutRef<"div">
) => {
  return (
    <motion.div
      {...motionEnterFromFadeY(undefined, { delay: props.delay })}
      className={cn(
        "w-full mx-auto px-4 lg:w-[70%] 4xl:!w-[50%] md:px-0",
        props.className
      )}
    >
      {props.children}
    </motion.div>
  );
};

export const Page = ({
  className,
  style,
  ...rest
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <main
      className={cn("h-screen w-screen overflow-hidden", className)}
      style={style}
      {...rest}
    />
  );
};
