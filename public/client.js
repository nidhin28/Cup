//jquery related functionality
//definitions: function , objects/data, variables, etc.
 
function addEntryRenderHTML(results) {
    console.log(results);
    let htmlString = ``;
    let displayDate = results.matchDate.substring(0, 10);
    let formattedDisplayDate = displayDate.split("-");
    let formattedDisplayDateOutput = formattedDisplayDate[1] + "/" + formattedDisplayDate[2] + "/" + formattedDisplayDate[0];

    //loop throu all the results
    //    $.each(resultsObject, function (key, results) {

    htmlString += `<div class="entries-container" id="${results._id}">`;
    //edit buttons start
    htmlString += `<div class="entry-div ${results.entryType}">`;
    htmlString += `<div class="edit-entry-buttons">`;
    htmlString += `<span class="update-select">Edit</span>`;
    htmlString += `<p>&nbsp|&nbsp</p>`;
    htmlString += `<span class="delete-select">Delete</span>`;
    htmlString += `</div>`;
    //edit buttons finish

    htmlString += `<span class="entry-info type info-label">${results.entryType}</span>`; 
    htmlString += `<span class="entry-info date">`;
    htmlString += `<p class="info-label">matchDate</p>`;
    htmlString += `<p>${formattedDisplayDateOutput}</p>`;
    htmlString += `</span>`;
    if (results.matchResult) {
        htmlString += `<span class="entry-info role">`;
        htmlString += `<p class="info-label">MatchResult</p>`;
        htmlString += `<p>${results.matchResult}</p>`;
        htmlString += `</span>`;
    }
    htmlString += `<span class="entry-info play">`;
    htmlString += `<p class="info-label">matchVenue</p>`;
   
    htmlString += `<span class="author">${results.matchVenue}</span>`;
    htmlString += `</span>`;
    if (results.matchStadiumType) {
        htmlString += `<span class="entry-info theater-co">`;
        htmlString += `<p class="info-label">matchStadiumType</p>`;
        htmlString += `<p>${results.matchStadiumType}</p>`;
        htmlString += `</span>`;
    }
    if (results.matchCapacity) {
        htmlString += `<span class="entry-info location">`;
        htmlString += `<p class="info-label">matchCapacity</p>`;
        htmlString += `<p>${results.matchCapacity}</p>`;
        htmlString += `</span>`;
    }
    htmlString += `<span class="entry-info notes">`
    htmlString += `<p class="info-label">Notes</p>`
    htmlString += `<p>${results.matchNotes}</p>`;
    htmlString += `</span>`;
    htmlString += `</div>`;


    //Edit Entry  Entry form start
    htmlString += `<div class="js-edit-entry" style="display: none;">`;
    htmlString += `<form action="" class="edit-entry-form">`;
    htmlString += `<fieldset>`;
    htmlString += `<label class="question" for="entry-type">Entry Type:</label>`;

    //dynamically preselect the options based on the previous values
    htmlString += `<select name="entryType" class='entry-type' required>`;
    if (results.entryType == "classic") {
        htmlString += `<option value="classic" selected>classic</option>`;
        htmlString += `<option value="Dramatic" >Dramatic</option>`;
        htmlString += `<option value="mustWatch" >mustWatch</option>`;
    } else if (results.entryType == "Dramatic") {
        htmlString += `<option value="classic" >classic</option>`;
        htmlString += `<option value="Dramatic" selected>Dramatic</option>`;
        htmlString += `<option value="mustWatch" >mustWatch</option>`;
    } else if (results.entryType == "mustWatch") {
        htmlString += `<option value="classic" >classic</option>`;
        htmlString += `<option value="Dramatic" >Dramatic</option>`;
        htmlString += `<option value="mustWatch" selected>mustWatch</option>`;
    }
    htmlString += `</select>`;


    htmlString += `<br>`;
    htmlString += `<label for="inputDate">Date</label>`;
    htmlString += `<input type="date" class="inputDate" value="${displayDate}">`;
    //    htmlString += `<button type="button" class="date-text">Need Date Range?</button>`;
    htmlString += `<div class="play-info">`;
    htmlString += `<label for="inputPlay">matchVenue</label>`;
    htmlString += `<input type="text" class="inputPlay" placeholder="Play" value="${results.matchVenue}">`;
    htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    htmlString += `<label for="inputAuthor">matchReferee</label>`;
    htmlString += `<input type="text" class="inputAuthor" placeholder="Author" value="${results.matchReferee}">`;
    htmlString += `<label for="inputRole">matchResult</label>`;
    htmlString += `<input type="text" class="inputRole" placeholder="Role" value="${results.matchResult}">`;
    htmlString += `</div>`;
    htmlString += `<div class="place-info">`;
    htmlString += `<label for="inputCo">StadiumType</label>`;
    htmlString += `<input type="text" class="inputCo" placeholder="Company" value="${results.matchStadiumType}">`;
    htmlString += `<label for="inputLocation">matchCapacity</label>`;
    htmlString += `<input type="text" class="inputLocation" placeholder="Location" value="${results.matchCapacity}">`;
    htmlString += `</div>`;
    htmlString += `<br>`;
    htmlString += `<label for="inputNotes">Notes</label>`;
    htmlString += `<textarea name="Text1" class="inputNotes" cols="40" rows="5">${results.matchNotes}</textarea>`;
    htmlString += `</fieldset>`;
    htmlString += `<button type="submit" class="submit-button">Update Entry</button>`;
    htmlString += `<span class="cancel-button">Cancel</span>`;
    htmlString += `</form>`;
    htmlString += `</div>`;
    //Edit Entry  Entry form finish

    //delete entry form start
    htmlString += `<div class="js-delete-entry" style="display: none;">`;
    htmlString += `<form class="delete-entry-form">`;
    htmlString += `<input type="hidden" class="inputEntryID"  value="${results._id}">`;
    htmlString += `<h4>Are you sure you want to delete this entry?</h4>`;
    htmlString += `<button type="submit" class="delete-button">Delete</button>`;
    htmlString += `<span class="cancel-button">Cancel</span>`;
    htmlString += `</form>`;
    htmlString += `</div>`;
    //delete entry form finish


    htmlString += `</div>`;
    //    });
    return htmlString;
}



