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
    // Demo on using computed properties
    this.app10;
    // Demo in using computed properties with setters and getters
    this.app11;
    // Demo in using watchers
    this.app12;
    // Demo on binding HTML Classes
    this.app13;
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

    this.app10 = new Vue({
        el: '#app-10',
        data: {
            message: 'Hello'
        },
        computed: {
            modifiedMessage: function(){
                return this.message + '!'
            }
        }
    });

    this.app11 = new Vue({
        el: '#app-11',
        data: {
            cname: 'default',
            cclass: 'knight',
            clevel: '1',
            cserver: 'bahr',
            header: this.cname + ' - ' + this.cclass + ' - ' + this.cserver 
        },
        computed: {
            // This method is called everytime the "cname", "cclass" or "cserver" part of data changes
            /*
            setHeader: function(){
                return this.cname + ' - ' + this.cclass + ' - ' + this.cserver;
            }, 
            */

           // Returns the current value of "cname", "cclass" and "cserver"
           // Modifies the value of header by providing all values 
           // Usage: Main.app11.setHeader = 'tarrent,wizard,bahr';
           setHeader: {
               // geter
               get: function(){
                    return this.cname + ' - ' + this.cclass + ' - ' + this.cserver;
               },
               // setter
               set: function(newValue){
                    var stats = newValue.split(',');
                    this.cname = stats[0];
                    this.cclass = stats[1];
                    this.cserver = stats[2];
               }
           }
        }
    });

    this.app12 = new Vue({
        el: '#app-12',
        data: {
            question: '',
            answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
            // Whenever "question" changes, this method will run
            question: function(newQuestion, oldQuestion){
                this.answer = 'Waiting for you to stop typing...';
                this.debouncedGetAnswer();
            }
        },
        created: function(){
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
        },
        methods: {
            getAnswer: function(){
                if(this.question.indexOf('?') === -1){
                    this.answer = 'Questions usually contain a question mark :-)';
                    return;
                }
                this.answer = 'Thinking...';
                var vm = this;
                axios.get('https://yesno.wtf/api')
                    .then(function(response){
                        vm.answer = _.capitalize(response.data.answer);
                    })
                    .catch(function(error){
                        vm.answer = 'Error! Could not reach the API. ' + error;
                    });
            }
        }
    });

    // Removes/restores the "active" class by reading "isActive"
    this.app13 = new Vue({
        el: '#app-13',
        data: {
            message: 'Data Test',
            header: 'Class Bind Test',
            isActive: true
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

    axios.get('https://us-central1-appdatacollect-3b7d7.cloudfunctions.net/getdata?node=farmland_setup&fields=_06loc,_07pdate,_08hvdate,_09soil,_10eco&year=2014')
        .then(function(response){
            console.log('loaded data!');
            var display = [];
            var max = 10;

            // Parse data, get gps location
            for(var user in response["data"]["data"]){
                for(var farmer in response["data"]["data"][user]){
                    for(var plot in response["data"]["data"][user][farmer]){
                        var loc = response["data"]["data"][user][farmer][plot]['_06loc'];
                        if(loc !== '' && display.length < max)
                            display.push({id:display.length, text:response["data"]["data"][user][farmer][plot]['_06loc']});
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
        })
        .catch(function(error){
            console.log('An error has occured while fetching data ' + error);
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