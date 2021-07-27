window.onload = event => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.displayName);
            const googleUserID = user.uid;
            getNotes(googleUserID);
        } else {
            window.location = "index.html"
        }
    });

}
const getNotes = (userID) => {
    const notesRef = firebase.database().ref(`/users/${userID}`)
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        renderDataAsHTML(data);
    })
}

const renderDataAsHTML = (data) => {
    let cards = ``;
    for(const noteItem in data){
        const note = data[noteItem];
        cards+=createCard(note);
    }
    document.querySelector("#app").innerHTML = cards;
}
const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">${note.text}</div>
            </div>
        </div>
    `;
}