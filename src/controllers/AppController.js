const AppController = {};

AppController.index = (req, res) => {
    res.render('wellcome');
}

AppController.comments = (req, res) => {
    res.render('comment');
}

AppController.login = (req, res) => {
    res.render('login');
}

module.exports = AppController;