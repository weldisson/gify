const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');


routes.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();

    return res.json(posts);
  } catch (error) {
    return res.status(400).json({ Error: 'Erro ao buscar a imagem' });
  }
});

routes.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.send(post);
  } catch (error) {
    return res.status(400).json({ Error: 'Erro ao buscar a imagem' });
  }
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  try {
    const {
      originalname: name, size, key, location: url = '',
    } = req.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return res.json(post);
  } catch (error) {
    return res.status(400).json({ Error: 'Erro ao enviar a imagem' });
  }
});

routes.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.send();
  } catch (error) {
    return res.status(400).json({ Error: 'Erro ao deletar a imagem' });
  }
});

module.exports = routes;
