$(document).ready( () => { 
    let currentUser = "User A";
    let notes = [];

    function getNotes() {
        $('#notesContainer').empty();
        notes.forEach((note,index) => {
            let score = note.userUpvote.length - note.userDownvote.length;
            let canVote = note.creator !== currentUser && !(note.userUpvote.includes(currentUser) || note.userDownvote.includes(currentUser));

            let noteHtml = `<div class="inbox">
                <input type="text" value="${note.noteText}" class="inputb" disabled>
                <input type="button" class="regbutton ${note.userUpvote.includes(currentUser) ? 'greenbutton' : ''}" value="&#x2191" data-index="${index}" data-vote="up" ${note.creator === currentUser ? 'disabled' : ''}>
                <input type="button" class="regbutton ${note.userDownvote.includes(currentUser) ? 'redbutton' : ''}" value="&#x2193" data-index="${index}" data-vote="down" ${note.creator === currentUser ? 'disabled' : ''}>
                <label class="label1">${canVote ? '' : score}</label>
            </div>`;
            $('#notesContainer').append(noteHtml);
        });
    }
    $('.dropdown-item').click(function () {
        currentUser = $(this).data('user');
        $('#currentUser').html('&nbsp;' + currentUser);
        getNotes();
    });
$('#addNoteButton').click(function(){
        let newNoteContent = $('#newNote').val();
        if (newNoteContent) {
            notes.push({
                identifier: (notes.length + 1).toString(),
                creator: currentUser,
                noteText: newNoteContent,
                userUpvote: [],
                userDownvote: []
            });
            $('#newNote').val('');
            getNotes();
        }
    });
$('#regbutton').mouseenter(function () {
        let voteType = $(this).data('vote');

        if(note.creator === currentUser) return;

        if(voteType === 'up') {
            $(this).removeClass('regbutton').addClass('lightgreenbutton');
        }
        else {
            $(this).removeClass('regbutton').addClass('lightredbutton');
        }
    });

    $('#regbutton').mouseleave(function (){
        let voteType = $(this).data('vote');
        $(console).log = "test";

        if(note.creator === currentUser) return;

        if(voteType === 'up') {
            $(this).removeClass('lightgreenbutton').addClass('regbutton');
        }
        else {
            $(this).removeClass('lightredbutton').addClass('regbutton');
        }
    });
$(document).on('click', '.regbutton', function () {
        let noteIndex = $(this).data('index');
        let voteType = $(this).data('vote');
        let note = notes[noteIndex];

        if (note.creator === currentUser) return;

        if (voteType === 'up') {
            if (note.userUpvote.includes(currentUser)) {
                note.userUpvote.splice(note.userUpvote.indexOf(currentUser), 1);
            } else {
                if (note.userDownvote.includes(currentUser)) {
                    note.userDownvote.splice(note.userDownvote.indexOf(currentUser), 1);
                }
                note.userUpvote.push(currentUser);
            }
            $(this).removeClass('regbutton').addClass('greenbutton');
        } else if (voteType === 'down') {
            if (note.userDownvote.includes(currentUser)) {
                note.userDownvote.splice(note.userDownvote.indexOf(currentUser), 1);
            } else {
                if (note.userUpvote.includes(currentUser)) {
                    note.userUpvote.splice(note.userUpvote.indexOf(currentUser), 1);
                }
                note.userDownvote.push(currentUser);
            }
            $(this).removeClass('regbutton').addClass('redbutton');
        }
        getNotes();
    });
    getNotes();

   });
