## Node.js

## Basic configurations

Generate a jwt secret key:

```sh
openssl rand -hex 64
```

## Docker

## Basic Knowledge

The following Docker images are used in the project:

- **Node.js**:
  - `node:20-bullseye-slim@sha256:f15d13991e8acd23eeefd4ec0b73ef5608c6195be53cd2847c6c022932ce5e7f`

- **Nginx**:
  - `nginx:alpine@sha256:74175cf34632e88c6cfe206897cbfe2d2fecf9bf033c40e7f9775a3689e8adc7`

- **MongoDB**:
  - `mongo:latest@sha256:c165af1a407eefce644877bf5a59ba3d9ca762e62b4f1723c919dc08dc32f4d0`



### Getting Started

Plase follow 10 best practices to containerize Node.js web applications with Docker: [snyk.io/blog](https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/) for best practices.


- Search for the digest of the image: `docker images --digests | grep "node"`

### Installation

- Pull the images from Docker Hub:

  ```sh
  docker pull node:20-bullseye-slim@sha256:f15d13991e8acd23eeefd4ec0b73ef5608c6195be53cd2847c6c022932ce5e7f
  docker pull nginx:alpine@sha256:74175cf34632e88c6cfe206897cbfe2d2fecf9bf033c40e7f9775a3689e8adc7
  docker pull mongo:latest@sha256:c165af1a407eefce644877bf5a59ba3d9ca762e62b4f1723c919dc08dc32f4d0
  ```
