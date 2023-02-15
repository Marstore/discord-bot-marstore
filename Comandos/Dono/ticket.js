const Discord = require("discord.js")

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Abra o painel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("Blue")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`**Abra um ticket selecionando o botão abaixo para saber mais dos nossos produtos!
        
        > ⏰ Horário de atendimento:
        > 24/7 
        > Sempre aberto para te ajudar!
        
        **`)
        .setImage(
            "https://media.discordapp.net/attachments/901945232529162250/1070566557375266836/BANNER-2-400X100.png"
          );

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("Selecione aqui o que você deseja ser atendido.")
            .addOptions(
                {
                    label: "Abrir ticket relacionado a COMPRAS",
                    value: "opc1",
                    description: "Selecione este para você abrir um ticket de compras",
                    emoji: "<:az_compra:1038583496060448818>",
                  },
                  {
                    label: "Abrir ticket relacionado a SUPORTE",
                    value: "opc2",
                    description: "Selecione este para você abrir um ticket de suporte",
                    emoji: "<:az_mec:1038583494701502545>",
                  },
                  {
                    label: "Abrir ticket relacionado a PARCERIAS",
                    value: "opc3",
                    description: "Selecione este para você abrir um ticket de parcerias",
                    emoji: "<:az_cara:1038583491564142733>",
                  },
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}