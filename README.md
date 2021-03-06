# Личный менеджер книг

С помощью этого сервиса можно добавлять книги в список к прочтению. 
Цель проекта — создать программу по управлению личными книгами. 
В работе применён чистый JavaScript без фреймворков и реализован Drag'n'Drop в списке. Так же использован сборщик статики Gulp и препроцесоор SASS. Сервис адаптирован под мобильные устройства.

##### Скриншот проекта
![Скриншот проекта](screen.png "Скриншот проекта")


# Используемые технологии

- HTML
- JavaScript
- SCSS:
  * переменные
  * наследование
  * модули
- Gulp:
  * autoprefixer
  * livereload
  * minify
  * sass
  * terser
 
# Возможности

- Добавлять книги с описанием в список к прочтению
- Drag'n'Drop книг вверх и вниз по списку
- Перемещать книги в архив прочитанных и просматривать его 

# TODO
- [x] Список книг
- [x] Добавление новых книг
- [x] Архив книг  
- [x] Drag'n'Drop 
- [ ] Drag'n'Drop на мобильных устройствах 
- [ ] API Google книг

# Демо/запуск проекта

Посмотреть можно по ссылке [https://mileor.github.io/toread](https://mileor.github.io/toread)

Чтобы запустить проект на своём компьютере — достаточно склонировать репозиторий и выполнить команды:
```
npm install
gulp
```
После работы Gulp появится папка `dist` с готовым проектом.
Запуск — открыть файл `index.html`