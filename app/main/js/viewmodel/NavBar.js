/* 
 */

var NavBarViewModel = function() {
    var self = this;
    
    this.isVisible = ko.observable(false);
    this.isAdmin = ko.observable(false);
    this.userName = ko.observable('Unregistered User');
    
    this.syncSign = {
        refresh: ko.observable(false),
        cloud: ko.observable(false),
        local: ko.observable(true),
        error: ko.observable(false)
    };
    
    this.logout = function() {
        self.isVisible(false);
        self.userName('Unregistered User');
        
        Router.switchTo('signin-container');
    };
    
    this.sync = function() {
        console.log("Synchronizing data...");
        Signals.data.forceSync.dispatch();
    };
    
    this.setStatusIcon = function(iconName) {
        for(sign in self.syncSign) {
            self.syncSign[sign](false);
        }
        
        try {
            self.syncSign[iconName](true);
        }
        catch(e) {
            
        }
    };
};

