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
select * from task_to_user left join task on task.task_id = task_to_user.task_id right join user on task_to_user.user_id = user.user_id order by task_to_user.task_to_user_id

# zapytanie wyciągające dane z profilu usera
select * from user where email = ''


