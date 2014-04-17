/* 
 */

var NavBarViewModel = function() {
    var self = this;
    
    this.isVisible = ko.observable(false);
    this.isAdmin = ko.observable(false);
    this.userName = ko.observable('Unregistered User');
    
    this.logout = function() {
        self.isVisible(false);
        self.userName('Unregistered User');
        
        Router.switchTo('signin-container');
    }
};

