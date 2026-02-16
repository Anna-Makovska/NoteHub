const PORT = process.env.PORT ?? 3000;
const APP_URL = process.env.APP_URL ?? `http://localhost:${PORT}`;

export const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'NoteHub API',
    version: '1.0.0',
    description:
      'Backend for a notes app with auth, cookie sessions, password reset, and avatar upload.',
  },
  servers: [
    {
      url: APP_URL,
    },
  ],
  tags: [
    { name: 'Auth', description: 'Authentication and sessions' },
    { name: 'Notes', description: 'Notes CRUD' },
    { name: 'Users', description: 'User profile' },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
        description:
          'Uses httpOnly cookies: accessToken, refreshToken, sessionId',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f0e2a7c4e3b8c8a1a1a1a1' },
          username: { type: 'string', example: 'user@example.com' },
          email: { type: 'string', example: 'user@example.com' },
          avatar: {
            type: 'string',
            example:
              'https://ac.goit.global/fullstack/react/default-avatar.jpg',
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Note: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65f0e2a7c4e3b8c8a1a1a1a1' },
          title: { type: 'string', example: 'Buy groceries' },
          content: { type: 'string', example: 'Milk, bread, eggs' },
          tag: {
            type: 'string',
            enum: [
              'Work',
              'Personal',
              'Meeting',
              'Shopping',
              'Ideas',
              'Travel',
              'Finance',
              'Health',
              'Important',
              'Todo',
            ],
          },
          userId: { type: 'string', example: '65f0e2a7c4e3b8c8a1a1a1a1' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      RegisterInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'user@example.com' },
          password: { type: 'string', example: 'P@ssw0rd123' },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'user@example.com' },
          password: { type: 'string', example: 'P@ssw0rd123' },
        },
      },
      RequestResetEmailInput: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', example: 'user@example.com' },
        },
      },
      ResetPasswordInput: {
        type: 'object',
        required: ['token', 'password'],
        properties: {
          token: { type: 'string', example: 'jwt.token.here' },
          password: { type: 'string', example: 'N3wP@ssw0rd' },
        },
      },
      NoteCreateInput: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string', example: 'Buy groceries' },
          content: { type: 'string', example: 'Milk, bread, eggs' },
          tag: {
            type: 'string',
            enum: [
              'Work',
              'Personal',
              'Meeting',
              'Shopping',
              'Ideas',
              'Travel',
              'Finance',
              'Health',
              'Important',
              'Todo',
            ],
          },
        },
      },
      NoteUpdateInput: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Updated title' },
          content: { type: 'string', example: 'Updated content' },
          tag: {
            type: 'string',
            enum: [
              'Work',
              'Personal',
              'Meeting',
              'Shopping',
              'Ideas',
              'Travel',
              'Finance',
              'Health',
              'Important',
              'Todo',
            ],
          },
        },
      },
      NotesListResponse: {
        type: 'object',
        properties: {
          notes: {
            type: 'array',
            items: { $ref: '#/components/schemas/Note' },
          },
          totalNotes: { type: 'integer', example: 42 },
          totalPages: { type: 'integer', example: 5 },
          page: { type: 'integer', example: 1 },
          perPage: { type: 'integer', example: 10 },
        },
      },
      MessageResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'OK' },
        },
      },
      AvatarResponse: {
        type: 'object',
        properties: {
          url: { type: 'string', example: 'https://res.cloudinary.com/...' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 400 },
          message: { type: 'string', example: 'Validation error' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          400: {
            description: 'Email in use',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout user',
        security: [{ cookieAuth: [] }],
        responses: {
          204: { description: 'No content' },
        },
      },
    },
    '/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh session',
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' },
              },
            },
          },
          401: {
            description: 'Session not found or expired',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/request-reset-email': {
      post: {
        tags: ['Auth'],
        summary: 'Send password reset email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RequestResetEmailInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' },
              },
            },
          },
        },
      },
    },
    '/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Reset password by token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ResetPasswordInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MessageResponse' },
              },
            },
          },
          401: {
            description: 'Invalid or expired token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/notes': {
      get: {
        tags: ['Notes'],
        summary: 'Get notes list',
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
            description: 'Full-text search',
          },
          {
            name: 'tag',
            in: 'query',
            schema: {
              type: 'string',
              enum: [
                'Work',
                'Personal',
                'Meeting',
                'Shopping',
                'Ideas',
                'Travel',
                'Finance',
                'Health',
                'Important',
                'Todo',
              ],
            },
          },
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'perPage',
            in: 'query',
            schema: { type: 'integer', minimum: 1, default: 10 },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotesListResponse' },
              },
            },
          },
        },
      },
      post: {
        tags: ['Notes'],
        summary: 'Create note',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NoteCreateInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Note' },
              },
            },
          },
        },
      },
    },
    '/notes/{noteId}': {
      get: {
        tags: ['Notes'],
        summary: 'Get note by id',
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Note' },
              },
            },
          },
          404: {
            description: 'Note not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      patch: {
        tags: ['Notes'],
        summary: 'Update note',
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NoteUpdateInput' },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Note' },
              },
            },
          },
          404: {
            description: 'Note not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Notes'],
        summary: 'Delete note',
        security: [{ cookieAuth: [] }],
        parameters: [
          {
            name: 'noteId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Note' },
              },
            },
          },
          404: {
            description: 'Note not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/users/me/avatar': {
      patch: {
        tags: ['Users'],
        summary: 'Update user avatar',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  avatar: { type: 'string', format: 'binary' },
                },
                required: ['avatar'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AvatarResponse' },
              },
            },
          },
          400: {
            description: 'No file',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
};
