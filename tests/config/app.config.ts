export const appConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://www.demoblaze.com',
  credentials: {
    username: process.env.DEMOBLAZE_USERNAME ?? 'radhabheemrai24@gmail.com',
    password: process.env.DEMOBLAZE_PASSWORD ?? 'Blaze12!@',
  },
} as const;
