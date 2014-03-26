var tabs = ['list-container', 'stats-container'];

var hideAll = function() {
    for(var i = 0; i < tabs.length; i++) {
        $('#' + tabs[i]).hide();
    }
}

var switchTo = function(tabName) {
    hideAll();
    $('#' + tabName).show();
}

var removeClassActiveForAllAndPrepareView = function(activeElem) {
    $('#show-stats').parent().removeClass('active');
    $('#show-tasks').parent().removeClass('active');
    $(activeElem).parent().addClass('active');
}


$(document).ready(function(){
    $('#show-tasks').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('list-container'); 
    });
    
    $('#show-stats').click(function() { 
        removeClassActiveForAllAndPrepareView(this);
        //$(this).parent().addClass('active');
        switchTo('stats-container'); 
    });
    //$('#show-container').click(function() { switchTo('login'); });
    
    $('#show-tasks').click();
});

