const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://avalanche-battleboobas-calculator-n2hllq13b-srvng.vercel.app';