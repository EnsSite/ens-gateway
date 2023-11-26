import { getContentHash } from "./contenthash";

const server = Bun.serve({
  async fetch(req) {
    // extract path ex: https://localhost:3000/ens_page/index.html -> ens_page/index.html
    const path = new URL(req.url).pathname.slice(1);
    if (!path) {
        return new Response("Not found", { status: 404 });
    }
    // split path ex: ens_page.eth/index.html -> ["ens_page.eth", "index.html"]
    const [ens, ...rest] = path.split("/");
    // get content hash
    const url = await getContentHash(ens+'.eth');
    if (!url) {
        return new Response("Not found", { status: 404 });
    }
    // redirect to ipfs gateway
    return fetch([url, ...rest].join("/"));
  },
});
  
console.log(`Listening on http://localhost:${server.port} ...`);