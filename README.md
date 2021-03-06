# laravel menu editor
Laravel Drag and Drop menu editor

![Test Image 5](https://github.com/jaqas/laravel-menu-editor/blob/main/Screenshot.png)

### Installation

1. Run

```php
composer require jaqas/menu
```

**_Step 2 & 3 are optional if you are using laravel 5.5_**

2. Add the following class, to "providers" array in the file config/app.php

```php
Jaqas\Menu\MenuServiceProvider::class,
```

3. add facade in the file config/app.php (optional on laravel 5.5)

```php
'Menu' => Jaqas\Menu\Menu::class,
```

4. Run publish

```php
php artisan vendor:publish --provider="Jaqas\Menu\MenuServiceProvider"
```
5. Run migrate

```php
php artisan migrate
```

### Menu Editor Usage Example
Displays The Editor
```php
{{Menu::editor()}}
```
Get Menu By Array
```php
{{Menu::menu_array()}}
```
Configure in **_config/menu.php_** :

- **_CUSTOM MIDDLEWARE:_** You can add you own middleware
- **_Custom routes_** If you want to edit the route path you can edit the link
