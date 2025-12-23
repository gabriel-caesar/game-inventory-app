exports.createGamePageGet = async (req, res) => {
  res.render('create-game', { title: 'Create game' });
}