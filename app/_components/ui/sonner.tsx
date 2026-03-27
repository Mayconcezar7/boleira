"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-600" />,
        info: <InfoIcon className="size-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: (
          <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
        ),
      }}
      toastOptions={{
        unstyled: true, // A propriedade deve ficar aqui dentro
        classNames: {
          toast:
            "bg-background text-foreground border-border shadow-lg p-4 rounded-lg flex gap-3 items-center w-full",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
