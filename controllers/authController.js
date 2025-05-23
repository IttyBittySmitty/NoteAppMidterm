import passport from 'passport';

export const login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/notes',
  successFlash: 'You are now logged in!'
});

export const logout = (req, res) => {
  req.logout(() => {
    req.flash('success', 'You are now logged out!');
    res.redirect('/login');
  });
};

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'You must be logged in to do that!');
  res.redirect('/login');
}; 