import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    vite: (config) => {
      return {
        server: {
          host: "0.0.0.0",
          // Allow all hosts when running in Docker (development mode)
          // In production, this should be more restrictive
          allowedHosts: [
            "localhost",
            ".localhost",
            "127.0.0.1",
          ],
          hmr: {
            // HMR websocket port inside container
            port: 5173,
            // Port browser connects to (exposed in docker-compose.yml)
            clientPort: 5173,
          },
        },
      }
    },
  }
  // plugins: [
  //   {
  //     resolve: "medusa-plugin-strapi-ts",
  //     options: {
  //       strapi_protocol: process.env.STRAPI_PROTOCOL,
  //       strapi_host: process.env.STRAPI_SERVER_HOSTNAME,
  //       strapi_port: process.env.STRAPI_PORT,
  //       strapi_secret: process.env.STRAPI_SECRET,
  //       strapi_default_user: {
  //         username: process.env.STRAPI_MEDUSA_USER,
  //         password: process.env.STRAPI_MEDUSA_PASSWORD,
  //         email: process.env.STRAPI_MEDUSA_EMAIL,
  //         confirmed: true,
  //         blocked: false,
  //         provider: "local",
  //       },
  //       strapi_admin: {
  //         username: process.env.STRAPI_SUPER_USERNAME,
  //         password: process.env.STRAPI_SUPER_PASSWORD,
  //         email: process.env.STRAPI_SUPER_USER_EMAIL,
  //       },
  //       auto_start: true,
  //     },
  //   },
  //   // Add other plugins here if needed
  // ],

})
