<?php

namespace Jaqas\Menu\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Jaqas\Menu\Models\Menu;
use app\Http\Middleware;

class MenuController extends Controller
{
    //save menu items 
    public function store(Request $request)
    {
        $title = $request->menu_item_title;
        $link = $request->menu_item_url;
        $parent = $request->menu_item_parent;
        $depth = $request->menu_item_depth;

        //remove all rows
        Menu::truncate();

        for ($i=1; $i <= count($title); $i++) { 
            $item = new Menu;

            //Title
            if($title[$i] == ''){
                $title[$i] = '(empty)';
            }
            $item->title = $title[$i];

            //link
            $item->link = $link[$i];
            
            //parent
            if($parent[$i] != 'null'){
                $item->parent = $parent[$i];
            }

            //depth
            $item->depth = $depth[$i];

            $item->save();
        }
        return true;
    }

}
