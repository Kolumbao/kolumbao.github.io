let elements = {
    "Messages": "#message-count",
    "Servers": "#server-count",
    "Channels": "#channel-count",
}

// https://stackoverflow.com/a/53798351
/**
 * rounds a number up or down to specified accuracy
 * @param number {numeric} number to perform operations on
 * @param precision {numeric} number of significant figures to return
 * @param direction {string} wether to round up or down
 */
function toPrecision(number, precision, direction) {
  precision -= Math.floor(number).toString().length;
  var order = Math.pow(10, precision);
  number *= order;
  var option = (direction === 'down' ? 'floor' : 'ceil');
  return (Math[option].call(null, number) / order);
}

function update() {
    let v = Math.floor(Math.random() * 999999);
    $.getJSON("https://discordapp.com/api/guilds/732994051766222888/widget.json?v=" + v.toString(), function (data) {
        for(var i = 0; i < data.channels.length; i++) {
            let el = data.channels[i].name.split(": ");
            console.log(el);
            let target = elements[el[0]];
            if (target !== undefined) {
                let int = parseInt(el[1]);
                if (int >= 1000) {
                    int = toPrecision(int, 2, 'down').toLocaleString() + "+";
                }
                $(target).text(int.toString())
            }
        }
    });
}

$(document).ready(update);

setInterval(update, 60000);