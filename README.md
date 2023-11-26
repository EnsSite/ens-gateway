ENS Content Resolver
====================

This Bun.js application acts as a server that resolves Ethereum Name Service (ENS) domain names to their associated content and redirects requests to the appropriate content hosted on IPFS (InterPlanetary File System).

Features
--------

-   **ENS Resolution**: Converts ENS domain names into their corresponding content hashes.
-   **IPFS Redirection**: Redirects the resolved ENS content hashes to the IPFS gateway for content retrieval.
-   **Bun Server**: Utilizes Bun (a high-performance JavaScript runtime) for handling HTTP requests efficiently.

Prerequisites
-------------

-   [Bun](https://bun.sh/) installed on your system.

Installation
------------

1.  Clone the repository to your local machine.
2.  Navigate to the project directory.
3.  Install the required dependencies:

```
bun install
```

Usage
-----

To start the server, run the following command in your terminal:

```
bun run start
```

Once the server is running, you can access it through `http://localhost:<PORT>` where `<PORT>` is the port number displayed in the console.

### Making Requests

Send a request to the server with the ENS domain in the URL path. For example:


```
http://localhost:<PORT>/ens_domain.eth/index.html
```

The server will resolve the ENS domain to its content hash and redirect the request to the corresponding content on the IPFS gateway.

Contributing
------------

Contributions to this project are welcome. Please ensure that your code adheres to the existing style and that all tests pass before submitting a pull request.

License
-------

This project is licensed under the [MIT License](LICENSE).