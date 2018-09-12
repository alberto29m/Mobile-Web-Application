var app = new Vue({
    el: "#app",
    data: {
        data1: [],
        data2: [],
        sourceUrl: ""

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
                app.changeAllPagesToMenu();
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
        loader: function () {
            var containerLoader = document.getElementById("containerLoader");
            containerLoader.classList.add("cerrar");
            setTimeout(function () {
                containerLoader.style.display = "none";
                document.getElementById("preloader").style.display = "none";
            }, 2000);
        },
        changeMenuToGames: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="none";
            gameDetailsPage.style.display="none";
            locationsPage.style.display="none";
            mapPage.style.display="none";
            contactPage.style.display="none";
            gamePage.style.display="block";
        },
        changeMenuToLocations: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="none";
            gameDetailsPage.style.display="none";
            locationsPage.style.display="block";
            mapPage.style.display="none";
            contactPage.style.display="none";
            gamePage.style.display="none";
            
        },
        changeMenuToContact: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="none";
            gameDetailsPage.style.display="none";
            locationsPage.style.display="none";
            mapPage.style.display="none";
            contactPage.style.display="block";
            gamePage.style.display="none";
            
        },
        changeAllPagesToMenu: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="block";
            gameDetailsPage.style.display="none";
            locationsPage.style.display="none";
            mapPage.style.display="none";
            contactPage.style.display="none";
            gamePage.style.display="none";
        },
        changeGameToGameDetails: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="none";
            gamePage.style.display="none";
            gameDetailsPage.style.display="block";
            locationsPage.style.display="none";
            mapPage.style.display="none";
            contactPage.style.display="none";        
        },
        changeLocationsToLocationMap: function(){
            var menu = document.getElementById("firstPage");
            var gamePage=document.getElementById("gamesPage");
            var gameDetailsPage = document.getElementById("gameDetailsPage");
            var locationsPage = document.getElementById("locationsPage");
            var mapPage = document.getElementById("locationMapPage");
            var contactPage = document.getElementById("contactPage");
            menu.style.display="none";
            gamePage.style.display="none";
            gameDetailsPage.style.display="none";
            locationsPage.style.display="none";
            mapPage.style.display="block";
            contactPage.style.display="none";
            app.changeID();
            
        },
        changeID: function(){
        var locationID = document.getElementById("location.name");
        if(locationID == "AJ Katzenmaier"){
            this.sourceUrl == this.data2[0].url;
        }else if(locationID == "Greenbay"){
            this.sourceUrl == this.data2[1].url;
        }else if(locationID == "Howard A Yeager"){
            this.sourceUrl == this.data2[2].url;
        }else if(locationID == "Marjorie P Hart"){
            this.sourceUrl == this.data2[3].url;
        }else if(locationID == "North"){
            this.sourceUrl == this.data2[4].url;
        }else if(locationID == "South"){
            this.sourceUrl == this.data2[5].url;
        }
        
    }
    }
})
