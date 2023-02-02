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
        .setColor("Random")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`**Abra um ticket selecionando o botão abaixo para saber mais dos nossos produtos!
        <a:2353arrowrightglow:1029549941288353822>Horário de atendimento:
         Segunda à Sexta: 11h às 23h
         Sábado: 12h às 18h
         Domingo e Feriados: Fechado**`)
        .setImage(
            "https://cdn.discordapp.com/attachments/964165018612539503/1026642615661240330/ezgif.com-gif-maker.gif"
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