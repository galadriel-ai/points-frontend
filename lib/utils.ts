import {
  type ClassValue,
  clsx,
} from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates an Ethereum wallet address to a shortened version.
 *
 * @param address - The Ethereum wallet address to truncate.
 * @returns The truncated Ethereum wallet address or null if the address is null or undefined.
 */
export const truncateAddress = (
  address: string | null | undefined
): string | null => {
  if (!address) return null;
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
