function split(str, sep, n) {
    var out = [];

    while (n--) out.push(str.slice(sep.lastIndex, sep.exec(str).index));

    out.push(str.slice(sep.lastIndex));
    return out;
}


let topdef = `
<div class="col-md col-12">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">#<span class="top-card-title"></span></h4>
            <p class="card-text top-card-description">Description</p>
            <span class="badge rounded-pill bg-accent-1">
                <span class="top-card-messages">0</span> messages
            </span>
            <span class="badge rounded-pill bg-accent-2">
                <span class="top-card-nodes">0</span> channels
            </span>
        </div>
    </div>
</div>
`

let hotdef = `
<div class="col-md col-12">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">#<span class="hot-card-title"></span></h4>
            <p class="card-text hot-card-description">Description</p>
            <span class="badge rounded-pill bg-accent-1">
                <span class="hot-card-messages">0</span> messages this week
            </span>
        </div>
    </div>
</div>
`

let top_channels = ["798209648872128572", "798209673672261633", "798209718119825479"];
let hot_channels = ["798484847123234837", "798484909785874473", "798484926026350604"];

function update() {
    let v = Math.floor(Math.random() * 999999);
    $.getJSON("https://discord.com/api/guilds/383370898847039498/widget.json?v=" + v.toString(), function (data) {
        // sorted
        let channels = data.channels;
        
        channels.sort(function (a, b) {
            return a.position - b.position;
        });
        
        $("#top-channels").empty();
        $("#hot-channels").empty();
        for (var i = 0; i < channels.length; i++) {
            let el = channels[i];
            if (top_channels.includes(el.id)) {
                let [name, nodes, messages, description] = split(el.name, /;/g, 3);
                let doc = $($.parseHTML(topdef));
                doc.find(".top-card-title").text(name);
                doc.find(".top-card-nodes").text(nodes);
                doc.find(".top-card-messages").text(messages);
                doc.find(".top-card-description").text(description);
                $("#top-channels").append(doc);
            }

            if (hot_channels.includes(el.id)) {
                let [name, messages, description] = split(el.name, /;/g, 2);
                let doc = $($.parseHTML(hotdef));
                doc.find(".hot-card-title").text(name);
                doc.find(".hot-card-messages").text(messages);
                doc.find(".hot-card-description").text(description);
                $("#hot-channels").append(doc);
            }
        }
    });
}

$(document).ready(update);

setInterval(update, 60000);