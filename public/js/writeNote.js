let googleUser = null;
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if(user){
            console.log("user logged in", user.displayName)
            console.log(user);
            googleUser = user;
        } else {
            console.log("user not logged in")
        }
    })
    const createNoteButton = document.querySelector("#createNoteButton");
    createNoteButton.addEventListener("click",() => {
        const noteTitle = document.querySelector("#noteTitle");
        const noteText = document.querySelector("#noteText");
        const noteLabels = document.querySelector("#labels");

        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title:noteTitle.value,
            text:noteText.value,
            labels:noteLabels.value.split(" "),
        }).then(()=>{
            noteTitle.value='';
            noteText.value='';
            noteLabels.value='';
        }).catch(error=>console.log(error))
    })
}