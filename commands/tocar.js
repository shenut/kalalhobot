const search = require('yt-search');

exports.run = (client, message, args) => {

    search(args.join(' '), function(err, res){

        if(err) message.channel.send('Bixo deu um erro aqui');

        let videos = res.videos.slice(0,10);

        let resp = '';
        for (var i in videos){
            resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
        }

        resp += `\n**Escolha o número correspondente \`1-${videos.length}\``;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;

        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;


        collector.once('collect', function(m){
            message.channel.send(`:arrow_forward: Tocando agora: \`${videos[m-1].title}\` | Pedida por:  `+message.author.username).then(msg2 => {
                msg2.react('🔁')
                msg2.react('⏩');
                const collector = msg2.createReactionCollector((r, u) => ((r.emoji.name === '🔁') || (r.emoji.name === '⏩')) && (u.id !== client.user.id))
                collector.on("collect", r=>{
                switch (r.emoji.name) {
                case '🔁': 
                let commandPlay = require(`./play.js`);
                    commandPlay.run(client, message, [this.videos[parseInt(m.content)-1].url]);
                    message.edit(`:arrow_forward: Tocando agora: \`${videos[m-1].title}\` | Pedida por:  `+message.author.username);
                break;
                case '⏩':
                let commandParar = require(`./pular.js`);
                    commandParar.run(client, message, args);
                    break;
                case 'adsdsa':
                let commandP = require(`./pular.js`);
                    commandP.run(client, message, args);
                }
                })
            }) 
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url]);
        })

    });
}

module.exports.ajuda = {
    name: "tocar",
    description: " Para pesquisar músicas para soltar o batidão",
    usage: "&tocar elijah who myself"
}