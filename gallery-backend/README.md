# Backend для Художественной Галереи на Strapi

Этот проект представляет собой backend, созданный на Strapi, для сайта художественной галереи.

## Модели данных

*   **Artist (Художник):** `name`, `bio`, `photo`, `birth_date`.
*   **Painting (Картина):** `title`, `description`, `creation_date`, `image`, связь с `Artist` и `Category`.
*   **Category (Категория):** `name`.

---

## Запуск в режиме разработки

1.  **Создайте `.env` файл:**
    В корне проекта создайте файл `.env` и скопируйте в него содержимое `.env.example` (если он есть) или используйте этот шаблон:

    ```
    HOST=0.0.0.0
    PORT=1337

    # Сгенерируйте эти ключи с помощью node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
    APP_KEYS=your_app_key_1,your_app_key_2
    ADMIN_JWT_SECRET=your_admin_jwt_secret
    API_TOKEN_SALT=your_api_token_salt
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    ```

3.  **Запустите Strapi:**
    ```bash
    npm run develop
    ```

4.  **Создайте администратора:**
    Откройте в браузере `http://localhost:1337/admin` и создайте первого пользователя-администратора.

---

## Подготовка к продакшену

1.  **База данных:**
    *   Не используйте SQLite в продакшене. Переключитесь на PostgreSQL или MySQL.
    *   Установите соответствующий npm-пакет (`pg` для PostgreSQL, `mysql` для MySQL).
    *   Обновите `config/database.js` с настройками вашей продакшен-базы данных.

2.  **Облачное хранилище:**
    *   Для хранения изображений используйте облачные провайдеры (например, AWS S3, Cloudinary).
    *   Установите соответствующий плагин (например, `@strapi/provider-upload-cloudinary`).
    *   Настройте его в `config/plugins.js` и установите переменные окружения на вашем хостинге.

3.  **Сборка проекта:**
    ```bash
    npm run build
    ```

4.  **Запуск в продакшене:**
    ```bash
    npm run start
    ```
    Убедитесь, что все переменные из вашего `.env` файла установлены на вашем хостинге.
