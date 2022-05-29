/**
 * @name UnitConversion
 * @invite 
 * @authorLink https://github.com/preston-scibek
 * @donate 
 * @website 
 * @source 
 */

function convertLbsToKG(lb) {
  return lb / 2.2046;
}

function convertKgToLbs(kg) {
  return kg * 2.2046;
}

function convertFtToM(ft) {
  return ft / 3.2808;
}

function convertMToFt(m) {
  return m * 3.2808;
}

function convertFToC(f) {
  return (f - 32) / 1.8;
}

function convertCToF(c) {
  return c * 1.8 + 32;
}

function convertMphToKph(mph) {
  return mph * 1.609344;
}

function convertKphToMph(kph) {
  return kph / 1.609344;
}

function convertMilesToKm(miles) {
  return miles * 1.609344;
}

function convertKmToMiles(km) {
  return km / 1.609344;
}

function converter(incomingText) {
  const value = parseFloat(incomingText.split(/[^\d+]/)[0]);
  const unit = incomingText.split(/\d+/)[1];
  let resVal;
  let resUnit;

  if ((value === null || value === undefined || value === NaN)  || (unit === null || unit === undefined)) {

    return incomingText;
  }
  switch (unit.toLowerCase()) {
    case 'kg':
      resVal = convertKgToLbs(value);
      resUnit = 'lb';
      break;
    case 'lb':
      resVal = convertLbsToKG(value);
      resUnit = 'kg';
      break;
    case 'lbs':
      resVal = convertLbsToKG(value);
      resUnit = 'kg';
      break;
    case 'ft':
      resVal = convertFtToM(value);
      resUnit = 'm';
      break;
    case 'm':
      resVal = convertMToFt(value);
      resUnit = 'ft';
      break;
    case 'mph':
      resVal = convertMphToKph(value);
      resUnit = 'kph';
      break;
case 'kph':
      resVal = convertKphToMph(value);
      resUnit = 'mph';
      break;
   case 'miles':
      resVal = convertMilesToKm(value);
      resUnit = 'km';
      break;
   case 'km':
      resVal = convertKmToMiles(value);
      resUnit = 'miles';
      break;
    case 'f':
      resVal = convertFToC(value);
      resUnit = 'c';
      break;
    case 'c':
      resVal = convertCToF(value);
      resUnit = 'f';
      break;
    default:
      return incomingText;
  }
  console.log(`${incomingText} (${resVal}${resUnit})`);
  return `${incomingText} (${resVal}${resUnit})`
}

module.exports = (() =>
{
    const config =
    {
		info:
		{
			name: "UnitConversion",
			authors:
			[
				{
					name: "Generalblood",
					discord_id: "293469015332880386",
					github_username: "preston-scibek",
					twitter_username: "generalblood1"
				}
			],
			version: "0.0.1",
			description: "attempt to add unit conversion to messages with units in it",
			github: "https://github.com/preston-scibek/BDPlugins/blob/main/unitconversion.plugin.js",
			github_raw: "https://raw.githubusercontent.com/preston-scibek/BDPlugins/main/unitconversion.plugin.js"
		},
		changelog:
		[

		]
    };

    return (([Plugin, Api]) => {

		const plugin = (Plugin, Api) =>
		{
			const { DiscordModules, Patcher } = Api;

			return class UnitConversion extends Plugin
			{
				constructor()
				{
					super();
				}
	
				onStart()
				{
					Patcher.after(DiscordModules.MessageActions, "sendMessage", (_, [, message]) =>
					{
						const content = message.content;
						let message_list = content.split(" ");
						message_list = message_list.map(word => converter(word));
						message.content = message_list.join(" ");
						message.content = message.content;


					});
				}
	
				onStop()
				{
					Patcher.unpatchAll();
				}
			}
		};

        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
