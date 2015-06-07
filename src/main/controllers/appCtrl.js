/* 
 */

module.exports = function($scope, store) {
    
    var storage = [
        {'title': 'Buy eggs', 'description': 'Medium size', ctime: '1433547222', mtime: '1433547452', local_mtime: '1433547782', done: false},
        {'title': 'Repair car', 'description': 'Clutch & Brakes', ctime: '1433556122', mtime: '1433234122', local_mtime: '1433545622', done: true},
    ];

    var addTask = function() {
        var currentTimestamp = parseInt(new Date().getTime() / 1000);
        
        // prevent adding empty task
        if(inputIsEmpty()) {
            return false;
        }
        
        $scope.todos.push({
                title: $scope.newTaskInput, 
                description: '', 
                ctime: currentTimestamp, 
                mtime: currentTimestamp,
                local_mtime: currentTimestamp, 
                done: false
            });
            
        resetInput();
        saveTodos();
    };
    
    var inputIsEmpty = function() {
        if($scope.newTaskInput === '') return true;
        return false;
    };
    
    var resetInput = function() {
        $scope.newTaskInput = '';
    };
    
    var saveTodos = function() {
        store.set('todoData', $scope.todos);
    };
    
    var loadTodos = function() {
        $scope.todos = store.get('todoData');
        
        if($scope.todos === null || $scope.todos.length === 0) {
            $scope.todos = storage;
            saveTodos();
        }
    };
    
    $scope.$watch('todos',function() {
        saveTodos();
    },true);
    
    $scope.addTask = addTask;
    $scope.navbarCollapsed = true;
    $scope.newTaskInput = '';
    $scope.saveTodos = saveTodos;
    
    loadTodos();
    

};
