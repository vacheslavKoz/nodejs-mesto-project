# Бэкенд Mesto. Каркас API Mesto

## Используемые технологии и решения
- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения

## Запуск

1. npm install
2. mongod (в отдельном терминале)
3. npm run start
4. Создайте пользователя:
   POST http://localhost:3000/users
   { "name": "Стас", "about": "Разработчик", "avatar": "https://..." }
5. Скопируйте _id из ответа.
6. Вставьте _id в src/middlewares/auth.ts:
   req.user = { _id: "ВАШ_ID" };
7. Перезапустите сервер: Ctrl+C затем npm run start
8. Тестируйте остальные роуты.