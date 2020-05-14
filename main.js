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

//DATABASE UTENTI
//Creo un array con la lista degli utenti (nome,indirizzo immagine,ordine)
var account_list = [
    ["Cloud Strife", "https://findicons.com/files/icons/1072/face_avatars/300/l01.png", 0],
    ["Lara Croft", "https://findicons.com/files/icons/1072/face_avatars/300/fh04.png", 1],
    ["Minsc", "https://findicons.com/files/icons/1072/face_avatars/300/e05.png", 2],
    ["Solid Snake", "https://findicons.com/files/icons/1072/face_avatars/300/d04.png", 3],
    ["Kazuma Kiryu", "https://findicons.com/files/icons/1072/face_avatars/300/e04.png", 4],
    ["Yennifer di Vengerberg", "https://findicons.com/files/icons/1072/face_avatars/300/fh03.png", 5],
    ["Mordin Solus", "https://findicons.com/files/icons/1072/face_avatars/300/n05.png", 6]
]

//DATABASE CONVERSAZIONI
//Creo un array che tiene in memoria le conversazioni(messaggio,ora,mandato/ricevuto)
var conversation_log = [
//Prima Chat(Cloud Strife)
[
    ["Hai ricevuto i dettagli della missione da Barret?", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, mi sono arrivati ieri", "July 21, 1983 01:15:00",".chat-left"],
    ["Hai preparato tutto? Ci vediamo all'ora prevista al Reattore?", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, tutto pronto", "July 21, 1983 01:15:00",".chat-left"],
    ["Ok, ci vediamo al Reattore", "July 21, 1983 01:19:00",".chat-left"]
],
//Seconda Chat(Lara Croft)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Hai aperto al maggiordomo Smith?", "July 21, 1983 03:15:00",".chat-left"]
],
//Terza Chat(Minsc)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Hai visto Boo?", "July 21, 1983 22:15:00",".chat-left"]
],
//Quarta Chat(Solid Snake)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Kept you waiting?", "July 21, 1983 01:21:00",".chat-left"]
],
//Quinta Chat(Kazuma Kiryu)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Ti aspetto a Kamurocho", "July 21, 1983 01:55:00",".chat-left"]
],
//Sesta Chat(Yennifer di Vengerberg)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Aspetto il profumo di uva spina", "July 21, 1983 21:15:20",".chat-left"]
],
//Settima Chat(Mordin Solus)
[
    ["Hai trovato il sito archeologico", "July 21, 1983 01:15:00",".chat-right"],
    ["Sì, ci troviamo lì", "July 21, 1983 01:15:00",".chat-left"],
    ["Va bene, allora parto da casa adesso", "July 21, 1983 01:15:00",".chat-right"],
    ["OK", "July 21, 1983 01:15:00",".chat-left"],
    ["Ho finito la ricerca", "July 21, 1983 03:35:33",".chat-left"]
]
];

//Ad avvio pagina genero la lista contatti, carico il contenuto della prima chat e la segno attiva nella lista dei CONTATTI
printAccounts();
$("#chat-item-container .chat-item:first-child").addClass("current");
var nth_current_chat = 0;
printChat(nth_current_chat);

