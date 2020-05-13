//SCRIPT PER RICERCA CONTATTI
//Aggiorno la ricerca dei contatti ogni volta che viene aggiunto un carattere all'input
$("#contacts-search").keyup(function(){
    //Calcolo il numero totale dei contatti presenti e registro l'input attuale
    var tot_contact_number = $("#chat-item-container").children().length;
    var current_input = $("#contacts-search").val().toLowerCase();

    //Con each verifico nome per nome se rientra nella ricerca
    $("#chat-item-container .chat-item").each(function() {
        var contact_element = $(this);
        var contact_element_name = contact_element.find(".preview-name p").text().toLowerCase();

        if (current_input == "") {
            $(this).show();
        } else if (contact_element_name.includes(current_input)){
            $(this).show();
        } else {
            $(this).hide();
        }
    })
})


//DATABASE CONVERSAZIONI
//Creo un array che tiene in memoria le conversazioni
var conversation_log = [
//Prima Chat(Cloud Strife)
[
    ["Hai ricevuto i dettagli della missione da Barret?","05:21",".chat-right"],
    ["Sì, mi sono arrivati ieri","06:32",".chat-left"],
    ["Hai preparato tutto? Ci vediamo all'ora prevista al Reattore?","06:52",".chat-right"],
    ["Sì, tutto pronto","07:31",".chat-left"],
    ["Ok, ci vediamo al Reattore","07:32",".chat-left"]
],
//Seconda Chat(Lara Croft)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Hai aperto al maggiordomo Smith?","07:32",".chat-left"]
],
//Terza Chat(Minsc)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Hai visto Boo?","07:32",".chat-left"]
],
//Quarta Chat(Solid Snake)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Kept you waiting?","07:32",".chat-left"]
],
//Quinta Chat(Kazuma Kiryu)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Ti aspetto a Kamurocho","07:32",".chat-left"]
],
//Sesta Chat(Yennifer di Vengerberg)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Aspetto il profumo di uva spina","07:32",".chat-left"]
],
//Settima Chat(Mordin Solus)
[
    ["Hai trovato il sito archeologico","05:21",".chat-right"],
    ["Sì, ci troviamo lì","06:32",".chat-left"],
    ["Va bene, allora parto da casa adesso","06:52",".chat-right"],
    ["OK","07:31",".chat-left"],
    ["Ho finito la ricerca","07:32",".chat-left"]
]
];

//Ad avvio pagina carico il contenuto della prima chat
for (var i = 0; i < conversation_log[0].length; i++) {
    //verifico se il messaggio è ricevuto o mandato e lo inserisco
    if (conversation_log[0][i][2] == ".chat-right") {
        var elementToAdd = $(".template .chat-utente").clone();
        var messageToAdd = conversation_log[0][i][0];
        var timeMessageToAdd = conversation_log[0][i][1];

        //Preparo il messaggio con HTML e lo aggiungo alla chat
        elementToAdd.find("p:first-child").text(messageToAdd);
        elementToAdd.find("p:last-child").text(timeMessageToAdd);
        elementToAdd.addClass("chat-right");
        elementToAdd.appendTo("#container-chat-box");
    } else {
        var elementToAdd = $(".template .chat-utente").clone();
        var messageToAdd = conversation_log[0][i][0];
        var timeMessageToAdd = conversation_log[0][i][1];

        //Preparo il messaggio con HTML e lo aggiungo alla chat
        elementToAdd.find("p:first-child").text(messageToAdd);
        elementToAdd.find("p:last-child").text(timeMessageToAdd);
        elementToAdd.addClass("chat-left");
        elementToAdd.appendTo("#container-chat-box");
    }
}

var nth_current_chat = 0;

