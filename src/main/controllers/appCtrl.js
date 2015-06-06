/* 
 */

module.exports = function($scope) {
    
    var storage = [
        {'title': 'Buy eggs', 'description': 'Medium size', ctime: '1433547222', mtime: '1433547452', local_mtime: '1433547782', done: false},
        {'title': 'Repair car', 'description': 'Clutch & Brakes', ctime: '1433556122', mtime: '1433234122', local_mtime: '1433545622', done: true},
    ];

    var addTask = function() {
        var currentTimetamp = parseInt(new Date().getTime() / 1000);
        
        if(inputIsEmpty) {
            return false;
        }
        
        $scope.todos.push({
                title: $scope.newTaskInput, 
                description: '', 
                ctime: currentTimetamp, 
                mtime: currentTimetamp,
                local_mtime: currentTimetamp, 
                done: false
            });
            
        resetInput();
    };
    
    var inputIsEmpty = function() {
        if($scope.newTaskInput === '') return true;
        return false;
    };
    
    var resetInput = function() {
        $scope.newTaskInput = '';
    };
    
    var todos = storage;
    
    $scope.todos = todos;
    $scope.addTask = addTask;
    $scope.navbarCollapsed = true;
    $scope.newTaskInput = '';
};
