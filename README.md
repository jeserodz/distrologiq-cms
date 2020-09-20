# Champtrack Web

This is the web client for Champtrack.

## Installation

Run these commands using a terminal.

```sh
git clone git@github.com:fiberxel/champtrack-web.git
cd champtrack-web
npm install
```

## Configuration

The runtime configuration specifies settings for the app like `API_URL`.

### For Development

For developers, the runtime configuration is located at [`public/config.js`](./public/config.js).

### For Production

For production, the runtime configuration is loaded from environment variables.

An `.env` file can be created at the project root and the production server will load it when `npm start` runs. See [`.env.example`](./.env.example) for configuration details.

## Development

To start the development server, run these commands in the terminal:

```sh
npm run dev
```

## Build

### Using NPM

To build the application locally using NPM, run this command:

```sh
npm run build
```

### Using Docker

To build the application using Docker, run these commands:

```sh
docker build -t fiberxel/champtrack-web .
```

#### (Optional) Publish the application Docker image

To publish the application Docker image so it can be deployed in remote servers, run this command:

```sh
docker push fiberxel/champtrack-web
```

## Deployment

### Using NPM

To run the application locally using NPM, run this command:

```sh
npm start
```

### Using Docker

To deploy the application using Docker:

```sh
docker run \
  --env-file .env \
  --port 3000:3000 \
  fiberxel/champtrack-web
```

### Using Docker Compose

To deploy the application using Docker Compose:

```yaml
version: '3'

services:
  champtrack-web:
    image: fiberxel/champtrack-web
    env_file:
      - ./env_files/champtrack-web.env
    expose:
      - 3000
    labels:
      - traefik.http.routers.champtrack-web-api.rule=Host(`tenant.champtrack.com`)
      - traefik.http.routers.champtrack-web.entrypoints=web,websecure
      - traefik.http.routers.champtrack-web.tls=true
      - traefik.http.routers.champtrack-web.tls.certresolver=myresolver
```

## Implementation Details

### Application Context

The application Context provides global data and functionality like:

- Logged-in status
- User details
- API access token
- and more...

Check out [Context](./src/Context.ts) for more details.

#### Examples

- Checking for logged-in status

```jsx
function SomeComponent() {
  const context = useContext(Context);

  return <div>{context.loggedIn ? 'Yay!' : 'Get out!'}</div>;
}
```

- Getting the API configuration

```jsx
function SomeComponent() {
  const context = useContext(Context);

  const usersApi = new UsersApi(context.getApiConfig());

  return <div>Some component that needs to call the API.</div>;
}
```

- Saving and loading context with LocalStorage

```jsx
function SomeComponent() {
  const context = useContext(Context);

  return (
    <div>
      This component saves and loads the context to LocalStorage.
      <button onClick={() => context.save()}>Save</button>
      <button onClick={() => context.load()}>Load</button>
    </div>
  );
}
```

### AuthGuard

The AuthGuard ensures that the user can access the screen. If the user can't access the screen, the guard redirects the user.

```jsx
function SomeProtectedScreen() {
  return (
    <AuthGuard loggedIn>
      <div>Some protected contect.</div>
    </AuthGuard>
  );
}
```

### API Integration

We're using [OpenAPI Generator](https://openapi-generator.tech/) to generate a typed API client and models from the API server.

#### Generate API Client & Models

To generate (or update) the API client and models from the API server, run this command:

```bash
npm run generate:api
```

The result output will be located at `src/api`.
