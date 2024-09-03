
# Описание вашего сервера

## 1. Общие сведения
Сервер представляет собой RESTful API, разработанный на базе Node.js с использованием фреймворка Express и ORM Sequelize. Сервер предназначен для управления пользователями, книгами, отзывами и комментариями в приложении, предоставляя функциональность для аутентификации, создания, редактирования и удаления данных. Также предусмотрена возможность управления избранными книгами пользователей.

## 2. Стек технологий

<div style="display: flex; flex-wrap: wrap;">
    <a href="https://nodejs.org" target="_blank">
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://expressjs.com" target="_blank">
        <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://sequelize.org" target="_blank">
        <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://jwt.io" target="_blank">
        <img src="https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://www.mysql.com" target="_blank">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://en.wikipedia.org/wiki/MD5" target="_blank">
        <img src="https://img.shields.io/badge/MD5-000000?style=for-the-badge&logo=md5&logoColor=white" alt="MD5" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://joi.dev" target="_blank">
        <img src="https://img.shields.io/badge/Joi-5D5D5D?style=for-the-badge&logo=joi&logoColor=white" alt="Joi" style="width: 100px; height: 27px; margin: 5px;">
    </a>
    <a href="https://www.npmjs.com/package/dotenv" target="_blank">
        <img src="https://img.shields.io/badge/dotenv-1F3F4F?style=for-the-badge&logo=npm&logoColor=white" alt="dotenv" style="width: 100px; height: 27px; margin: 5px;">
    </a>
</div>





## 3. Структура базы данных
Ваше приложение включает следующие модели:
- **Users:** Пользователи приложения.
- **Book:** Книги, добавленные пользователями.
- **Review:** Отзывы на книги, оставленные пользователями.
- **Favorite:** Избранные книги пользователей.
- **Comment:** Комментарии к отзывам.

Эти модели имеют связи, такие как один ко многим (например, один пользователь может иметь много книг, один отзыв может иметь много комментариев).

## 4. API Эндпоинты

### 4.1 Пользователи (Users)
- **POST /users/registration:** Регистрация нового пользователя.
- **POST /users/login:** Авторизация пользователя.
- **GET /users/user/profile:** Получение профиля авторизованного пользователя.
- **GET /users/:userId/review-summary:** Получение сводки отзывов пользователя.
- **PUT /users/update/user/profile:** Обновление профиля пользователя.

### 4.2 Книги (Books)
- **POST /books/create:** Создание новой книги.
- **GET /books/show/books:** Получение списка книг.
- **GET /books/top-rated:** Получение списка книг с наивысшим рейтингом.
- **GET /books/authors/book-count:** Получение количества книг по авторам.
- **GET /books/:id/favorite:** Добавление книги в избранное.
- **DELETE /books/:id/favorite:** Удаление книги из избранного.

### 4.3 Обзоры (Reviews)
- **POST /reviews/:id:** Создание нового отзыва.
- **GET /reviews/show:** Получение списка отзывов.
- **GET /reviews/:id:** Просмотр отзыва по его идентификатору.
- **GET /reviews/most-active:** Получение списка самых активных рецензентов.

### 4.4 Комментарии (Comments)
- **POST /comments/review/:id:** Добавление комментария к отзыву.
- **GET /comments/show/:id:** Получение комментариев к определенному отзыву.

### 4.5 Админ панель (Admin)
- **GET /admin/users/list:** Получение списка пользователей.
- **GET /admin/review:** Получение списка отзывов для администрирования.
- **DELETE /admin/review/:id:** Удаление отзыва.
- **DELETE /admin/delete/user/:id:** Удаление пользователя.

## 5. Авторизация и Аутентификация
JWT: Токены создаются с использованием `jsonwebtoken` и сохраняются в заголовках запросов для авторизованных операций. Токены имеют срок действия 30 дней.

## 6. Настройки и конфигурации
Все настройки хранятся в `.env` файле, включая параметры подключения к базе данных и секреты для JWT. Пример файла конфигурации:

```plaintext
PORT=
USER_PASSWORD_SECRET=
JWT_TOKEN=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

## 7. Развертывание
Чтобы развернуть сервер, выполните следующие шаги:

Склонируйте репозиторий и установите зависимости с помощью `npm install` или `yarn`.
Настройте файл `.env`с параметрами вашего окружения.
Запустите миграции для создания таблиц в базе данных.
Запустите сервер командой `npm run dev ` или `yarn dev`.

## 8. Логирование и обработка ошибок
Обработка ошибок реализована в контроллерах, и в случае ошибки возвращается ответ с соответствующим статусом и сообщением. Логирование подключения к базе данных включено в конфигурацию Sequelize.


