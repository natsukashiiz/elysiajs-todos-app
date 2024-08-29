import swagger from "@elysiajs/swagger";

const SwaggerConfig = swagger({
  documentation: {
    info: {
      title: "Elysiajs Todos App Documentation",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        JwtAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  swaggerOptions: {
    persistAuthorization: true,
  },
  excludeStaticFile: true,
  exclude: [new RegExp("/swagger/*")],
});

export default SwaggerConfig;
