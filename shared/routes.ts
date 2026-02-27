import { z } from 'zod';
import { insertServiceRequestSchema, insertNoticeSchema, loginSchema, serviceRequests, notices, admins } from './schema';
import { createSelectSchema } from 'drizzle-zod';

const adminSchema = createSelectSchema(admins).omit({ password: true });

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: loginSchema,
      responses: {
        200: z.object({ message: z.string(), user: adminSchema }),
        401: errorSchemas.unauthorized,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout' as const,
      responses: {
        200: z.object({ message: z.string() }),
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me' as const,
      responses: {
        200: z.object({ user: adminSchema }),
        401: errorSchemas.unauthorized,
      }
    }
  },
  serviceRequests: {
    list: {
      method: 'GET' as const,
      path: '/api/service-requests' as const,
      responses: {
        200: z.array(createSelectSchema(serviceRequests)),
        401: errorSchemas.unauthorized,
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/service-requests' as const,
      input: z.any(),
      responses: {
        201: createSelectSchema(serviceRequests),
        400: errorSchemas.validation,
      }
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/service-requests/:id/status' as const,
      input: z.object({ status: z.enum(["Pending", "Completed"]) }),
      responses: {
        200: createSelectSchema(serviceRequests),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/service-requests/:id' as const,
      responses: {
        204: z.void(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      }
    }
  },
  notices: {
    list: {
      method: 'GET' as const,
      path: '/api/notices' as const,
      responses: {
        200: z.array(createSelectSchema(notices)),
      }
    },
    create: {
      method: 'POST' as const,
      path: '/api/notices' as const,
      input: insertNoticeSchema,
      responses: {
        201: createSelectSchema(notices),
        401: errorSchemas.unauthorized,
        400: errorSchemas.validation,
      }
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/notices/:id' as const,
      responses: {
        204: z.void(),
        401: errorSchemas.unauthorized,
        404: errorSchemas.notFound,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}