function populateUserDashboardDate(username) { //Get AJAX User Entries call, render on page

    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('#loggedInUserName').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };
    console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/entry-date/${username}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.entriesOutput.length === 0) {
                $('#no-entry').show();
            } else {
                $('#no-entry').hide();
            }

            //empty the user-list container before populating it dynamically
            $('#user-list').html("");
            htmlUserDashboard(result);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function populateUserDashboardWatch(username) { //Get AJAX User Entries call, render on page

    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('#loggedInUserName').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };
    console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/entry-watch/${username}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.entriesOutput.length === 0) {
                $('#no-entry').show();
            } else {
                $('#no-entry').hide();
            }

            //empty the user-list container before populating it dynamically
            $('#user-list').html("");
            htmlUserDashboard(result);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function populateUserDashboardClassic(username) { //Get AJAX User Entries call, render on page

    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('#loggedInUserName').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };
    console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/entry-classic/${username}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.entriesOutput.length === 0) {
                $('#no-entry').show();
            } else {
                $('#no-entry').hide();
            }

            //empty the user-list container before populating it dynamically
            $('#user-list').html("");
            htmlUserDashboard(result);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function populateUserDashboardDramatic(username) { //Get AJAX User Entries call, render on page

    if ((username == "") || (username == undefined) || (username == null)) {
        username = $('#loggedInUserName').val();
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };
    console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/entry-dramatic/${username}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.entriesOutput.length === 0) {
                $('#no-entry').show();
            } else {
                $('#no-entry').hide();
            }

            //empty the user-list container before populating it dynamically
            $('#user-list').html("");
            htmlUserDashboard(result);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function htmlUserDashboard(resultsObject) {
    console.log(resultsObject.entriesOutput);
    $.each(resultsObject.entriesOutput, function (key, value) {
        $('#user-list').append(addEntryRenderHTML(value));

    });
}

//function updateEditFormValues(results) {
//    let id = results._id;
//    let jsEntryText = $(`#${results._id}`).find('.entry-div .type').text();
//    $(`#${results._id}`).find('.js-edit-entry .entry-type').val(jsEntryText);
//    //    console.log($(`#${results._id}`).find('.js-edit-entry .entry-type').val());
//    console.log(jsEntryText);
//
//}

