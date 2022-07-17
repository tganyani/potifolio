import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import PostsRoute from '@/routes/posts.route'

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new PostsRoute()]);

app.listen();

export default app
