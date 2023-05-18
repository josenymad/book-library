const app = require('./src/app');

const APP_PORT = process.env.PORT || 4000;

app.listen(3000, () => console.log(`App is listening on port ${APP_PORT}`));
