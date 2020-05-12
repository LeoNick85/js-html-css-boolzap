//Modifico il pulsante da microfono a Invia se la casella di testa viene attivata
$("#write-text-box").focus(function(){
    $(".text-box .fa-microphone").hide();
    $(".text-box .fa-paper-plane").show();
});

//Aggiungo un messaggio alla chat quando viene premuto Enter
$("#write-text-box").keydown(function(event){
    if (event.which == 13) {
        addTextInChat();
    }
});

//Aggiungo un messaggio alla chat quando viene premuto il bottone invio
$(".text-box .fa-paper-plane").click(addTextInChat);

//Creo una variabile con le possibili risposte dell'interlocutore in un array
var chat_answers = ["Ok","Non saprei","Sono d'accordo","Non penso proprio"];

//FUNZIONI
//Funzione per inserire testo nella chat
function addTextInChat() {
    var elementToAdd = $(".template .chat-right").clone();
    var messageToAdd = $("#write-text-box").val();

    //Preparo il messaggio con HTML e lo aggiungo alla chat
    var finalMessage = elementToAdd.text(messageToAdd);
    finalMessage.appendTo("#container-chat-box");

    //Prendo un messaggio casuale dall'array delle risposte e lo aggiungo come risposta dell'altro utente, con un ritardo di 1 minuto
    var random_answer = chat_answers[getRandom(0, (chat_answers.length - 1))];
    var answerToAdd =  $(".template .chat-left").clone();
    var finalAnswer = answerToAdd.text(random_answer);
    setTimeout (function(){
        finalAnswer.appendTo("#container-chat-box");
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
