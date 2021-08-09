const http = require('http');
const port = process.env.PORT || 8080;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');
const slow = require('koa-slow');
const faker = require('faker');
faker.locale = 'ru';

const app = new Koa();
const server = http.createServer(app.callback());
const router = new Router();


app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET'],
  })
);

app.use(koaBody({
  json: true,
  text: true,
  urlencoded: true,
}));

app.use(slow({
  delay: 6000
}));

app.use(router.routes()).use(router.allowedMethods());

router.get('/articles', async (ctx) => {
  const articles = [];
  
  for (let i = 0; i < 4; i++) {
    const article = {
      id: faker.datatype.uuid(),
      image: faker.image.avatar(),
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      received: new Date().toLocaleString('ru'),
    };
    articles.push(article);
  };
  
  ctx.response.body = articles;
});

server.listen(port, () => console.log('Server started'));