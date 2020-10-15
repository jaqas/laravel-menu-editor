<?php 

namespace Jaqas\Menu;

use Jaqas\Menu\Models\Menu;

class MenuFacade {

    /** 
     * Menu Editor
     * Blade
    */
    public static function editor() {
        return view('menu::editor');
    }

    /**
     * Menu Items 
     * @return array
    */ 
    public static function editor_items(){ 
        $items = Menu::all();
        foreach($items as $item){
            echo '<li id="jaqas_menu_item_id-'.$item->id.'"  class="jaqas_menu_item_depth-'.$item->depth.'">';
            echo    '<div class="jaqas_menu_item_bar">';
            echo        '<span class="jaqas_item_title">'.$item->title.'</span>';
            echo        '<span class="jaqas_item_edit_button"></span>';
            echo     '</div>';
            echo     '<div class="jaqas_menu_item_settings">';
            echo        '<input type="text" name="title" value="'.$item->title.'" placeholder="Title" autocomplete="off" class="jaqas_menu_editor_input">';
            echo        '<input type="text" name="url" placeholder="Url" value="'.$item->link.'" autocomplete="off" class="jaqas_menu_editor_input">';
            echo        '<span class="jaqas_menu_editor_remove">Remove</span>';
            echo     '</div>';
            echo  '</li>';
        }
    }

    /** 
     * Menu Array
     * @return array
    */
    public static function menu_array(){
        return Menu::all();
    }

    
}