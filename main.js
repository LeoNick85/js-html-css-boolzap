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



//FUNZIONI

//Funzione per inserire testo nella chat
function addTextInChat() {
    var elementToAdd = $(".template .chat-utente-1").clone();
    console.log(elementToAdd);
    var messageToAdd = $("#write-text-box").val();
    console.log(messageToAdd);

    //Preparo il messaggio con HTML e lo aggiungo alla chat
    var finalMessage = elementToAdd.text(messageToAdd);
    finalMessage.appendTo("#container-chat-box");

    //Ripristino il pulsante microfono fino a prossimo focus su box
    $(".text-box .fa-microphone").show();
    $(".text-box .fa-paper-plane").hide();

    //Svuoto il contenuto dell'input
    $("#write-text-box").val("");
}
