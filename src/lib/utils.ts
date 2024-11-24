import payloadConfig from "@/payload.config";
import { clsx, type ClassValue } from "clsx";
import { getPayload } from "payload";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[])
{
  return twMerge(clsx(inputs));
}


// export const payloadOperation = async () => await getPayload({
//   config: payloadConfig
// });
