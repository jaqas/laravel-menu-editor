<?php

Route::group(['namespace' => 'Jaqas\Menu\Http\Controllers', 'middleware' => config('menu.middleware')], function(){
    Route::post(config('menu.link'), 'MenuController@store');    
});