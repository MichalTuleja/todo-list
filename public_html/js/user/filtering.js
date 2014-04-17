/* 
 */

// Task list filter
$('#task-list-filter').change( function () {
				var filter = $(this).val();
				if(filter) {
					$('#task-list').find("tbody:not(:Contains(" + filter + "))").hide();
					$('#task-list').find("tbody:Contains(" + filter + ")").show();
				} else {
					$('#task-list').find("tbody").show();
				}
				
				return false;
			})
			.keyup( function () {
				$(this).change();
			});
