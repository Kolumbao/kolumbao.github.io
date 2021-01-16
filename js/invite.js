

function load() {
    $.getJSON("https://discord.com/api/guilds/457205628754984960/widget.json", function (data) {
        let invite = data.instant_invite;
        if (invite !== undefined) {
            $('#invite-button').attr('href', invite);
        }
    }).fail(function (e) {
        $('#invite-button').attr('href', 'https://discord.com/invite/dgVPkJvr');
    });
    $('#invite-button-text').text("Join support server")
}

$(document).ready(load);