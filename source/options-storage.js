import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
	defaults: {
		light_color_1: '#0000ff',
		light_color_fill: '#000000',
		light_color_2: '#ff0000',
		dark_color_1: '#9e8dfc',
		dark_color_fill: '#eeeeee',
		dark_color_2: '#58acff',
	},
	migrations: [
		OptionsSync.migrations.removeUnused,
	],
	logging: true,
});
