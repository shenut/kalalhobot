const Discord = require("discord.js");
const kitsu = require('node-kitsu');
const translate = require('translate');

const traEng = 'yandex';
const traKey = process.env.yandexAPI;

module.exports.run = async function(bot, message, args){
	kitsu.searchAnime(args, 0).then(results => {
        searchResult = results[0];
        if(!searchResult){
          message.channel.send("Anime não encontrado");
        }else{
          var animeID = searchResult.id;
          var titleEn = searchResult.attributes.titles.en;
          if(!titleEn){
              titleEn = "Titulo em inglês não encontrado"
          }
          var titleJP = searchResult.attributes.titles.en_jp;
          if(!titleJP){
              titleJP = "titulo em Rōmaji não encontrado"
          }
          var title = searchResult.attributes.canonicalTitle;
          if(!title){
            if(!titleEn){
                title = titleEn;
            }else if(!titleJP){
                title = titleJP;
            }else{
                title = "titulo não encontrado";
            }
          }
          var synopsis = searchResult.attributes.synopsis;
          if(!synopsis){
              synopsis = "Sem sinopse";
          }
          var episodeCount = searchResult.attributes.episodeCount;
          if(!episodeCount){
              episodeCount = "Sem informação";
          }
          var episodeLength = searchResult.attributes.episodeLength;
          if(!episodeLength){
          	  episodeLength = "Sem informação";
          }
          var status = searchResult.attributes.status;
          var startDate = searchResult.attributes.startDate;
          if(!startDate){
              startDate = "Sem informação";
          }
          var endDate = searchResult.attributes.endDate;
          if(!endDate){
              endDate = "Sem informação";
          }                    
          var smallPoster = searchResult.attributes.posterImage.small;

          //If the synopsis is longer then 700 characters cut it off and add "..."
          //So the post doesn't become to long.
          if(synopsis.length > 700){
              var synopsis = synopsis.substring(0, 700) + '...';
          }
          //The Status returns lowercase "finished", This transforms it into "Finished"
          var statusUpper = status.charAt(0).toUpperCase() + status.substr(1).toLowerCase();

        const synBR = traduzir(client, synopsis);
        const statBR = traduzir(client, statusUpper);
                
        const embed = new Discord.RichEmbed()
        .setTitle(title)
        .setAuthor("Anime")
        .setColor(16610652)
        .setDescription("Status: "+statBR)
        .setFooter("Info brought to you by Kitsu.io & The Okaru Bot ©2018 iPwNix", "https://i.imgur.com/8pMWE28.png")
        .setThumbnail(smallPoster)
        .setTimestamp()
        .setURL("https://kitsu.io/anime/"+animeID)
        .addField("Synopsis:", synBR)
        .addField("Total de Episódios:", episodeCount, true)
        .addField("Tempo de Episódios:", episodeLength+" Minutos", true)
        .addField("English:", titleEn, true)
        .addField("Romanizado:", titleJP, true)
        .addField("Começou em:", startDate, true)
        .addField("Terminou em:", endDate, true);
        message.channel.send({embed});

          

            
        }//END if !searchresults
    });//END searchAnime
}

async function traduzir(client, message){
    return await translate(message, { to: 'pt', engine: traEng, key: traKey });
}

module.exports.info = {
    name: "anime"
}