//SCRIPT PER CAMBIO CHAT TRA ACCOUNT
//Riscrivo gli elementi della chat corrente(barra titolo + messaggi chat), appena clicco una chat differente
$(document).on("click", ".chat-item", function(){
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
        nth_current_chat = $(this).attr("data-id");

        printChat(nth_current_chat);
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
//Faccio comparire il sottomenu al click sulla freccia
$(document).on("click", ".chat-utente .fa-angle-down", function(){
    $(this).siblings(".message-hidden-menu").show();
});

//PROVVISORIO: Chiudo sottomenu con message info
$(document).on("click", ".message-hidden-menu p:first-child", function(){
    $(this).parent(".message-hidden-menu").hide();
});

//Cancello il messaggio con remove message
$(document).on("click", ".message-hidden-menu p:nth-child(2)", function(){
    var chat_element_index = $(this).closest(".chat-utente").index();

    //Rimuovo il messaggio dal conversation_log
    conversation_log[nth_current_chat].splice(chat_element_index, 1);

    //Svuoto la chat e ricarico gli elementi della pagina dopo la cancellazione
    $("#container-chat-box").html("");
    printChat(nth_current_chat);
    printAccounts();
    $(".chat-item[data-id=" + nth_current_chat + "]").addClass("current");
});

//FUNZIONI
//Funzione per inserire testo nella chat
function addTextInChat() {
    var elementToAdd = $(".template .chat-utente").clone();
    var messageToAdd = $("#write-text-box").val();

    //Registro l'ora corrente
    var d = new Date();
    var message_time = getHHMM(d);

    //Preparo il messaggio con HTML e lo aggiungo alla chat
    elementToAdd.find(".message-text").text(messageToAdd);
    elementToAdd.find("p.chat-time-message").text(message_time);
    elementToAdd.addClass("chat-right");
    elementToAdd.appendTo("#container-chat-box");


    //Aggiorno il conversation_log col messaggio inviato
    var arrayToAdd = [messageToAdd, d, ".chat-right"];
    conversation_log[nth_current_chat].push(arrayToAdd);

    //Prendo un messaggio casuale dall'array delle risposte e lo aggiungo come risposta dell'altro utente, con un ritardo di 1 minuto
    var random_answer = chat_answers[getRandom(0, (chat_answers.length - 1))];
    var answerToAdd =  $(".template .chat-utente").clone();
    answerToAdd.find(".message-text").text(random_answer);
    answerToAdd.find("p.chat-time-message").text(message_time);
    answerToAdd.addClass("chat-left");
    setTimeout (function(){
        answerToAdd.appendTo("#container-chat-box");
        //Aggiorno il conversation_log con la risposta
        var arrayAnswerToAdd = [random_answer, d, ".chat-left"];
        conversation_log[nth_current_chat].push(arrayAnswerToAdd);
        //Aggiorno la lista contatti per avere la preview dei messaggi corretta
        printAccounts();
        // //Riaggiungo la classe active alla chat corrente
        $(".chat-item[data-id=" + nth_current_chat + "]").addClass("current");
    }, 1000);

    //Ripristino il pulsante microfono fino a prossimo focus su box
    $(".text-box .fa-microphone").show();
    $(".text-box .fa-paper-plane").hide();

    //Svuoto il contenuto dell'input
    $("#write-text-box").val("");

    console.log(conversation_log);
}

//Funzione per generare un numero casuale
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//Funzione per generare l'ora in una stringa con formato HH:MM
function getHHMM(actual_date) {
    var currentHour = actual_date.getHours();
    var currentMinute = actual_date.getMinutes();
    if (currentMinute < 10) {
        currentMinute = "0" + currentMinute;
    }
    var currentTime = currentHour + ":" + currentMinute;
    return currentTime;
}

//Funzione per stampare gli account
function printAccounts() {
    //Svuoto l'elenco dei CONTATTI
    $("#chat-item-container").text("");

    //Stampo il primo elemento della lista
    //Clono l'elemento account dai template e lo aggiorno col nome e l'immagine corretta
    var accountToAdd = $(".template .chat-item").clone();
    accountToAdd.find(".preview-name p").text(account_list[0][0]);
    accountToAdd.find(".portrait img").attr("src", account_list[0][1]);
    accountID = account_list[0][2];
    accountToAdd.attr("data-id",accountID);

    //Aggiungo come preview l'ultimo messaggio pubblicato
    var total_messages = (conversation_log[0].length) - 1;
    accountToAdd.find(".preview-message p").text(conversation_log[accountID][total_messages][0]);
    //Metto l'ora dell'ultimo messaggio pubblicato
    var lastMessageTime = new Date(conversation_log[accountID][total_messages][1]);

    var timeText = getHHMM(lastMessageTime);
    accountToAdd.find(".preview-time p").text(timeText);

    //Aggiungo il contatto nel box degli account
    accountToAdd.appendTo("#chat-item-container");


    //Stampo di nuovo la lista a partire dal secondo elemento ordinando gli elementi in base al tempo dell'ultimo messaggio inserito
    for (var i = 1; i < account_list.length; i++) {
        //Clono l'elemento account dai template e lo aggiorno col nome e l'immagine corretta
        var accountToAdd = $(".template .chat-item").clone();
        accountToAdd.find(".preview-name p").text(account_list[i][0]);
        accountToAdd.find(".portrait img").attr("src", account_list[i][1]);
        accountID = account_list[i][2];
        accountToAdd.attr("data-id",accountID);

        //Aggiungo come preview l'ultimo messaggio pubblicato
        var total_messages = (conversation_log[i].length) - 1;
        accountToAdd.find(".preview-message p").text(conversation_log[accountID][total_messages][0]);
        //Metto l'ora dell'ultimo messaggio pubblicato
        var lastMessageTime = new Date(conversation_log[accountID][total_messages][1]);
        var timeText = getHHMM(lastMessageTime);
        accountToAdd.find(".preview-time p").text(timeText);

        //Aggiungo il contatto nel box degli account nella giusta posizione
        //Calcolo il contatore orario del messaggio corrente
        var current_messageCounter = parseInt(lastMessageTime.getFullYear().toString() + lastMessageTime.getMonth().toString() + lastMessageTime.getDate().toString() + lastMessageTime.getHours().toString() + lastMessageTime.getMinutes().toString()+ lastMessageTime.getSeconds().toString());
        console.log(current_messageCounter);
        accountToAdd.appendTo("#chat-item-container");


        //Uso un ciclo per confrontare il tempo con gli elementi già pubblicati, se il messaggio è più recente pubblico in quella posizione
        // var nth_account_printed = $("#chat-item-container .chat-item").length;
        // console.log(nth_account_printed);
        // var confrontCounter = 0;
        // do {
        //     //Seleziono l'elemento da confrontare con l'orario
        //     var confrontingElement = $("#chat-item-container .chat-item").eq(confrontCounter);
        //     var confrontingElementID = parseInt(confrontingElement.attr("data-id"));
        //     var confrontingElementNthMessages = (conversation_log[confrontingElementID].length) - 1;
        //     var confrontingElementDate = new Date(conversation_log[confrontingElementID][confrontingElementNthMessages][1]);
        //     console.log(confrontingElementID);
        //     console.log(confrontingElement);
        //
        //     var timeToCheck = parseInt(confrontingElementDate.getFullYear().toString() + confrontingElementDate.getMonth().toString() + confrontingElementDate.getDate().toString() + confrontingElementDate.getHours().toString() + confrontingElementDate.getMinutes().toString()+ confrontingElementDate.getSeconds().toString());
        //     console.log(timeToCheck);
        //
        //     if(current_messageCounter > timeToCheck) {
        //         console.log(current_messageCounter, timeToCheck, "più recente");
        //         accountToAdd.insertBefore("#chat-item-container .chat-item:nth-child("+ confrontCounter +")");
        //         break;
        //     }

            // if (current_messageCounter > timeToCheck) {
            //     accountToAdd.insertBefore(".chat-item:nth-child("+ confrontCounter +")");
            //     console.log("aggiungo");
            //     break;
            // } else if (current_messageCounter < timeToCheck) {
            //     confrontCounter++;
            //     console.log("riprovo");
            // }
        // } while ((confrontCounter >= nth_account_printed) && (current_messageCounter < timeToCheck));

    }
}

//Funzione per stampare tutta una conversazione
function printChat(nthConv) {
    for (var i = 0; i < conversation_log[nthConv].length; i++) {
        //verifico se il messaggio è ricevuto o mandato e lo inserisco
        if (conversation_log[nthConv][i][2] == ".chat-right") {
            var elementToAdd = $(".template .chat-utente").clone();
            var messageToAdd = conversation_log[nthConv][i][0];
            var timeMessageToAdd = new Date(conversation_log[nthConv][i][1]);
            var hhmmTime = getHHMM(timeMessageToAdd);

            //Preparo il messaggio con HTML e lo aggiungo alla chat
            elementToAdd.find(".message-text").text(messageToAdd);
            elementToAdd.find("p.chat-time-message").text(hhmmTime);
            elementToAdd.addClass("chat-right");
            elementToAdd.appendTo("#container-chat-box");
        } else {
            var elementToAdd = $(".template .chat-utente").clone();
            var messageToAdd = conversation_log[nthConv][i][0];

            //Preparo il messaggio con HTML e lo aggiungo alla chat
            elementToAdd.find(".message-text").text(messageToAdd);
            elementToAdd.find("p.chat-time-message").text(hhmmTime);
            elementToAdd.addClass("chat-left");
            elementToAdd.appendTo("#container-chat-box");
        }
    }
}
