import { apiUrl } from '@/variables/variables';
import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

const isSepolia = apiUrl.includes("staging")
const publicClient = createPublicClient({
  chain: isSepolia ? baseSepolia : base,
  transport: http(process.env.NEXT_PUBLIC_BASE_RPC_URL)
});

export const readContract = async ({ abi, address, functionName, args = null }) => {
  return publicClient.readContract({
    abi,
    address: address as `0x${string}`,
    functionName,
    args
  });
};