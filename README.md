Dodanie plików do projektu:
git add [nazwa_pliku] [nazwa_folderu] ...

Dodanie zakommitowanych przez siebie zmian:

git remote add origin https://github.com/MichalTuleja/cloud-project.git

git push -u origin master

Na wypadek problemów z certyfikatem SSL:
git config --global http.sslVerify false