function scrollToEntry(id, focus) {
    let $container = $(`#${id}`);
    let $scrollTo = $(`${focus}`);
    console.log(id, focus);

    $(`#${id}`).scrollTop($(`${focus}`).offset().top);
    //    scrollTo.offset().top - container.offset().top + container.scrollTop()
    // Or you can animate the scrolling:
    //    $container.animate({
    //        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
    //    });​
}

///////////////////////////////////////////////////////////////////
//Invocations (calling)& function Triggers
$(function () {
    //first function invoke
    $('section').hide();
    $('.navbar').hide();

    $('.js-edit-entry').hide();
    $('.js-delete-entry').hide();

    $('#homepage-header').show();
    $('#signup-home-page').show();
    $('.place-container').show();
});

$(".sign-up-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const name = $("#signUpName").val();
    const username = $("#signUpUsername").val();
    const password = $("#signUpPassword").val();

    //validate the input
    if (name == "") {
        alert('Please add a name');
    } else if (username == "") {
        alert('Please add an user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            name: name,
            username: username,
            password: password
        };
        //console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                populateUserDashboardDate(result.username);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});

$('#change-form-login').click(function (event) {
    event.preventDefault();

    location.reload();

});

$(".login-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loginUsername").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        //console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                $('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                //            htmlUserDashboard();
                populateUserDashboardDate(result.username); //AJAX call in here??
                //                noEntries();

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    };


});

$('#change-form-signup').click(function (event) {
    event.preventDefault();
    $('section').hide();
    $('#homepage-header').show();
    $('#signup-page').show();
});

$('#add-entry-button').click(function (event) {
    event.preventDefault();
    
    $('.formInput').val('');

    $('#add-entry-container').show();
});

$(".entry-form").submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const entryType = $(".addEntryType").val();
    const matchDate = $(".addInputDate").val();
    const matchVenue = $(".addInputPlay").val();
    const matchReferee = $(".addInputAuthor").val();
    const matchResult = $(".addInputRole").val();
    const matchStadiumType = $(".addInputCo").val();
    const matchCapacity = $(".addInputLocation").val();
    const matchNotes = $(".addInputNotes").val();
    const loggedInUserName = $("#loggedInUserName").val();

    //validate the input
    if (entryType == "") {
        alert('Please input entry type');
    } else if (matchDate == "") {
        alert('Please input matchDate');
    } else if (matchVenue == "") {
        alert('Please input matchVenue');
    } else if (matchReferee == "") {
        alert('Please input matchReferee');
    } else if (matchNotes == "") {
        alert('Please input matchNotes');
    }
    //if the input is valid
    else {

        //create the payload object (what data we send to the api call)
        const entryObject = {
            entryType: entryType,
            matchDate: matchDate,
            matchVenue: matchVenue,
            matchReferee: matchReferee,
            matchResult: matchResult,
            matchStadiumType: matchStadiumType,
            matchCapacity: matchCapacity,
            matchNotes: matchNotes,
            loggedInUserName: loggedInUserName,
        };
        console.log(entryObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/entry/create',
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
               // $('#loggedInName').text(result.name);
               // $('#loggedInUserName').val(result.username);
                $('#add-entry-container').hide();
                //                noEntries();
                //Add Entry to page
                $('#user-list').prepend(addEntryRenderHTML(result));
                $('html, body').animate({
                    scrollTop: $(`#${result._id}`).offset().top
                }, 1000);

                //                $().scrollTop();

                //                updateEditFormValues(result);
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };
});
//click on x closes add entry popup
$('.close-popup').click(function (event) {
    event.preventDefault();
    $('#add-entry-container').hide();
});

$('#logout').click(function (event) {
    event.preventDefault();
    $('section').hide();
    location.reload();


});

// Date |   Read |   Seen |   Performed
//$('#date-sort').click(function (event) {
//    event.preventDefault();
//    alert('Sorted by Date');
//});
//$('#read-sort').click(function (event) {
//    event.preventDefault();
//    alert('Sorted by Read');
//});
//$('#seen-sort').click(function (event) {
//    event.preventDefault();
//    alert('Sorted by Seen');
//});
//$('#performed-sort').click(function (event) {
//    event.preventDefault();
//    alert('Sorted by Performed');
//});

