# Бэкенд Mesto. Каркас API Mesto

## Используемые технологии и решения
- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения


## Используемые технологии

- TypeScript
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- celebrate + Joi
- Winston

## Запуск

1. `npm install`
2. `mongod` (в отдельном терминале)
3. `npm run start`

## Роуты

### Публичные

#### `POST /signup` — регистрация пользователя

**Обязательные поля:**
- `email` — валидный email
- `password` — минимум 8 символов

**Необязательные поля (есть дефолты):**
- `name` — 2–30 символов (по умолчанию `"Жак-Ив Кусто"`)
- `about` — 2–200 символов (по умолчанию `"Исследователь"`)
- `avatar` — валидный URL (по умолчанию `"https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"`)

**Пример запроса:**
POST http://localhost:3000/signup
{
"email": "stas@example.com",
"password": "12345678"
}

text

**Ответ:** `201 Created` + объект пользователя (без пароля).

---

#### `POST /signin` — вход

**Обязательные поля:**
- `email` — валидный email
- `password` — минимум 8 символов

**Пример запроса:**
POST http://localhost:3000/signin
{
"email": "stas@example.com",
"password": "12345678"
}

text

**Ответ:** `200 OK` + `{ "token": "..." }`.

**Скопируйте `token`** — он нужен для защищённых роутов.

---

### Защищённые (требуют `Authorization: Bearer <token>`)

#### `GET /users` — все пользователи

#### `GET /users/me` — текущий пользователь

#### `GET /users/:userId` — пользователь по `_id`

#### `PATCH /users/me` — обновление профиля

**Поля:** `name` (2–30), `about` (2–200).

#### `PATCH /users/me/avatar` — обновление аватара

**Поле:** `avatar` (валидный URL, обязательное).

#### `GET /cards` — все карточки

#### `POST /cards` — создание карточки

**Обязательные поля:**
- `name` — 2–30 символов
- `link` — валидный URL

#### `DELETE /cards/:cardId` — удаление своей карточки

#### `PUT /cards/:cardId/likes` — поставить лайк

#### `DELETE /cards/:cardId/likes` — убрать лайк

## Передача токена

Для защищённых роутов добавьте заголовок:
Authorization: Bearer <token>

text

`token` — из ответа `POST /signin`.
