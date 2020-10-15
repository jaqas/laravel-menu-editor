function jaqas_menu(){

    //var items = document.getElementById('jaqas_menu_editable').getElementsByTagName('li');
    var items = document.getElementsByClassName('jaqas_menu_item_bar')

    var parentContainer = document.getElementById('jaqas_menu_editable');
    var activeItem; //mouseover item

    /**
     * Menu structure
     * Drag Drop Items
     * Settings
     */
    function menu(item) {

        //Events
        item.addEventListener('mousedown', MouseDownOnItem);
        item.addEventListener('mousemove', MouseOverOnItem);
        item.addEventListener('mouseout', MouseOutFromItem);

        let info_for_transport = {};

        
        function MouseDownOnItem(event) {

            /* ######### Block Event ######### */

            //if click open settings button then return false
            if(event.toElement.className == 'jaqas_item_edit_button'){
                return false;
            }

            /* ################################ */

            // get this item li tag
            let item_parent = item.parentNode;
            
            // prepare to moving: make absolute and on top by z-index...
            function addStyles (){
                item_parent.style.position = 'absolute';
                item_parent.style.zIndex = 1000;
                item_parent.style.width = '450px';
                item_parent.style.pointerEvents = 'none';
            }

            // prepare to return back to containers: remove styles
            function removeStyles (){
                item_parent.style.position = null;
                item_parent.style.zIndex = null;
                item_parent.style.width = null;
                item_parent.style.top = null;
                item_parent.style.left = null;
                item_parent.style.pointerEvents = null;
            }

        
            // move it out of any current parents directly into body
            // to make it positioned relative to the body
            //document.body.append(item_parent);

        
            // centers the item_parent at (pageX, pageY) coordinates
            function moveAt(pageX, pageY) {
                item_parent.style.left = pageX - item_parent.offsetWidth / 10 + 'px';
                item_parent.style.top = pageY - item_parent.offsetHeight / 10 + 'px';
            }

            // transport this item childs with this item
            function tranportChilds() {
                let items = parentContainer.getElementsByTagName('li');
                let info = {};
                let real_i = 0;
                for (let i = 0; i < items.length; i++) {
                    depth_id = parseInt(items[i].className.replace( /\D+/g, ''));

                    if(items[i] == item_parent){
                        info['getChilds'] = true;
                        info['parent_depth'] = depth_id;
                    }else {
                        if(info['getChilds']){
                            if(info['parent_depth'] < depth_id){
                                //create container if not exists
                                if(!info['container']){
                                    let container = document.createElement('ul');
                                    item_parent.appendChild(container)
                                    info['container'] = container;
                                }

                                info['container'].appendChild(items[i]);

                                if(!info_for_transport['transported']){
                                    info_for_transport[real_i] = depth_id;
                                    real_i++;
                                }
                              

                            }else {
                                info['getChilds'] = false;
                            }
                        }
                    } 
                    
                }
                info_for_transport['transported'] = true;
            }
            
            //put this item childs bottom of this item
            function returnChilds(){
                if(item_parent.getElementsByTagName('ul').length == 0){
                    return false;
                }
                let items = item_parent.getElementsByTagName('ul')[0].children;
                let depth_id = parseInt(item_parent.className.replace( /\D+/g, ''));
                let real_i = 0;
                while (items[0]) {
                    let i = 0;
                    if(items.length >= 2){
                        i = items.length - 1;
                    }                    
                    items[i].className = 'jaqas_menu_item_depth-'+parseInt(info_for_transport[real_i] + depth_id);
                    parentContainer.insertBefore(items[i], item_parent.nextSibling);

                    real_i++;
                }
                item_parent.getElementsByTagName('ul')[0].remove();
                
            }
        
            let foronMouseMove = true;
            function onMouseMove(event) {
                if(foronMouseMove){
                    tranportChilds();
                    foronMouseMove = false;
                }
                // add styles
                addStyles();
                
                // move our absolutely positioned item_parent under the pointer
                moveAt(event.pageX, event.pageY);

                // drop the item_parent, remove unneeded handlers
                document.addEventListener('mouseup', mouseUp);
            }
        
            // move the item_parent on mousemove
            document.addEventListener('mousemove', onMouseMove);

            //check if mouse up but dont moved
            document.addEventListener('mouseup', function(){
                // remove mouseover event
                document.removeEventListener('mousemove', onMouseMove);
            });
        
            
            
            update();
            

            function mouseUp() {
                // remove mouseover event
                document.removeEventListener('mousemove', onMouseMove);
                //remove mouseup event 
                document.removeEventListener('mouseup', mouseUp);
                // remove styles
                removeStyles(); 

                let menu_item_depth;

                    //append to bottom at container
                    if(activeItem == null){
                        // append bottom in container
                        item_parent.className = 'jaqas_menu_item_depth-0';
                        parentContainer.appendChild(item_parent);
                        returnChilds();
                        update();
                        return false;
                    }else {
                        //append item_parent
                        menu_item_depth = parseInt(activeItem.item.className.replace( /\D+/g, ''));
                    }

                    //append as parent of active item
                    if(activeItem.append == 'parent'){                        
                        item_parent.className = 'jaqas_menu_item_depth-'+parseInt(menu_item_depth - 1);
                        activeItem.item.parentNode.insertBefore(item_parent, activeItem.item);
                    }

                    //append to top of active item
                    if(activeItem.append == 'top'){                        
                        item_parent.className = 'jaqas_menu_item_depth-'+menu_item_depth;
                        activeItem.item.parentNode.insertBefore(item_parent, activeItem.item);
                    }

                    //append to bottom of active item
                    if(activeItem.append == 'bottom'){                        
                        item_parent.className = 'jaqas_menu_item_depth-'+menu_item_depth;
                        activeItem.item.parentNode.insertBefore(item_parent, activeItem.item.nextSibling);
                    }
                    
                    //append as child of active item
                    if(activeItem.append == 'child'){
                        item_parent.className = 'jaqas_menu_item_depth-'+parseInt(menu_item_depth + 1);
                        activeItem.item.parentNode.insertBefore(item_parent, activeItem.item.nextSibling);
                    }     
                    
                    //return childs
                    returnChilds();

                    update();
            };
        
        };
        /* ################### \ MouseDownOnItem / ##################### */

        /**
         * Mouse Move On Item
         * calculate mouse position for return where to append item
         * @returns activeItem 
        */
        function MouseOverOnItem(e){
            x = e.clientX - this.offsetLeft;
            y = e.clientY - this.offsetTop;
            
            item.style.border = '1px solid #ccc';
            
            let demo_item = document.createElement('li');
                demo_item.style.maxWidth = '500px';
                demo_item.style.height = '60px';
                demo_item.style.border = '1px solid green';

            //as parent
            if(x <= 15){
                item.style.borderLeft = '1px solid green';
                activeItem = {
                    'append':'parent',
                    'item':this.parentNode,
                };
                return false;
            }
        
            //top
            if(y <= 15){
                item.style.borderTop = '1px solid green';
                activeItem = {
                    'append':'top',
                    'item':this.parentNode,
                };
            }

            //center
            if(y >= 15 && y <= 25){
                item.style.border = '1px solid green';
                activeItem = {
                    'append':'child',
                    'item':this.parentNode,
                };
            }

            //bottom
            if(y >= 25){
                item.style.borderBottom = '1px solid green';
                activeItem = {
                    'append':'bottom',
                    'item':this.parentNode,
                };
            }
            
    
        };//mouseoveritem

        /**
         * Mouse Out From Item
         * @returns activeItem = null 
        */
        function MouseOutFromItem(){
            item.style.border = null;
            activeItem = null;
        }
        
        //settings container
        let settings_container = item.parentNode.getElementsByClassName('jaqas_menu_item_settings')[0];
        
        //settings button
        let settings_button = item.getElementsByClassName('jaqas_item_edit_button')[0];

        //show hide menu settings
        settings_button.addEventListener('click', show_hide_settings);

        function show_hide_settings(){
            if(getComputedStyle(settings_container).display == 'none'){
                settings_container.style.display = 'block';
                setTimeout(function(){
                    settings_container.style.height = 'auto';
                }, 1);

            }else {
                settings_container.style.height = '0px';
                settings_container.style.display = 'none';
            }
        }

        //edit title 
        let title = item.getElementsByClassName('jaqas_item_title')[0];
        let title_input = settings_container.getElementsByClassName('jaqas_menu_editor_input')[0];
        
        title_input.addEventListener('input', function(){
            if(this.value == ''){
                title.innerHTML = '(empty)';
                return false;
            }
            title.innerHTML = this.value;
        });

        //remove item
        let remove = settings_container.getElementsByClassName('jaqas_menu_editor_remove')[0];
        
        remove.addEventListener('click', function(){
            item.parentNode.remove();
            update();
        });



    }//menu
    //call menu function 
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        menu(item);
    }// for loop

    //update
    function update(){
        let items = parentContainer.getElementsByTagName('li');
        
        let info = {};
        for (let i = 0; i < items.length; i++) {
            //update ids
            let new_id = i + 1;
            items[i].id = 'jaqas_menu_item_id-'+new_id;

            //update parents | depth
            let depth_id = parseInt(items[i].className.replace(/\D+/g, ''));

            //if its first row
            if(i == 0){
                if(depth_id != 0){
                    items[i].className = 'jaqas_menu_item_depth-0';
                    depth_id = 0;
                }
                info['last_depth_id'] = depth_id;
            }
            
            if(info['last_depth_id'] < depth_id && depth_id - info['last_depth_id'] != 1){
                    let new_depth_id = info['last_depth_id'] + 1;
                    items[i].className = 'jaqas_menu_item_depth-'+new_depth_id;
                    depth_id = new_depth_id;
            }                    
            info['last_depth_id'] = depth_id;

        }//for loop                     

    };


    //save menu
    let menu_submit_button = document.getElementById('jaqas_menu_editor_save_menu_button');
    
    menu_submit_button.addEventListener('click', save_menu);

    function save_menu(){
        let li = parentContainer.querySelectorAll('li');

            let info = {};
            let form = new FormData();
                form.append('_token', parentContainer.className);

            //make items tree | formdata
            for (let i = 0; i < li.length; i++) {
                let id = li[i].id.replace(/\D+/g, '');
                let depth = li[i].className.replace(/\D+/g, '');

                //info
                let title = li[i].getElementsByClassName('jaqas_menu_editor_input')[0].value;
                let url = li[i].getElementsByClassName('jaqas_menu_editor_input')[1].value;

                //original | has not parent
                if(depth == 0){
                    info['original_id'] = id;
                    info['original_depth'] = depth;


                    form.append('menu_item_title['+id+']', title);
                    form.append('menu_item_url['+id+']', url);
                    form.append('menu_item_parent['+id+']', null);
                }
                form.append('menu_item_depth['+id+']', depth);


                //if item has parent
                if(depth > info['original_depth']){
                    //child has child
                    if(depth > info['child_parent_depth']){
                        if(depth > info['child_child_parent_depth'] && info['child_child_parent_depth'] > info['child_parent_depth']){
                            form.append('menu_item_title['+id+']', title);
                            form.append('menu_item_url['+id+']', url);
                            form.append('menu_item_parent['+id+']', info['child_child_parent_id']);
                        }else {
                            form.append('menu_item_title['+id+']', title);
                            form.append('menu_item_url['+id+']', url);
                            form.append('menu_item_parent['+id+']', info['child_parent_id']);
                        }      
                    }else{
                    //child child
                        info['child_parent_id'] = id;
                        info['child_parent_depth'] = depth;
                        
                        form.append('menu_item_title['+id+']', title);
                        form.append('menu_item_url['+id+']', url);
                        form.append('menu_item_parent['+id+']', info['original_id']);
                    }
                    info['child_child_parent_id'] = id;
                    info['child_child_parent_depth'] = depth;
                }   
            }//for loop

        //send data to a server
        let url = parentContainer.getAttribute('url');
        let request = new XMLHttpRequest();
            
        request.open("POST", url);
        request.send(form);
        location.reload();
    }// save menu | function

    //custom link
    let jaqas_menu_editor_custom_link = document.getElementsByClassName('jaqas_menu_editor_custom_link')[0];
    let jaqas_menu_editor_custom_link_title = document.getElementById('jaqas_menu_editor_custom_link_title');
    let jaqas_menu_editor_custom_link_url = document.getElementById('jaqas_menu_editor_custom_link_url');
    let jaqas_menu_editor_add_to_menu_button = document.getElementById('jaqas_menu_editor_add_to_menu_button');
    let jaqas_menu_editor_custom_link_show_button = document.getElementsByClassName('jaqas_menu_editor_custom_link_show_button')[0];

    //show hide
    jaqas_menu_editor_custom_link_show_button.addEventListener('click', function(){
        if(jaqas_menu_editor_custom_link.style.marginLeft == '-310px'){
            jaqas_menu_editor_custom_link.style.marginLeft = '0px';
            jaqas_menu_editor_custom_link_show_button.style.left = '0px';
            jaqas_menu_editor_custom_link_show_button.style.border = '0';
            jaqas_menu_editor_custom_link_show_button.style.borderTop = '10px solid transparent';
            jaqas_menu_editor_custom_link_show_button.style.borderRight = '20px solid #555';
            jaqas_menu_editor_custom_link_show_button.style.borderBottom = '10px solid transparent';
        }else {
            jaqas_menu_editor_custom_link.style.marginLeft = '-310px'
            jaqas_menu_editor_custom_link_show_button.style.left = '30px';
            jaqas_menu_editor_custom_link_show_button.style.border = '0';
            jaqas_menu_editor_custom_link_show_button.style.borderTop = '10px solid transparent';
            jaqas_menu_editor_custom_link_show_button.style.borderLeft = '20px solid #555';
            jaqas_menu_editor_custom_link_show_button.style.borderBottom = '10px solid transparent';
        }
    });

    jaqas_menu_editor_add_to_menu_button.addEventListener('click', function(){
        if(jaqas_menu_editor_custom_link_title.value == ''){
            jaqas_menu_editor_custom_link_title.value = '(empty)';
        }

        //create new menu item
        let li = document.createElement('li');
            li.className = 'jaqas_menu_item_depth-0';
        parentContainer.appendChild(li);

        let item_bar = document.createElement('div');
            item_bar.className = 'jaqas_menu_item_bar';
        li.appendChild(item_bar);
        
        let item_bar_title = document.createElement('span');
            item_bar_title.className = 'jaqas_item_title';
            item_bar_title.innerHTML = jaqas_menu_editor_custom_link_title.value;
        item_bar.appendChild(item_bar_title);

        let item_bar_edit_button = document.createElement('span');
            item_bar_edit_button.className = 'jaqas_item_edit_button';
        item_bar.appendChild(item_bar_edit_button);
        
        let menu_item_settings = document.createElement('div');
            menu_item_settings.className = 'jaqas_menu_item_settings';
        li.appendChild(menu_item_settings);

        let menu_item_settings_input_title = document.createElement('input');
            menu_item_settings_input_title.type = 'text';
            menu_item_settings_input_title.name = 'title';
            menu_item_settings_input_title.value = jaqas_menu_editor_custom_link_title.value;
            menu_item_settings_input_title.autocomplete = false;
            menu_item_settings_input_title.className = 'jaqas_menu_editor_input';
        menu_item_settings.appendChild(menu_item_settings_input_title);

        
        let menu_item_settings_input_url = document.createElement('input');
            menu_item_settings_input_url.type = 'text';
            menu_item_settings_input_url.name = 'title';
            menu_item_settings_input_url.value = jaqas_menu_editor_custom_link_url.value;
            menu_item_settings_input_url.autocomplete = false;
            menu_item_settings_input_url.className = 'jaqas_menu_editor_input';
        menu_item_settings.appendChild(menu_item_settings_input_url);

        let menu_item_settings_remove = document.createElement('span');
            menu_item_settings_remove.className = 'jaqas_menu_editor_remove';
            menu_item_settings_remove.innerHTML = 'Remove';
        menu_item_settings.appendChild(menu_item_settings_remove);
                    
        //clean input
        jaqas_menu_editor_custom_link_title.value = '';
        jaqas_menu_editor_custom_link_url.value = '';

        //settings
        menu(item_bar);
        update();
    });

}; jaqas_menu(); //self function 


    
