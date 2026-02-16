# NoteHub API

Backend для застосунку нотаток із авторизацією, сесіями в cookies та відновленням пароля.

**Посилання**
- Frontend (деплой): http://09-auth-inky-tau.vercel.app
- Backend (репозиторій): https://github.com/Anna-Makovska/nodejs-hw

**Функціонал**
- Реєстрація, логін, логаут та оновлення сесії через httpOnly cookies.
- Відновлення пароля через email і токен.
- CRUD нотаток з пошуком, фільтрацією за тегом і пагінацією.
- Завантаження аватара користувача (Cloudinary).

**Технології**
- Node.js, Express, MongoDB, Mongoose
- bcrypt для хешування паролів
- JWT для токенів відновлення пароля
- Nodemailer + Handlebars для email-шаблонів
- Cloudinary для зберігання аватарів
- Celebrate/Joi для валідації

**API**

| Method | Route | Description | Auth |
| --- | --- | --- | --- |
| POST | `/auth/register` | Реєстрація | No |
| POST | `/auth/login` | Логін | No |
| POST | `/auth/logout` | Логаут | Yes |
| POST | `/auth/refresh` | Оновити сесію | Yes |
| POST | `/auth/request-reset-email` | Надіслати email для відновлення | No |
| POST | `/auth/reset-password` | Скинути пароль за токеном | No |
| GET | `/notes` | Список нотаток (`search`, `tag`, `page`, `perPage`) | Yes |
| GET | `/notes/:noteId` | Отримати нотатку | Yes |
| POST | `/notes` | Створити нотатку | Yes |
| PATCH | `/notes/:noteId` | Оновити нотатку | Yes |
| DELETE | `/notes/:noteId` | Видалити нотатку | Yes |
| PATCH | `/users/me/avatar` | Оновити аватар (multipart `avatar`) | Yes |

Авторизація працює через cookies (`accessToken`, `refreshToken`, `sessionId`). На фронтенді потрібно робити запити з `credentials: 'include'`.

**Swagger**
- Документація доступна за адресою /api-docs (наприклад: http://localhost:3000/api-docs).

**Запуск проєкту локально**
1. `npm install`
1. Створіть `.env` за прикладом нижче
1. `npm run dev`

**Приклад .env**

```env
PORT=3000
NODE_ENV=development
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

SMTP_HOST=<smtp_host>
SMTP_PORT=587
SMTP_USER=<smtp_user>
SMTP_PASSWORD=<smtp_password>
SMTP_FROM=<smtp_from>

FRONTEND_DOMAIN=http://localhost:3000

CLOUDINARY_CLOUD_NAME=<cloudinary_cloud_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
```