module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/direct',
        destination: '/direct/inbox',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['picsum.photos'],
  },
  images: {
    domains: ['picsum.photos'],
  },
};
