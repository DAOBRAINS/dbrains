/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    INFURA_IPFS_KEY: "2PD9xZItdJSiL5R2uemLMuPa08V",
    NFTSTORAGE_IPFS_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUxNUYyRjMyNkRGQjBkMzFiMDlEN2UxNDBlNkIwYmJEQjZGZjU5QUEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4Mjg1ODkxNjczOSwibmFtZSI6IkRCUkFJTlMifQ.veZCQ_eYdWSpxa1cYAYItcN2ulW3mCbHXhNBX5DoiJ4",
  },
};

module.exports = nextConfig;
