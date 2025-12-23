exports.createGenrePageGet = async (req, res) => {
  res.render('create-genre', { title: 'Create genre' });
}