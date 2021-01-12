function split(str, sep, n) {
    var out = [];

    while (n--) out.push(str.slice(sep.lastIndex, sep.exec(str).index));

    out.push(str.slice(sep.lastIndex));
    return out;
}


let def = `
<div class="col-md col-12" id="top1">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">#<span class="top-title"></span></h4>
            <p class="card-text top-description">Description</p>
            <span class="badge rounded-pill bg-accent-1">
                <span class="top-messages">0</span> messages
            </span>
            <span class="badge rounded-pill bg-accent-2">
                <span class="top-nodes">0</span> channels
            </span>
        </div>
    </div>
</div>
`

let top_channels = ["798209648872128572", "798209673672261633", "798209718119825479"];

function update() {
    let v = Math.floor(Math.random() * 999999);
    $.getJSON("https://discord.com/api/guilds/383370898847039498/widget.json?v=" + v.toString(), function (data) {
        // sorted
        let channels = data.channels;
        
        channels.sort(function (a, b) {
            return a.position - b.position;
        });
        
        $("#top-channels").empty();
        for (var i = 0; i < channels.length; i++) {
            let el = channels[i];
            if (top_channels.includes(el.id)) {
                let [name, nodes, messages, description] = split(el.name, /;/g, 3);
                let doc = $($.parseHTML(def));
                doc.find(".top-title").text(name);
                doc.find(".top-nodes").text(nodes);
                doc.find(".top-messages").text(messages);
                doc.find(".top-description").text(description);
                $("#top-channels").append(doc);
            }
        }
    });
}

$(document).ready(update);

setInterval(update, 60000);