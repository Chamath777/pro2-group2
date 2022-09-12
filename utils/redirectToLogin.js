function RedirectToLogin (req, res, next)
{
	if (req.session.logged_in === false) res.redirect('/login');
	else next();
};

module.exports = RedirectToLogin;