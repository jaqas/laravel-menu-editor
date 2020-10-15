<?php 

namespace Jaqas\Menu;

use Illuminate\Support\ServiceProvider;

class MenuServiceProvider extends ServiceProvider {

    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes/web.php');
        $this->loadViewsFrom(__DIR__.'/views', 'menu');
        $this->loadMigrationsFrom(__DIR__.'/database/migrations');

        $this->publishes([
            
            //public file
            __DIR__.'/../assets' => public_path('jaqas-menu'),

            //config file
            __DIR__.'/../config/menu.php' => config_path('menu.php'),

        ], 'public');

    }

    public function register()
    {
        
    }
}