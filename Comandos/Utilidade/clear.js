const wait = require("timers/promises").setTimeout;
const { EmbedBuilder, ApplicationCommandOptionType, } = require("discord.js");

module.exports = {
    name: "clear",
    description: "[🔒] Apaga mensagens no chat.",
    options: [
        {
            name: "quantidade",
            description: "Informe a quantidade de mensagens que deseja apagar.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "usuario",
            description: "Selecione o usuário pelo qual deseja apagar as mensagens.",
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        let amount = interaction.options.getInteger("quantidade");
        let User = interaction.options.getUser("usuario");
        let Response = new EmbedBuilder().setColor('Green');

        const Messages = await interaction.channel.messages.fetch();

        if (amount > 100 || amount < 1) return interaction.reply({ content: `**Informe um valor entre 1 e 100!**`, ephemeral: true })

        if (User) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === User.id && amount > i) {
                    filtered.push(m);
                    i++;
                }
            });
            interaction.channel.bulkDelete(filtered, true).then(async (messages) => {
                Response.setDescription(
                    `**🪄 | Deletando __${messages.size}__ mensagens de ${User.tag}**.`
                );
                interaction.reply({
                    embeds: [Response],
                });
                await wait(5000);
                interaction.deleteReply();
            });
        } else {
            interaction.channel.bulkDelete(amount, true).then(async (messages) => {
                Response.setDescription(
                    `**🪄 | Deletando __${messages.size}__ mensagens.**`
                );
                interaction.reply({
                    embeds: [Response],
                });
                await wait(5000);
                interaction.deleteReply();
            });
        }
    },
};