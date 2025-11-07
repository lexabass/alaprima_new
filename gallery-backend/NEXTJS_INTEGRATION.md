# Интеграция Strapi с Next.js

## Настройка

1.  **URL API:** Убедитесь, что ваш Next.js-проект знает URL вашего Strapi API. Рекомендуется хранить его в `.env.local` файле:
    ```
    NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
    ```

2.  **Получение данных:** Вы можете использовать `fetch` или любую другую библиотеку для HTTP-запросов (например, `axios`).

## Примеры запросов

Вот несколько примеров, как можно получать данные в Next.js (например, в `getStaticProps` или `getServerSideProps`).

### Получить всех художников с их фото

```javascript
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/artists?populate=photo`);
  const artists = await res.json();

  return {
    props: {
      artists: artists.data,
    },
  };
}
```

### Получить все картины с художниками, категориями и изображениями

```javascript
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/paintings?populate=*`);
  const paintings = await res.json();

  return {
    props: {
      paintings: paintings.data,
    },
  };
}
```

### Получить одну картину по ID

```javascript
export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/paintings/${id}?populate=*`);
  const painting = await res.json();

  return {
    props: {
      painting: painting.data,
    },
  };
}
```

## Отображение изображений

Данные об изображении приходят в виде объекта. Чтобы отобразить изображение, вам нужно использовать URL, который находится в свойстве `url`.

```jsx
// Пример компонента для отображения картины
function Painting({ painting }) {
  const imageUrl = painting.attributes.image.data.attributes.url;
  const artistName = painting.attributes.artist.data.attributes.name;

  return (
    <div>
      <h1>{painting.attributes.title}</h1>
      <p>By {artistName}</p>
      <img src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageUrl}`} alt={painting.attributes.title} />
    </div>
  );
}
```

## Полезные ссылки

*   [Strapi Documentation - REST API](https://docs.strapi.io/dev-docs/api/rest)
*   [Strapi Documentation - Populate](https://docs.strapi.io/dev-docs/api/rest/populate-select)
