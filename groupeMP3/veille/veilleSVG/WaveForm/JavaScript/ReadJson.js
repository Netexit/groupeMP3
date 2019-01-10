// Cette fonction permet de lire depuis le client un fichier json sur le serveur et de le parser en JSON.
function ReadJson(jsonUrl) {

    this.init = function(jsonUrl) {
        var client = new XMLHttpRequest();
        client.overrideMimeType("application/json");
        client.open('GET', jsonUrl, false);
        client.send(null);
        // console.log(client.responseText);
        var json = JSON.parse(client.responseText);
        // console.log(json);
        return clean(json);
        // console.log(this.data);
    };

    var clean = function(tab) {
        for (var i = 0; i < tab.data.length; i = i + 2) {
            delete tab.data[i];
        }
        tab.data = tab.data.filter(function(el) {
            return el != null;
        });

        var max = 0;
        for (i = 0; i < tab.data.length; i = i + 1) {
            if (tab.data[i] > max) {
                max = tab.data[i];
            }
        }
        var coef = 255 / max;
        for (i = 0; i < tab.data.length; i = i + 1) {
            if (tab.data[i] <= 1) {
                tab.data[i] = 1;
            } else {
                tab.data[i] = Math.round(tab.data[i] * coef);
            }
        }

        return tab;
    };

    this.jsonUrl = jsonUrl;
    this.json = this.init(this.jsonUrl);
    this.data = this.json.data;
}
