function WaveForm(url, jsonUrl) {

    this.modifNbRect = function(nb) {
        var newTabs = this.json;

        if (nb == 0) {
            console.log("nb = 0");
            var arrayVide = [];
            return arrayVide;
        } else if (nb > this.json.length) {
            return this.json;
        }
        var i = 1;
        while (newTabs.length != nb) {
            var array = [];

            for (var j = 0; j < this.json.length - i; j++) {
                array[j] = (this.json[j] + this.json[j + 1]) / 2;
            }
            newTabs = array;
            i++;
        }
        this.json = newTabs;
    };

    this.url = url;
    this.jsonUrl = jsonUrl;

    this.json = new ReadJson(this.jsonUrl).data;
    // console.log("JSON : ");
    // console.log(this.json);
    // console.log(this.json);

    // this.modifNbRect(150);
    this.svg = new CreateWaveForm(this.json, this.url);
    // this.modifNbRect(150);
    // this.svg.clearSVG();
    // this.svg.createSVG(this.json);
    // this.svg = new CreateWaveForm(this.json, this.url);

}
