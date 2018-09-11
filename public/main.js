var app = new Vue({
    el: "#app",
    data: {
        data1: [],
        data2: []

    },
    created: function () {
        this.getData();
    },
    methods: {
        getData: function () {
            fetch("https://api.jsonbin.io/b/5b97701ddb948c68635f4402", {

                method: "GET",

            }).then(function (response) {

                if (response.ok) {
                    // add a new promise to the chain
                    return response.json();
                }
                // signal a server error to the chain
                throw new Error(response.statusText);
            }).then(function (json) {
                app.loader();
                app.data1 = json.gamesData;
                console.log(app.data1);
                app.data2 = json.allLocations;
                console.log(app.data2);




            }).catch(function (error) {
                // called when an error occurs anywhere in the chain
                console.log("Request failed: " + error.message);
            });
        },
        filterFunction: function () {
            var input, filter, ul, li, button, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                button = li[i].getElementsByTagName("button")[0];
                if (button.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        },
        loader: function(){
        var containerLoader = document.getElementById("containerLoader");
//        setTimeout(function(){
            containerLoader.classList.add("cerrar");
//        },);    
    }
    }
})
