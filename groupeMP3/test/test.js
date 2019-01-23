// On récupére le serveur
var server = require('../server.js');

// On branche les requètes de test sur le serveur
var supertest = require('supertest');
global.request = supertest(server);

// on récupère Chai
var chai = require('chai');
var chaiAsPromised =require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

// On récupère les test par expressions régulières
chai.use(require('chai-match'));
var expect = chai.expect;
var should = chai.should;



describe('GET /plages', function() {
        it('returns a list of plages', function(done) {
            request.get('/plages')
                .expect(200)
                .end(function(err, res) {
					
					// On vérifie bien qu'on a une réponse de type tableau d'éléments
                    
                    res.body.should.be.a('array');
                    
                    // On vérifie que chaque musiques de la liste ont toute les propriétés
                    
                    res.body.every(i => expect(i).to.have.all.keys('_id','nomPlage','nbLikes','cheminPochette','dateAjout','dataJSON','nomArtiste','nomAlbum','featArtiste','duree','nbEcoutes','cheminMP3'));
                    
                    // On vérifie que les id est de la bonne forme
                    res.body.every(i => expect(i['_id']).to.match(/^[a-f0-9]{24}$/));
                    
                    // On vérifie que les nombres d'écoutes sont bien de la forme : un chiffre strictement positif
                    res.body.every(i => expect(i['nbEcoutes']).to.match(/^[0-9]*$/));
                    
                    // On vérifie que les nombres d'écoutes sont bien de la forme : un chiffre strictement positif pouvant avoir plusieurs chiffres après la virgule
                    res.body.every(i => expect(i['duree']).to.match(/^[0-9]*(.[0-9]{1,}){0,1}$/));
                    
                    // On vérifie que la date est conforme 
                    res.body.every(i => expect(i['dateAjout']).to.match(/^[1-9][0-9]{3}-(0[0-9]{1}|1[0-2]{1})-(0[0-9]{1}|1[0-9]{1}|2[0-9]{1}|3[0-1]{1})(T)([0-1]{1}[0-9]{1}|2[0-3]{1}):[0-9]{2}:[0-5]{1}[0-9]{1}.[0-9]{0,5}Z$/));
					
					// On vérifie que les données de la waveform sont bien entre -255 et 255
                    res.body.every(i => i['dataJSON'].every(j => expect(j).to.match(/^-{0,1}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) ) );
                    
                    // On vérifie qu'on a bien une url vers un fichir jpg
                    res.body.every(i => expect(i['cheminPochette']).to.match(/^art\/[a-zA-Z0-9_\s'\-\.\?#&+~]*[0-9]*(.[0-9]{1,}){0,1}.jpg$/));
                    
                    // On vérifie qu'on a bien une url vers un fichir mp3
                    res.body.every(i => expect(i['cheminMP3']).to.match(/^mp3\/[a-zA-Z0-9_\s'\-\.\?#&+~]*[0-9]*(.[0-9]{1,}){0,1}.mp3$/));
                    
                    // On vérifie qu'on a bien le bon nombre de données dans notre tableau de données
                    res.body.every(i => expect(i['dataJSON'].length).to.match(/^(79[5-9]{1}|80[0-5]{1})$/) );
                    done(err);
                });
        });
});


describe('GET /plages/5c4845ed0617986f38d4c1ac', function() {
        it('returns a single plage', function(done) {
            request.get('/plages/5c4845ed0617986f38d4c1ac')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.lengthOf(1);
                    res.body.should.be.a('array');
                    res.body[0].should.be.a('object');
                    res.body[0].should.have.property('_id');
                    res.body[0].should.have.property('nomPlage');
                    res.body[0].should.have.property('dateAjout');
                    res.body[0].should.have.property('dataJSON');
                    res.body[0].should.have.property('nomArtiste');
                    res.body[0].should.have.property('nomAlbum');
                    res.body[0].should.have.property('featArtiste');
                    res.body[0].should.have.property('duree');
                    res.body[0].should.have.property('nbEcoutes');
                    res.body[0].should.have.property('cheminMP3');
                    res.body[0].should.have.property('cheminPochette');
                    res.body[0].should.have.property('nbLikes');
                    expect(res.body[0]['_id']).to.match(/^[a-f0-9]{24}$/);
                    expect(res.body[0]['nbEcoutes']).to.match(/^[0-9]*$/);
                    expect(res.body[0]['duree']).to.match(/^[0-9]*([.]{0,1}[0-9]{1,}){0,1}$/);
                    expect(res.body[0]['dateAjout']).to.match(/^[1-9][0-9]{3}-(0[0-9]{1}|1[0-2]{1})-(0[0-9]{1}|1[0-9]{1}|2[0-9]{1}|3[0-1]{1})(T)([0-1]{1}[0-9]{1}|2[0-3]{1}):[0-9]{2}:[0-5]{1}[0-9]{1}.[0-9]{0,5}Z$/);
                    expect(res.body[0]['dataJSON'].every(j => expect(j).to.match(/^-{0,1}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) ));
                    expect(res.body[0]['cheminPochette']).to.match(/^art\/[a-zA-Z0-9_\s'\-\.\?#&+~]*[0-9]*(.[0-9]{1,}){0,1}.jpg$/);
                    expect(res.body[0]['cheminMP3']).to.match(/^mp3\/[a-zA-Z0-9_\s'\-\.\?#&+~]*[0-9]*(.[0-9]{1,}){0,1}.mp3$/);
                    expect(res.body[0]['dataJSON'].length).to.match(/^(79[5-9]{1}|80[0-5]{1})$/);
                    
                    done(err);
                });
        });
});
describe('PUT /plages/5c4845ed0617986f38d4c1ac', function() {
        it('update a plage', function(done) {
            request.put('/plages/5c483332a93d536379616ac1')
				.send({"nomPlage":"Dernier verre d'eau","nomArtiste":"Vald","nomAlbum":"agartha","featArtiste":"","duree":243.72244897959183,"nbEcoutes":0,"nbLikes":0,"dateAjout":"2019-01-10T14:06:05.813Z","dataJSON":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-24,24,-10,11,-8,9,-20,21,-27,30,-9,8,-5,5,-21,23,-30,30,-15,15,-17,17,-22,25,-31,26,-20,23,-30,32,-38,39,-33,32,-17,16,-26,24,-22,26,-25,18,-19,20,-18,22,-18,20,-23,26,-16,18,-19,22,-31,36,-75,75,-77,72,-74,67,-79,75,-75,75,-77,75,-77,79,-74,75,-75,78,-75,75,-78,74,-76,73,-77,75,-74,73,-77,76,-75,76,-77,74,-76,77,-44,39,-79,77,-76,68,-76,76,-78,77,-76,73,-78,75,-77,78,-76,75,-76,76,-75,72,-75,77,-75,77,-75,75,-80,77,-77,76,-77,76,-78,79,-76,79,-43,39,-24,21,-75,74,-80,76,-76,76,-78,82,-79,78,-83,76,-77,76,-76,77,-80,77,-77,77,-78,79,-78,79,-78,86,-79,77,-78,75,-55,46,-57,41,-42,43,-14,15,-42,44,-40,39,-12,11,-18,15,-32,39,-17,16,-13,15,-43,40,-33,37,-7,7,-16,17,-27,39,-47,37,-39,43,-31,51,-13,16,-55,51,-60,54,-53,57,-44,56,-49,64,-52,52,-56,50,-43,50,-56,61,-77,78,-76,78,-78,76,-77,77,-77,76,-71,76,-83,81,-74,77,-78,79,-55,44,-56,51,-55,50,-80,79,-82,78,-81,81,-79,79,-78,77,-79,80,-81,79,-81,83,-83,81,-76,77,-78,76,-47,58,-79,81,-87,85,-79,78,-81,78,-80,79,-83,78,-78,77,-78,88,-80,80,-78,82,-81,86,-78,79,-79,78,-78,76,-80,81,-73,76,-76,75,-74,75,-79,82,-83,78,-78,80,-39,38,-39,44,-28,26,-42,43,-49,47,-52,46,-53,43,-52,50,-54,53,-52,46,-44,47,-53,49,-48,48,-49,46,-55,49,-69,53,-57,52,-62,53,-58,53,-58,56,-45,47,-40,36,-38,37,-78,76,-77,74,-77,78,-77,78,-77,76,-79,78,-76,77,-78,78,-78,76,-79,79,-76,73,-76,76,-74,73,-75,76,-78,75,-75,74,-74,70,-46,39,-52,50,-58,48,-51,43,-43,40,-48,48,-52,49,-60,55,-74,75,-74,76,-77,75,-75,74,-74,76,-70,75,-77,78,-76,76,-76,75,-77,78,-55,50,-54,48,-45,53,-49,54,-51,51,-52,47,-56,53,-44,50,-38,54,-76,73,-78,77,-73,75,-76,74,-77,79,-81,80,-76,78,-76,77,-77,77,-50,48,-48,50,-36,36,-81,79,-80,79,-80,82,-80,82,-77,77,-77,76,-79,79,-79,82,-68,71,-75,76,-79,71,-79,79,-83,83,-77,80,-80,79,-82,71,-80,81,-83,77,-78,77,-81,79,-79,78,-79,78,-80,79,-77,76,-79,73,-81,82,-85,83,-75,76,-75,79,-71,74,-81,80,-79,80,-77,79,-38,43,-57,54,-51,42,-45,38,-46,41,-42,41,-42,38,-43,43,-53,44,-50,45,-49,55,-45,39,-49,50,-56,41,-49,42,-49,44,-47,52,-49,40,-47,47,-46,50,-59,50,-71,74,-55,50,-49,44,-79,72,-59,47,-67,72,-50,50,-72,68,-55,48,-58,61,-64,66,-51,48,-76,69,-46,55,-72,59,-51,42,-62,65,-52,50,-78,79,-79,78,-77,76,-77,75,-76,76,-77,77,-78,75,-45,42,-48,44,-56,47,-65,60,-49,63,-46,54,-45,59,-55,47,-57,49,-57,51,-65,63,-75,75,-76,76,-78,79,-78,78,-78,82,-75,74,-81,77,-75,77,-78,76,-55,43,-79,82,-82,79,-77,82,-85,84,-82,81,-82,81,-63,61,-77,78,-80,78,-82,82,-79,79,-75,73,-77,74,-61,65,-81,81,-76,83,-79,81,-84,76,-81,77,-90,81,-78,78,-77,76,-85,78,-82,81,-96,81,-76,76,-82,78,-78,79,-81,80,-73,73,-77,78,-70,75,-82,80,-85,77,-78,79,-46,44,-30,43,-20,22,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"cheminMP3":"/home/ubuntu/Bureau/S2IMA/ProjetLPMP3/groupeMP3/groupeMP3/files/mp3/tmp-30777413kkjGXHGSf.mp3","cheminPochette":"/home/ubuntu/Bureau/S2IMA/ProjetLPMP3/groupeMP3/groupeMP3/files/art/tmp-30777413kkjGXHGSf.jpg"})
                .expect(200)
                .end(function(err, res) {
					res.body.should.be.a('object');
					res.body.should.not.be.a('array');
					//res.body.should.have.property('_id');
					res.body.should.have.property('nomPlage').eql("Dernier verre d'eau");
					res.body.should.have.property('dateAjout');
					res.body.should.have.property('dataJSON');
					res.body.should.have.property('nomArtiste');
					res.body.should.have.property('nomAlbum');
					res.body.should.have.property('nbLikes');
					res.body.should.have.property('featArtiste');
					res.body.should.have.property('duree');
					res.body.should.have.property('nbEcoutes');
					res.body.should.have.property('cheminMP3');
					res.body.should.have.property('cheminPochette');
					
                    done(err);
                });
        });
});
describe('POST /like/5c4845ed0617986f38d4c1ac',function(){
	it('add a like to a plage', function(done) {
		request.post('/like/5c4845ed0617986f38d4c1ac')
		.send()
		.expect(200)
		.end(function(err, res){
			request.get('/plages/5c4845ed0617986f38d4c1ac')
				.send()
				.expect(200)
				.end(function(err, res){
					res.body[0].should.have.property('nbLikes').eql(1);
				done(err);
			});
		});
	})
});
describe('POST /dislike/5c4845ed0617986f38d4c1ac',function(){
	it('remove a like to a plage', function(done) {
		request.post('/dislike/5c4845ed0617986f38d4c1ac')
		.send()
		.expect(200)
		.end(function(err, res){
			request.get('/plages/5c4845ed0617986f38d4c1ac')
				.send()
				.expect(200)
				.end(function(err, res){
					res.body[0].should.have.property('nbLikes').eql(0);
				done(err)
			});
		});
	})
});
//describe('DELETE /plages/5c483332a93d536379616ac1', function() {
        //it('delete a plage', function(done) {
		//request.delete('/plages/5c483332a93d536379616ac1')
				//.send()
				//.expect(200)
                //.end(function(err, res) {
					//console.log(res.body);
					//res.body.should.be.a('object');
					//done(err);
				//});
        //});
//});
