const Discord = require("discord.js")

const config = require("./config.json")

const { durationTime } = require('util-stunks')
const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sei la kkkkkkkk
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Colocar tudo no arquivo index.js
// Os canais criados para mostrar os tatus tem que ser canal de voz

  client.on("ready", () => {
    let canalPing = client.channels.cache.get(`${config.canalping}`); // Aqui o bot irá pegar o canal pelo id (Coloque o id do canal que aparecerá o ping do bot)
    if (!canalPing) return console.log(`Canal de ping do bot não encontrado`); // Aqui o bot ira mandar no console se o canal não existir

    canalPing.setName(`📡 Ping: Calculando...`);
    setInterval(() => {
      canalPing.setName(`📡 Ping: ${client.ws.ping}ms`); // Aqui o bot vai renomear o canal para o ping do bot
    }, 1000 * 60 * 4 ); // Aqui é o tempo(delay) que vai ser alterado o nome do canal para o ping do bot (altere o 4 para os minutos desejados!)
});
  
  client.on("ready", () => {
    let users = client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)
    const compact = users.toLocaleString("pt-BR", { notation: 'compact' });
    let membro = client.channels.cache.get(`${config.canalmembros}`); // Colocar o id do canal de membros
    if (!membro) return console.log(`Canal de membros do bot não encontrado`);
    membro.setName(`📡 Membros: Calculando...`);
    setInterval(() => {
      membro.setName(`📡 Membros: ${compact}`);
    }, 1000 * 60 * 4);
  })
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// MENSAGENS DELETADAS ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
client.on('messageDelete', async (message) => {

    const canalLogs = message.guild.channels.cache.get("1029445429080895498") // ID DO CANAL DE LOGS

    if (message.author.bot) return;

    let msgDelete = message.content;
    const qmdeletou = message.author;
    const canaldelatado = message.channel;

    const embed_delete = new Discord.EmbedBuilder()
        .setTimestamp()
        .setColor("Red") // A COR DO SEU SERVER ( Em ingles e com a inicial maiuscula e o retante minusculo)
        .setTitle(`🗑 **MENSAGEM DELETADA**`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields({ name: `MENSAGEM DELETADA NO CANAL`, value: `${canaldelatado}`, inline: false, })
        .addFields({ name: `MENSAGEM DELETADA POR`, value: `${qmdeletou}`, inline: false, })
        .addFields({ name: `MENSAGEM DELETADA`, value: `\`\`\`${msgDelete}\`\`\``, inline: false, })
        .setFooter({ text: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })

    try {

        canalLogs.send({ embeds: [embed_delete] })

    } catch (e) { }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// BOT INFO ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
        
        client.on("interactionCreate", async (interaction) => {
            if (interaction.isSelectMenu()) {
              let choice = interaction.values[0]
              const member = interaction.member
              const server = interaction.guild.members.cache.get(client.user.id)
          
              //Username
              if (interaction.isSelectMenu()) {
                if (choice === "cargos") {
              let embedCargos = new discord.EmbedBuilder()
               .setColor('Random')
               .setTitle(`Os cargos que eu estou no momento são: `)
               .setDescription(`- ${server.roles.cache.sort
                ((a, b) => b.position - a.position)
                .filter((role) => role != interaction.guild.roles.client.user)
                .map((role) => role).join("\n -") || `Nenhum`}`)
               .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})

               interaction.reply({ embeds: [embedCargos],
              ephemeral: true
            })
        }  else if(choice === "config") {
            {
              
                let embedinvite = new discord.EmbedBuilder()
                .setTitle(`📌 - Invite`)
                 .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                 .setDescription(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scop=ebot`)
                

                 
                 interaction.reply({ embeds: [embedinvite], ephemeral: true })

            };
         };

    }


}
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///ticket
client.on("interactionCreate", (interaction) => {
    if (interaction.isSelectMenu()) {
      if (interaction.customId === "painel_ticket") {
        let opc = interaction.values[0]
        if (opc === "opc1") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `📦|${interaction.user.username}`;
          let categoria = "1029558844541653092" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({
              name: `${interaction.guild.name} | Compras`,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `Olá \`${interaction.user.username}\`, \`Boas vindas ao seu ticket.\`\nAguarde alguns instantes para receber o suporte.\n\n**Feche seu ticket no Botao Abaixo**\.`
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/964165018612539503/1026642615661240330/ezgif.com-gif-maker.gif"
            );
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("<:1023420800407187486:1024117533546135582>")
            .setLabel("Fechar Ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao] }).then( m => { 
              m.pin()
             })
          })
          }
          
        } else if (opc === "opc2") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `📦|${interaction.user.username}`;
          let categoria = "1038588100349272175" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({
              name: `${interaction.guild.name} | Suporte`,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `Olá \`${interaction.user.username}\`, \`Boas vindas ao seu ticket.\`\nAguarde alguns instantes para receber o suporte.\n\n**Feche seu ticket no Botao Abaixo**\.`
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/964165018612539503/1026642615661240330/ezgif.com-gif-maker.gif"
            );
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("<:1023420800407187486:1024117533546135582>")
            .setLabel("Fechar Ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao] }).then( m => { 
              m.pin()
             })
          })
          }
          
        } else if (opc === "opc3") {
  
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // Nova opção
  
          let nome = `📦|${interaction.user.username}`;
          let categoria = "1029558907615588413" // Coloque o ID da categoria
  
          if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
  
          if (interaction.guild.channels.cache.find(c => c.name === nome)) {
            interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
          } else {
            interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then( (ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({
              name: `${interaction.guild.name} | Parceria`,
              iconURL: interaction.guild.iconURL({ dynamic: true }),
            })
            .setDescription(
              `Olá \`${interaction.user.username}\`, \`Boas vindas ao seu ticket.\`\nAguarde alguns instantes para receber o suporte.\n\n**Feche seu ticket no Botao Abaixo**\.`
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/964165018612539503/1026642615661240330/ezgif.com-gif-maker.gif"
            );
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
            .setCustomId("fechar_ticket")
            .setEmoji("<:1023420800407187486:1024117533546135582>")
            .setLabel("Fechar Ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            );
  
            ch.send({ embeds: [embed], components: [botao] }).then( m => { 
              m.pin()
             })
          })
          }
          
        }
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "fechar_ticket") {
        interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
        setTimeout ( () => {
          try { 
            interaction.channel.delete()
          } catch (e) {
            return;
          }
        }, 5000)
      }
    }
  })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    client.on('guildMemberAdd', async(member) => {

        let canal = member.guild.channels.cache.get('1029445428166529115'); //Id do canal!
        if(!canal) return;
    
        let entrada = new Discord.EmbedBuilder()
        .setAuthor({name: `${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({dynamic: true})}`})
        .setTitle(`Sistema de bem vindo!`)
        .setDescription(`${member} *É o novo membro do servidor, seja muito bem vindo(a) em **${member.guild.name}**.*\n\nPequena curiosidade: Você é o membro **${member.guild.memberCount}** do servidor!`)
        .addFields({name: `Regras:`, value: `<#id do canal>`, inline: true},
        {name: `Resgistre-se:`, value: `<#id do canal>`, inline: true},
        {name: `Interaja Em:`, value: `<#id do canal>`})
        .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true})}`)
        .setFooter({text: `${member.guild.name}`, iconURL: `${member.guild.iconURL({ dynamic: true})}`})
        .setTimestamp(new Date())
        //.setImage() // Você pode por uma imagem na embed!
    
        let b1 = new Discord.ButtonBuilder()
        .setLabel(`AZ Shop`) //Coloque um nome para o botão 
        .setEmoji(`🔗`)
        .setStyle(5)
        .setURL(``) //Coloque o link do botão
    
        let b2 = new Discord.ActionRowBuilder().addComponents(b1)
    
        canal.send({embeds: [entrada], components: [b2], content: `${member}`})
    })