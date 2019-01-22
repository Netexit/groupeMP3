function SoundData(jsonUrl) {

    var init = function(jsonUrl) {
        return clean(jsonUrl);
    };
    
    var clean = function(tab) {
        for (var i = 0; i < tab.length; i = i + 2) {
            delete tab[i];
        }
        tab = tab.filter(function(el) {
            return el != null;
        });

        var max = 0;
        for (i = 0; i < tab.length; i = i + 1) {
            if (tab[i] > max) {
                max = tab[i];
            }
        }
        var coef = 255 / max;
        for (i = 0; i < tab.length; i = i + 1) {
            if (tab[i] <= 1) {
                tab[i] = 1;
            } else {
                tab[i] = Math.round(tab[i] * coef);
            }
        }

        return tab;
    };

    var json = init(jsonUrl);

    this.getJson = function(){
        return json;
    };

}
