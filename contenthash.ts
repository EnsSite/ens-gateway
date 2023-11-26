import { decode } from '@ensdomains/content-hash'
import { namehash, normalize } from 'viem/ens'
import { parseAbi } from 'viem/abi'

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


const abi = parseAbi([
  'function contenthash(bytes32 node) external view returns (bytes memory)',
])

export const getContentHash = async (ens: string) => {
  const node = namehash(normalize(ens))

  const contenthash = await publicClient.readContract({
    abi,
    functionName: 'contenthash',
    address: '0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41',
    args: [node],
  })

  if (contenthash === '0x') {
    return
  }
  const hash = decode(contenthash)
  return `http://ipfs.ens.site/ipfs/${hash}`
}
