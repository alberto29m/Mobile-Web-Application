document.getElementById("login").addEventListener("click", loginOrLogout);
document.getElementById("create-post").addEventListener("click", writeNewPost);




function loginOrLogout() {

    // https://firebase.google.com/docs/auth/web/google-signin
    var button= document.getElementById("login");
    // Provider
    if (firebase.auth().currentUser == null) {
        var provider = new firebase.auth.GoogleAuthProvider();

        // How to Log In


        firebase.auth().signInWithPopup(provider)
            .then(function () {
                console.log(firebase.auth());
                button.innerHTML = "Logout";
            }).then(function () {
                getPosts();
            })
            .catch(function () {
                alert("Wrong email");
            });
    } else if(firebase.auth().currentUser != null){
        firebase.auth().signOut();
        button.innerHTML = "Login";
    }
}

//function conditions() {
//    if (firebase.auth().currentUser == null) {
//        alert("You must be logged")
//    } else {
//        document.getElementById("login").innerHTML = "Logout";
//        //        firebase.auth().signOut();
//    }
//}
//conditions();

function writeNewPost() {
    // https://firebase.google.com/docs/database/web/read-and-write

    // Values
    var text = document.getElementById("newMessage").value;
    var userName = firebase.auth().currentUser.displayName;
    var photoProfile = firebase.auth().currentUser.photoURL;

    // A post entry

    var post = {
        name: userName,
        photo: photoProfile,
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
            var text = document.createElement("div");
            var element = messages[key];

            text.append(element.body);
            posts.append(text);
        }

    })

}
//getPosts();
