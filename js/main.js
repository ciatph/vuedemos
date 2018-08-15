var d;

var Main = function(){
    // Simple message binding
    this.app;
    // Directives: title on hover
    this.app2;
    // Directives: Conditionals-if
    this.app3;
    // Directives: for-loop
    this.app4;
    // Directives: click-event handling
    this.app5;
    // Two-way binding demo
    this.app6;
    // Usage of custom components
    this.app7;
    // Demo on components using dynamic-loaded items for data
    this.app8;
    // Demo on binding for urls
    this.app9;
};


/**
 * Initialize the vue demo apps
 */
Main.prototype.initialize = function(){
    this.app = new Vue({
        el: '#app',
        data: {
            message: 'It works!'
        },
        created: function(){
            console.log('#app created');
        }
    });

    this.app2 = new Vue({
        el: '#app-2',
        data: {
            message: 'I was here'
        }
    });

    this.app3 = new Vue({
        el: '#app-3',
        data: {
            seen: true
        }
    });

    this.app4 = new Vue({
        el: '#app-4',
        data: {
            todolist: [
                { text: 'Wizard' },
                { text: 'Knight' },
                { text: 'Elf' }
            ]
        }
    });

    this.app5 = new Vue({
        el: '#app-5',
        data: {
            message: 'Hello, VueJS!'
        },
        methods: {
            reverseMessage: function(){
                this.message = this.message.split('').reverse().join('');
            }
        }
    });

    this.app6 = new Vue({
        el: '#app-6',
        data: {
            message: 'Hello there'
        }
    });

    this.app9 = new Vue({
        el: '#app-9',
        data: {
            url: 'http://localhost'
        }
    });
};


/**
 * Demo on using custom Vue components
 */
Main.prototype.createComponents = function(){
    // Create and use the 'todo-item' component
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>',
    });

    this.app7 = new Vue({
        el: '#app-7',
        data: {
            armorlist: [
                { id:0, text:'helm' },
                { id:1, text:'armor' },
                { id:2, text:'gloves' },
                { id:3, text:'pants' },
                { id:4, text:'boots' }
            ]
        },
    });
};


Main.prototype.getdata = function(){
    // Create the item template
    Vue.component('farmland-item', {
        props: ['farmland'],
        //template: '<li>{{ farmland.text }}</li>'
        template: '<li><input type="checkbox">{{ farmland.text }}</li>'
    });    

    $.ajax({
        url: 'https://us-central1-appdatacollect-3b7d7.cloudfunctions.net/getdata?node=farmland_setup&fields=_06loc,_07pdate,_08hvdate,_09soil,_10eco&year=2014',
        dataType: 'json',
        success: function(j){
            console.log('loaded data!');
            var display = [];
            var max = 10;

            // Parse data, get gps location
            for(var user in j["data"]){
                for(var farmer in j["data"][user]){
                    for(var plot in j["data"][user][farmer]){
                        var loc = j["data"][user][farmer][plot]['_06loc'];
                        if(loc !== '' && display.length < max)
                            display.push({id:display.length, text:j["data"][user][farmer][plot]['_06loc']});
                    }
                }
            }

            // Render the list to view
            new Vue({
                el: '#app-8',
                data: {
                    datalist: display
                },
                methods: {
                    alertMe: function(){
                        console.log('i was clicked ')
                    }
                }
            });            
        }     
    });
};


window.onload = function(){
    window.Main = new Main();
    Main.initialize();

    // Components demo
    Main.createComponents();

    // Components demo with ajax
    Main.getdata();
};