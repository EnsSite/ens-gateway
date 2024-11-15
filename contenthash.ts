import { decode } from '@ensdomains/content-hash'
import { namehash, normalize } from 'viem/ens'
import { parseAbi } from 'viem'

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

if (!process.env.ALCHEMY_API_KEY) {
  console.error('\nError: Missing ALCHEMY_API_KEY environment variable.\n')
  process.exit(1)
}

const transport = http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)

const publicClient = createPublicClient({
  transport,
  chain: mainnet,
})


const resolverAbi = parseAbi([
  'function resolver(bytes32 node) external view returns (address)',
])

const abi = parseAbi([
  'function contenthash(bytes32 node) external view returns (bytes memory)',
])

export const getContentHash = async (ens: string) => {
  const node = namehash(normalize(ens))

  const resolver = await publicClient.readContract({
    abi: resolverAbi,
    functionName: 'resolver',
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    args: [node],
  })

  const contenthash = await publicClient.readContract({
    abi,
    functionName: 'contenthash',
    address: resolver,
    args: [node],
  })

  if (contenthash === '0x') {
    return
  }
  const hash = decode(contenthash)
  return `http://ipfs.ens.site/ipfs/${hash}`
}