//SCRIPT PER CAMBIO CHAT TRA ACCOUNT
//Riscrivo gli elementi della chat corrente(barra titolo + messaggi chat), appena clicco una chat differente
$(".chat-item").click(function(){
    //Verifico che l'elemento cliccato non sia già la classe corrente, e se non lo è procedo con il cambio di chat_answers
    if (!$(this).hasClass("current")) {
        //Sposto la classe corrente alla nuova chat attivata
        $(".chat-item.current").removeClass("current");
        $(this).addClass("current");

        //Aggiorno gli elementi in testa alla pagina della chat (immagine+nome utente)
        var nome_nuovo_utente = $(this).find(".preview-name p").text();
        var immagine_nuovo_utente = $(this).find(".portrait").html();

        $(".chat-title-text p:first-child").text(nome_nuovo_utente);
        $(".chat-title-left .portrait").html(immagine_nuovo_utente);

        //Svuoto il contenuto della chat
        $("#container-chat-box").html("");

        //Creo un ciclo for per ripubblicare in sequenza tutti gli elementi nella conversazione
        nth_current_chat = $(this).index();

        for (var i = 0; i < conversation_log[nth_current_chat].length; i++) {
            //verifico se il messaggio è ricevuto o mandato e lo inserisco
            if (conversation_log[nth_current_chat][i][2] == ".chat-right") {
                var elementToAdd = $(".template .chat-utente").clone();
                var messageToAdd = conversation_log[nth_current_chat][i][0];
                var timeMessageToAdd = conversation_log[nth_current_chat][i][1];

                //Preparo il messaggio con HTML e lo aggiungo alla chat
                elementToAdd.find("p:first-child").text(messageToAdd);
                elementToAdd.find("p:last-child").text(timeMessageToAdd);
                elementToAdd.addClass("chat-right");
                elementToAdd.appendTo("#container-chat-box");
            } else {
                var elementToAdd = $(".template .chat-utente").clone();
                var messageToAdd = conversation_log[nth_current_chat][i][0];
                var timeMessageToAdd = conversation_log[nth_current_chat][i][1];

                //Preparo il messaggio con HTML e lo aggiungo alla chat
                elementToAdd.find("p:first-child").text(messageToAdd);
                elementToAdd.find("p:last-child").text(timeMessageToAdd);
                elementToAdd.addClass("chat-left");
                elementToAdd.appendTo("#container-chat-box");
            }
        }

    }
})





//SCRIPT PER MESSAGGI
//Creo una variabile con le possibili risposte dell'interlocutore in un array
var chat_answers = ["Ok","Non saprei","Sono d'accordo","Non penso proprio","Credo che la risposta sia 42","Ci hai pensato bene?","Ci devo pensare su"];

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



//SCRIPT PER SOTTOMENU MESSAGGI

//FUNZIONI
//Funzione per inserire testo nella chat
function addTextInChat() {
    var elementToAdd = $(".template .chat-utente").clone();
    var messageToAdd = $("#write-text-box").val();

    //Registro l'ora corrente
    var d = new Date();
    var currentHour = d.getHours();
    var currentMinute = d.getMinutes();
    if (currentMinute < 10) {
        currentMinute = "0" + currentMinute;
    }
    var currentTime = currentHour + ":" + currentMinute;

    //Preparo il messaggio con HTML e lo aggiungo alla chat
    elementToAdd.find("p:first-child").text(messageToAdd);
    elementToAdd.find("p:last-child").text(currentTime);
    elementToAdd.addClass("chat-right");
    elementToAdd.appendTo("#container-chat-box");


    //Aggiorno il conversation_log col messaggio inviato
    var arrayToAdd = [messageToAdd, currentTime, ".chat-right"];
    conversation_log[nth_current_chat].push(arrayToAdd);

    //Prendo un messaggio casuale dall'array delle risposte e lo aggiungo come risposta dell'altro utente, con un ritardo di 1 minuto
    var random_answer = chat_answers[getRandom(0, (chat_answers.length - 1))];
    var answerToAdd =  $(".template .chat-utente").clone();
    answerToAdd.find("p:first-child").text(random_answer);
    answerToAdd.find("p:last-child").text(currentTime);
    answerToAdd.addClass("chat-left");
    setTimeout (function(){
        answerToAdd.appendTo("#container-chat-box");
        //Aggiorno il conversation_log con la risposta
        var arrayAnswerToAdd = [random_answer, currentTime, ".chat-left"];
        conversation_log[nth_current_chat].push(arrayAnswerToAdd);
    }, 1000);


    console.log(conversation_log);

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
