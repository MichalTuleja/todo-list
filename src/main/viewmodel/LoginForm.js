/* 
 */

var LoginFormViewModel = function() {
    var self = this;
    
    this.isVisible = ko.observable(true);
    this.user = ko.observable('michal.tuleja@outlook.com');
    this.pass = ko.observable('michalsecretpass');
    this.buttonText = ko.observable('Zaloguj');
    
    this.login = function() {
        self.buttonText('Logowanie...');
        self.isVisible(false);
        navbar.isVisible(true);
        Router.switchTo('list-container');
    }
};
