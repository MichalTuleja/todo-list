# zapytanie wyciągające dane z profilu usera
select
	user_id as uid,
	name,
	surname,
	email,
	password,
	role,
	is_active as active	
	modification_date as mdate,
	creation_date as cdate
from
	user
where
	email = ''

# zapytanie zwracające wszystkich userów
select
	user_id as uid,
	name,
	surname,
	email,
	role,
	is_active as active,
	modification_date as mdate,
	creation_date as cdate
order by
	surname

# zapytanie usuwające/modyfikujące usera
update
	user
set
	name='',
	surname='',
	email='',
	password='',
	role='',
	is_active='',
	modification_date=''
where
	user_id='';

# zapytanie zwraca cablicę wszystkich tasków w raz z przypisanymi userami - filtrowac będzie trzeba dokładniej na poziomie kodu
# daje to możliwość wyświetlenia jednemu userowi zadań w formacie:
# Zadanie 1
# Zadanie 2
# Zadanie 3
# -user2
# -user3
# Zadanie 4
#
# minus jest taki, że dokładniejsze filtrowanie trzeba zrobić na poziomie kodu,
# z drugiej strony można jednym zapytaniem wyświetlić globalnie zadania jak równiez dla jednego usera
select
	ttu.task_to_user_id as ttuid,
	ttu.task_id as tid,
	ttu.user_id as uid,
	t.title as title,
	t.done as done,
 	t.deleted as deleted,
 	t.modification_date as mdate,
 	t.creation_date as cdate,
 	u.name as name,
 	u.surname as surname,
 	u.email as email,
	u.role as role,
	u.is_active as active
from
	task_to_user as ttu
left join
	task as t
	on t.task_id = ttu.task_id
right join
	user as u
	on ttu.user_id = u.user_id
order by
	t.cdate

# zapytanie zwracające opis konkretnego zadania
select
	task_id as tid, description as desc
from
	task
where
	tid=''

# zapytanie dodające task do bazy
insert into
	task (
		title,
		description,
		done,
		deleted,
		modification_date,
		creation_date)
values (
	'',
	'',
	'',
	'',
	NOW(),
	NOW())

# zapytanie usuwające/modyfikujące task
update
	task
set
	title='',
	description='',
	done='',
	deleted='',
	monification_date=NOW()
where
	task_id=''

# zapytanie łączące task z userem
insert into
	task_to_user (
		task_id,
		user_id)
values (
	'',
	'')

# zapytanie modyfikujące powiązanie task-user
update
	task_to_user
set
	task_id='',
	user_id='',
where
	task_to_user_id=''

# zapytanie usuwające powiązanie task-user
delete from
	task_to_user
where
	task_to_user_id=''



