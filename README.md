# VK-Api
## 1. Создаем приложение

Ссылка: [https://vk.com/editapp?act=create](https://vk.com/editapp?act=create) 

Выбираем Standalone-приложение → Подключить

## 2. Получаем ключ доступа пользователя

Выбираем Authorization code flow, так как будем работать с серверной стороны

Ссылка: [https://vk.com/dev/authcode_flow_user](https://vk.com/dev/authcode_flow_user)

Открываем диалог авторизации

https://oauth.vk.com/authorize?client_id=app_id&scope=status,friends,audio,photos,wall,offline&redirect_uri=https:%2F%2Foauth.vk.com%2Fblank.html&display=page&v=5.131&response_type=token

id приложения — <app_id> берем из пункта 1 во вкладке "настройки"

## 3. Проверяем себя

Пробуем поменять статус: [https://vk.com/dev/status.set](https://vk.com/dev/status.set)

Вводим в адресную строку:

https://api.vk.com/method/status.set?text=hello&access_token=token&v=5.131

<token> — токен из адресной строки в пункте 2

## 4. Получить сообщения из обсуждения группы ВК

[https://vk.com/dev/board.getComments](https://vk.com/dev/board.getComments)
VK is the largest European social network with more than 100 million active users. Our goal is to keep old friends, ex-classmates, neighbors and colleagues in touch.