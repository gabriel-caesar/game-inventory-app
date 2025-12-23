exports.homePageGet = async (req, res) => {
  res.render('home', { title: 'Home page', games: [] });
}