//Update Entry
$('#user-list').on('click', '.update-select', function (event) {
    event.preventDefault();
    let currentEditForm = $(event.currentTarget).closest('.entry-div').siblings('.js-edit-entry');

    $('.js-delete-entry').hide();
    $('.js-edit-entry').hide();
    currentEditForm.show();


    $('html, body').animate({
        scrollTop: currentEditForm.offset().top
    }, 1000);

    console.log($(event.currentTarget).closest('.entries-container').attr('id'), '.js-edit-entry');
});
//Update Entry Submit
$('#user-list').on('submit', '.edit-entry-form', function (event) {
    event.preventDefault();

    //take the input from the user
    const parentDiv = $(this).closest('.entries-container');
    const entryType = $(this).parent().find(".entry-type").val();
    const matchDate = $(this).parent().find(".inputDate").val();
    const matchVenue = $(this).parent().find(".inputPlay").val();
    const matchReferee = $(this).parent().find(".inputAuthor").val();
    const matchResult = $(this).parent().find(".inputRole").val();
    const matchStadiumType = $(this).parent().find(".inputCo").val();
    const matchCapacity = $(this).parent().find(".inputLocation").val();
    const matchNotes = $(this).parent().find(".inputNotes").val();
    const loggedInUserName = $("#loggedInUserName").val();
    const entryId = $(this).parent().find('.inputEntryID').val();

    //validate the input
    if (entryType == "") {
        alert('Please input entry type');
    } else if (matchDate == "") {
        alert('Please input matchDate');
    } else if (matchVenue == "") {
        alert('Please input matchVenue');
    } else if (matchReferee == "") {
        alert('Please input matchReferee');
    } else if (matchNotes == "") {
        alert('Please input matchNotes');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const entryObject = {
            entryType: entryType,
            matchDate: matchDate,
            matchVenue: matchVenue,
            matchReferee: matchReferee,
            matchResult: matchResult,
            matchStadiumType: matchStadiumType,
            matchCapacity: matchCapacity,
            matchNotes: matchNotes,
            loggedInUserName: loggedInUserName,
            entryId: entryId
        };
        console.log(entryObject);


        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/entry/${entryId}`,
                dataType: 'json',
                data: JSON.stringify(entryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                populateUserDashboardDate(loggedInUserName);
                $('.js-edit-entry').hide();

                console.log(parentDiv);
                $('html, body').animate({
                    scrollTop: parentDiv.offset().top
                }, 1000);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

//Delete Entry
$('#user-list').on('click', '.delete-select', function (event) {
    event.preventDefault();
    //    $('.js-delete-entry').show();
    $('.js-delete-entry').hide();
    $('.js-edit-entry').hide();
    $(event.currentTarget).closest('.entry-div').siblings('.js-delete-entry').show();
    //    $(event.currentTarget).parents('.entry-div').append(deleteEntryForm);
    //    $('html, body').animate({
    //        scrollTop: $(this).closest('.entry-div').siblings('.js-delete-entry').offset().top
    //    }, 1000);
});

$('#user-list').on('submit', '.delete-entry-form', function (event) {
    event.preventDefault();


    //take the input from the user
    const entryId = $(this).parent().find('.inputEntryID').val();
    const loggedInUserName = $("#loggedInUserName").val();
    const parentDiv = $(this).closest('.entries-container');

    //    console.log(currentForm, entryId);
    //    console.log(entryType, inputDate, inputPlay, inputAuthor, inputRole, inputCo, inputLocation, inputNotes);

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/entry/${entryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            populateUserDashboardDate(loggedInUserName);
            alert("Entry deleted");
            $('.js-delete-entry').hide();

            $('html, body').animate({
                scrollTop: $('.navbar').offset().top
            }, 1000);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$('#user-list').on('click', '.cancel-button', function (event) {
    event.preventDefault();

    $('.js-delete-entry').hide();
    $('.js-edit-entry').hide();
    $('html, body').animate({
        scrollTop: $(this).closest('.entries-container').offset().top
    }, 1000);
});
