# M3 RepoDocs — Material Design 3 Explorer

Веб-приложение на чистом **Material Design 3** для удобного просмотра документации (Markdown), файлов, истории коммитов и релизов из репозиториев GitHub.

## 🚀 Как запустить локально

1. Убедитесь, что вы находитесь в папке проекта:
   ```bash
   cd site
   ```

2. Запустите сервер разработки:
   ```bash
   npm run dev
   ```
   *(Внимание: проверьте английскую раскладку клавиатуры — не `npm run вум` 😉)*

3. Откройте в браузере ссылку:
   `http://localhost:3000/`

---

## 🌐 Как выложить (захостить) сайт в интернет (Бесплатно)

### Вариант 1: Vercel (Самый простой вариант за 1 минуту)
1. Выложите проект на ваш GitHub:
   ```bash
   git add .
   git commit -m "Material Design 3 Repo Explorer"
   git push origin main
   ```
2. Зайдите на сайт [vercel.com](https://vercel.com) и войдите через GitHub.
3. Нажмите **Add New Project** → Выберите этот репозиторий.
4. Нажмите **Deploy**. Готово! Вы получите бесплатную ссылку вида `https://<имя-проекта>.vercel.app`.

---

### Вариант 2: Netlify Drop (Без использования Git)
1. Скомпилируйте проект:
   ```bash
   npm run build
   ```
   В проекте появится папка `dist`.
2. Зайдите на сайт [app.netlify.com/drop](https://app.netlify.com/drop).
3. Перетащите папку `dist` прямо в окно браузера. Сайт моментально станет доступен по ссылке!

---

### Вариант 3: GitHub Pages
1. Установите пакет `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. В `package.json` в секцию `"scripts"` добавьте:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Выполните:
   ```bash
   npm run deploy
   ```
