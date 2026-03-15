# Dev Toolbox

<p align="center">
  <strong>Сборник полезных утилит для разработки. Собрано на Next.js && TypeScript.</strong>
</p>

<p align="center">
  JSON Formatter • Regex Tester • Color Converter • Base64 Tool • JWT Decoder
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/shadcn-ui-black" />
  <img src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

## О проекте

**Dev Toolbox** — это набор небольших веб‑утилит для разработчиков.

Проект объединяет инструменты, которые часто используются в работе:

- форматирование JSON  
- тестирование регулярных выражений  
- конвертация цветов  
- кодирование Base64  
- просмотр содержимого JWT токенов  

Основная цель проекта — показать аккуратную архитектуру frontend‑приложения и удобный UX для developer tools.

---

# Возможности

## JSON Formatter

Инструмент для форматирования и проверки JSON.

Функции:

- pretty formatting
- JSON minify
- проверка валидности
- понятные ошибки синтаксиса
- копирование результата
- очистка и вставка данных

---

## Regex Tester

Тестер регулярных выражений.

Функции:

- ввод regex‑паттерна
- тестовый текст
- поддержка флагов g, i, m
- подсветка совпадений
- список найденных матчей
- отображение ошибок regex

---

## Color Converter

Конвертер цветов между форматами.

Поддерживаемые форматы:

- HEX
- RGB
- HSL

Функции:

- автоматическая конвертация
- превью цвета
- копирование каждого формата
- поддержка shorthand HEX (#fff)

---

## Base64 Tool

Инструмент кодирования и декодирования Base64.

Функции:

- encode текст → Base64
- decode Base64 → текст
- swap input/output
- копирование результата
- корректная работа с Unicode

---

## JWT Decoder

Просмотр содержимого JWT токенов.

Функции:

- декодирование header
- декодирование payload
- отображение JSON
- вывод даты истечения (exp)
- статус токена (expired / active)

⚠ Подпись токена не проверяется — инструмент только декодирует данные.

---

# Стек технологий

Frontend:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Инструменты разработки:

- pnpm
- ESLint
- Prettier

Деплой:

- Vercel

---

# Установка

Клонировать репозиторий

```
git clone https://github.com/RezyJS/dev-toolbox.git
cd dev-toolbox
```

Установить зависимости

```
pnpm install
```

Запустить dev‑сервер

```
pnpm dev
```

Открыть

```
http://localhost:3000
```

---

# Скрипты

```
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm format
```
