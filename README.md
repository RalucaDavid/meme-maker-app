# Meme Maker App

An Angular app for creating memes from popular templates using the [Imgflip API](https://imgflip.com/api).

Browse the most popular meme templates, pick one, add your text and download the result.

## Features

- **Template gallery** – loads the top meme templates from Imgflip, shown as cards with the number of text boxes each template supports.
- **Search & pagination** – filter templates by name and browse them page by page.
- **Meme editor** – a form that adapts to the selected template's number of text boxes.
- **Live result** – preview the generated meme, download it or open it on Imgflip.
- **Multi-language** – English and Romanian, switchable at runtime (Transloco).
- **Responsive UI** – built with Angular Material, works on desktop and mobile.
- **Error handling** – HTTP errors are caught by an interceptor and shown as notifications.

## Tech stack

- [Angular 22](https://angular.dev) (standalone components, signals, lazy-loaded routes)
- [Angular Material](https://material.angular.dev)
- [Transloco](https://jsverse.gitbook.io/transloco) for i18n
- [RxJS](https://rxjs.dev)
- [Vitest](https://vitest.dev) for unit tests

## Getting started

### Prerequisites

- Node.js (a version supported by Angular 22)
- npm
- A free [Imgflip account](https://imgflip.com/signup) (needed for generating memes)

### Installation

```bash
git clone https://github.com/RalucaDavid/meme-maker-app.git
cd meme-maker-app/meme-maker-app
npm install
```

### Configure the environment

The environment files with credentials are not committed. Create them from the example:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.example.ts src/environments/environment.development.ts
```

Then fill in your Imgflip credentials:

```ts
export const environment = {
  production: false, // set to true in environment.ts
  baseUrl: 'https://api.imgflip.com',
  imgflipUsername: 'YOUR_USERNAME_IMGFLIP',
  imgflipPassword: 'YOUR_PASSWORD_IMGFLIP',
};
```

> **Note:** the credentials are added to Imgflip requests by `imgflipInterceptor` on the client, so they end up in the built JavaScript. Use a dedicated Imgflip account, not one you care about.

### Run

```bash
npm start
```

Open [http://localhost:4200](http://localhost:4200).
