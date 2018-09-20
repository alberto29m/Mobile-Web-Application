document.getElementById("login").addEventListener("click", loginOrLogout);
document.getElementById("create-post").addEventListener("click", writeNewPostAndScroll);
var button = document.getElementById("login");

//function changeTheMessageLog() {
//
//    if (firebase.auth().currentUser == null) {
//        button.innerHTML = "Login";
//    } else if (firebase.auth().currentUser != null) {
//        button.innerHTML = "Logout";
//    }
//
//}
//
//changeTheMessageLog();

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
     button.innerHTML = "Logout";
       getPosts();
  } else {
    button.innerHTML = "Login";
    var posts = document.getElementById("posts");
    posts.innerHTML="YOU MUST BE LOGGED";
  }
});

function writeNewPostAndScroll(){
    writeNewPost();
    scrollDown();
}

function loginOrLogout() {

    // https://firebase.google.com/docs/auth/web/google-signin
    // Provider
    if (firebase.auth().currentUser == null) {
        var provider = new firebase.auth.GoogleAuthProvider();
        // How to Log In
        firebase.auth().signInWithPopup(provider)
            .then(function () {
                console.log(firebase.auth());
            })
//            .then(function () {
////                getPosts();
//            })
            .catch(function () {
                alert("Wrong email");
            });
    } else if (firebase.auth().currentUser != null) {
        firebase.auth().signOut();
    }
}

function scrollDown(){
var chat = document.getElementsByClassName("chata");
var chatHeight = chat[0].scrollHeight;
chat[0].scrollTop = chatHeight;
}


function writeNewPost() {
       
    var text = document.getElementById("newMessage").value;
    var userName = firebase.auth().currentUser.displayName;
    var photoProfile = firebase.auth().currentUser.photoURL;
    
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if(m < 10){
        m = "0" + m;
    }
    if(s<10){
        s = "0" + s;
    }
    
    var dateTime = h + ":" + m + ":" + s;

    var post = {
        name: userName,
        photo: photoProfile,
        date: dateTime,
        body: text
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('General').push().key;

    //Write data
    var updates = {};
    updates[newPostKey] = post;
    document.getElementById('newMessage').value = '';
    return firebase.database().ref('General').update(updates);

}



function getPosts() {
        
    firebase.database().ref('General').on('value', function (data) {
        
        
        var posts = document.getElementById("posts");

        posts.innerHTML = "";

        var messages = data.val();

        for (var key in messages) {
            var divText = document.createElement("div");
            var nameTitle = document.createElement("h1");
            var text = document.createElement("p");
            var time = document.createElement("h2");
            var element = messages[key];

            if(firebase.auth().currentUser.displayName == element.name){
                divText.setAttribute("class","hostText");
            }else if(firebase.auth().currentUser.displayName != element.name){
                divText.setAttribute("class","guestText");
            }
            
            time.append(element.date);
            nameTitle.append(element.name);
            text.append(element.body);
            divText.append(nameTitle);
            divText.append(text);
            divText.append(time);
            posts.append(divText);
        }

    })
    scrollDown();

}

