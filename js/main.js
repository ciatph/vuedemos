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
    this.app7;
};


/**
 * Initialize the vue demo apps
 */
Main.prototype.initialize = function(){
    this.app = new Vue({
        el: '#app',
        data: {
            message: 'It works!'
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
};


Main.prototype.createComponents = function(){
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{ todo.text }}</li>'
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
        }
    });
};


window.onload = function(){
    console.log('loaded!');
    window.Main = new Main();
    Main.initialize();

    // Components demo
    Main.createComponents();
};