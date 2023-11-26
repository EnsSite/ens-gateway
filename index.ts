import { getContentHash } from "./contenthash";

const server = Bun.serve({
  async fetch(req) {
    // Extract the hostname and pathname from the URL
    const { hostname, pathname } = new URL(req.url);
    
    // Check if the hostname matches our expected ENS site format (e.g., wayback-machine.ens.site)
    const ensSitePattern = /^([a-zA-Z0-9-]+)\.ens\.site$/;
    const ensSiteMatch = hostname.match(ensSitePattern);
    if (!ensSiteMatch) {
      return new Response("Not found", { status: 404 });
    }

    // Extract ENS name from the hostname
    const ens = ensSiteMatch[1];
    const rest = pathname.slice(1); // Remove the leading '/' from pathname

    // Get content hash
    const url = await getContentHash(ens + '.eth');
    if (!url) {
      return new Response("Not found", { status: 404 });
    }

    // Fetch the resource
    const response = await fetch([url, rest].join("/"));

    // Check if the response is OK
    if (!response.ok) {
      return new Response("Error fetching the resource", { status: response.status });
    }

    // Clone the response so we can modify it
    const clonedResponse = new Response(response.body, response);

    // Ensure correct handling of content encoding
    clonedResponse.headers.delete('content-encoding');
    clonedResponse.headers.delete('content-length');

    return clonedResponse;
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);
