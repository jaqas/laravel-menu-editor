<link rel="stylesheet" href="{{ asset('jaqas-menu/editor/style.css') }}">

<div class="jaqas_menu_editor_container">

    <div class="jaqas_menu_editor_custom_link">
        <div class="jaqas_menu_editor_title">
            <span>Custom Link</span>
            <div class="jaqas_menu_editor_custom_link_show_button"></div>
        </div>
            <div class="jaqas_menu_editor_body">
                <input type="text" name="title" id="jaqas_menu_editor_custom_link_title" placeholder="Title" autocomplete="off" class="jaqas_menu_editor_input">
                <input type="text" name="url" id="jaqas_menu_editor_custom_link_url" placeholder="Url" autocomplete="off" class="jaqas_menu_editor_input">

                <div class="jaqas_menu_editor_submit_button" id="jaqas_menu_editor_add_to_menu_button">Add</div>
            </div>
    </div>
    
    <div class="jaqas_menu_editor_menu_structure">
        <div class="jaqas_menu_editor_title">Menu Structure</div>
        <div class="jaqas_menu_editor_body">
            <ul id="jaqas_menu_editable" class="{{ csrf_token() }}" url="{{ config('menu.link') }}">
                {{ Menu::editor_items() }}
            </ul>
            <div class="jaqas_menu_editor_submit_button" id="jaqas_menu_editor_save_menu_button">Save</div>
        </div>
    </div>

</div>

<script src="{{ asset('jaqas-menu/editor/main.js') }}"></script>