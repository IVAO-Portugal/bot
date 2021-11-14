/**
 * ###############################################################################################
 *  ____                                        _     _____              _             _
 * |  _ \  (_)  ___    ___    ___    _ __    __| |   |_   _| (_)   ___  | | __   ___  | |_   ___
 * | | | | | | / __|  / __|  / _ \  | '__|  / _` |     | |   | |  / __| | |/ /  / _ \ | __| / __|
 * | |_| | | | \__ \ | (__  | (_) | | |    | (_| |     | |   | | | (__  |   <  |  __/ | |_  \__ \
 * |____/  |_| |___/  \___|  \___/  |_|     \__,_|     |_|   |_|  \___| |_|\_\  \___|  \__| |___/
 *
 * ---------------------
 *       Support
 * ---------------------
 *
 * 	> Documentation: https://discordtickets.app
 * 	> Discord support server: https://go.eartharoid.me/discord
 *
 * ###############################################################################################
 */


module.exports = {
	defaults: {
		colour: '#0D2C99',
		log_messages: true,
		name_format: 'ticket-{number}',
		opening_message: 'Olá {name}, obrigado por criares um ticket. Um membro do staff irá brevemente entrar em contacto contigo.\n\n__Todas as mensagens neste canal, são guardadas para futura referência.__'
	},
	developer: { debug: false },
	locale: 'pt',
	logs: {
		enabled: true,
		keep_for: 30,
		split: true
	},
	max_listeners: 10,
	plugins: [],
	presence: {
		duration: 60,
		presences: [
			/*{
				activity: '/new',
				type: 'PLAYING'
			},
			{
				activity: 'with tickets',
				type: 'PLAYING'
			},
			{
				activity: 'tickets',
				type: 'WATCHING'
			}*/
		],
		randomise: true
	},
	super_secret_setting: true,
	update_notice: true
};