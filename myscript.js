$(document).ready(function () {
    let eventContainer; //it is where we store our events
    let events;
    let cont;
    
    $("#dialog").dialog({
        autoOpen: false,
        buttons: [{
            text: 'Done',
            click: function () { 
                let subject = $('#subject-input').val();
                let slot = $('#slot-input :selected').text();
                let color = $('#event-color-input').val();
                if (subject == ""){
                    $('#form-error').text("The subject is Empty")
                }
                else if(cont.includes(slot)){
                    $("#form-error").text("Slot is already taken");
                }
                else{
                    eventContainer.append("<div class = 'drag' style='background-color:" + color + "'> <span>" + slot + "</span>: " + subject + " <button style = 'float: right' class='delete'>x</button></div>");
                    $("#dialog").dialog('close')
                }
            }
        }]
    });


    $('td').click(function () {
        $("#dialog").dialog('open')
        eventContainer = $(this).find('.events');
        // console.log(eventContainer.find(".drag"));
        cont = (eventContainer.find(".drag")[0] == undefined)?"":eventContainer.find(".drag")[0].innerHTML;
    })

    $(".events").click(function(event){
        event.stopPropagation();
        events = $(this).find(".drag");
        $delete = events.find(".delete");
        events.click(function(){
            event.stopPropagation();
            $(this).draggable({
                revert : true,
                helper : "clone",
                cursor: "move", 
            });
        });

        $delete.click(function(event){
            event.stopPropagation();
            events.remove();
        });
    })
    $('td').droppable({
        accept : '.events > div',
        drop :  function(e,ui){
            eventContainer = $(this).find('.events');
            rheadrop(eventContainer,ui.draggable)
        }
    })

    function rheadrop(e,ui){
        let checkslot = false;
        $(e).children().each(function(){
            checkslot = $(this).find('span').text().trim() == $('#slot-input').val()
        });

        ui.draggable({
            revert :checkslot
        })

        if(!checkslot){
            $eventList = $(e).length ? $(e) : $(ui).appendTo( $eventList ).fadeIn();
            if($(ui).find('span:first-child').text() == 'PM' ){
                $(ui).appendTo( $eventList ).fadeIn();
            }else{
                $(ui).prependTo( $eventList ).fadeIn();
            } 
        }


        



    }
})