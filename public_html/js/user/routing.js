/* 
 */

var tabs = ['list-container', 'stats-container', 'signin-container', 'profile-container', 'userlist-container', 'tasklist-container', 'useredit-container'];

var Router = new (function() {
    this.initialize = function() {
        hideAll();
        bindEvents();
        removeClassActiveForAllAndPrepareView("#show-tasks");
    }
    
    this.switchTo = function(tabName) {
        hideAll();
        $('#' + tabName).show();
    }
    
    var bindEvents = function() {
        
        var bind = function(button, container) {
            try {
                $('#' + button).click(function() { 
                    removeClassActiveForAllAndPrepareView(this);
                    Router.switchTo(container); 
                });
            }
            catch(e) {
            }
        }
        
        bind('show-tasks', 'list-container');
        bind('show-tasklist', 'tasklist-container');
        bind('logo', 'list-container');
        bind('show-stats', 'stats-container');
        bind('logout', 'signin-container');
        bind('show-profile', 'profile-container');
        bind('show-userlist', 'userlist-container');
    }

    var hideAll = function() {
        for(var i = 0; i < tabs.length; i++) {
            $('#' + tabs[i]).hide();
        }
    }

    var removeClassActiveForAllAndPrepareView = function(activeElem) {
        $('#show-stats').parent().removeClass('active');
        $('#show-tasks').parent().removeClass('active');
        $('#show-userlist').parent().removeClass('active');
        $('#show-profile').parent().removeClass('active');
        $('#show-tasklist').parent().removeClass('active');
        $(activeElem).parent().addClass('active');
    }
})();
