//SCRIPT PER RICERCA CONTATTI
//Aggiorno la ricerca dei contatti ogni volta che viene aggiunto un carattere all'input
$("#contacts-search").keyup(function(){
    //Calcolo il numero totale dei contatti presenti e registro l'input attuale
    var tot_contact_number = $("#chat-item-container").children().length;
    console.log("Numero contatti " + tot_contact_number);
    var current_input = $("#contacts-search").val();
    console.log(current_input);

    //Con each verifico nome per nome se rientra nella ricerca
    $("#chat-item-container .chat-item").each(function() {
        var contact_element = $(this);
        console.log(contact_element);
        var contact_element_name = contact_element.find(".preview-name p").text().toLowerCase();
        console.log(contact_element_name);

        if (current_input == "") {
            $(this).show();
        } else if (contact_element_name.includes(current_input)){
            $(this).show();
        } else {
            $(this).hide();
        }
    })
})

//SCRIPT PER MESSAGGI
//Creo una variabile con le possibili risposte dell'interlocutore in un array
var chat_answers = ["Ok","Non saprei","Sono d'accordo","Non penso proprio","Credo che la risposta sia 42","Ci hai pensato bene?"];

//Modifico il pulsante da microfono a Invia se la casella di testa viene attivata
$("#write-text-box").focus(function(){
    $(".text-box .fa-microphone").hide();
    $(".text-box .fa-paper-plane").show();
});

//Aggiungo un messaggio alla chat quando viene premuto Enter
$("#write-text-box").keypress(function(event){
    if (event.which == 13) {
        addTextInChat();
    }
});

//Aggiungo un messaggio alla chat quando viene premuto il bottone invio
$(".text-box .fa-paper-plane").click(addTextInChat);

//FUNZIONI
//Funzione per inserire testo nella chat
function addTextInChat() {
    var elementToAdd = $(".template .chat-utente").clone();
    var messageToAdd = $("#write-text-box").val();

    //Preparo il messaggio con HTML e lo aggiungo alla chat
    elementToAdd.find("p:first-child").text(messageToAdd);
    elementToAdd.addClass("chat-right");
    elementToAdd.appendTo("#container-chat-box");

    //Prendo un messaggio casuale dall'array delle risposte e lo aggiungo come risposta dell'altro utente, con un ritardo di 1 minuto
    var random_answer = chat_answers[getRandom(0, (chat_answers.length - 1))];
    var answerToAdd =  $(".template .chat-utente").clone();
    answerToAdd.find("p:first-child").text(random_answer);
    answerToAdd.addClass("chat-left");
    setTimeout (function(){
        answerToAdd.appendTo("#container-chat-box");
    }, 1000);

    //Ripristino il pulsante microfono fino a prossimo focus su box
    $(".text-box .fa-microphone").show();
    $(".text-box .fa-paper-plane").hide();

    //Svuoto il contenuto dell'input
    $("#write-text-box").val("");
}

//Funzione per generare un numero casuale
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
