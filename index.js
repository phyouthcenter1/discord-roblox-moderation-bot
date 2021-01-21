const discord = require('discord.js');
const roblox = require('roblox-js');
const snekfetch = require('snekfetch');
const noblox = require("noblox.js");
const fs = require('then-fs');
const express = require('express');
const app = express();
var cookie = ("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_7BF2339B72A08AD8AB736C94CD162B7BB392B02C71C9CC9CA446893A6A33E84C753F20E093354D2C2B37D54573D78137221FB0DBD1F1541B43A37EDF5C3EE4697DBD1D2F4BA839AE3D8A6DF24F91E850D1399AD187CCE20E3E9A4B01FFEE051CF268ABFE57CF9A78F6C46BB539D42306CC8EB280C4CAB93B37E3861241D58FC00EB044242B3A478297F99212768FE3463DD1338B8D77E41C917A1D9DBFB6BA63F9AB580D3C7DB23E583DAD7D74BD1E7A84CF7045D42017587ADFB9661CDEA8EAAB8021254FE0E00DB3576873EF89061DF6E5B3893EF16C59B7FA8E61C64E5652BE525D08F2629F4FA8D0B1C01CB87343EAABF92B007828681EE4A5B7F006393BDBFD2F3133E0564BA004A7A7076EAFDE11E3140E9C229FA1659C8A981D8BFC8F6D2DDCB6559A7C3199D8A900D8C099C9ADD9CAC3");
noblox.setCookie(cookie)
const client = new discord.Client();
const bottoken = "Nzk2MTU4ODU0NzkwNTEyNjcx.X_T2tg.07fkF4gRKj-e2QtulVhfSyr5of8"
client.login(bottoken)
const { Client, MessageEmbed } = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const nodemon = require('nodemon');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: false, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [668190963696402433], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});

const commandList = [];

var normprefix = '-'
var rprefix = ';';
var groupId = 2750654;
var maximumRank = 20;

client.embedMaker = function embedMaker(author, title, description) {
    let embed = new Discord.MessageEmbed();
    embed.setColor(process.env.embedColor);
    embed.setAuthor(author.tag, author.displayAvatarURL());
    embed.setTitle(title);
    embed.setDescription(description);
    return embed;
}

function isCommand(command, message){
	var command = command.toLowerCase()
	var content = message.content.toLowerCase()
	return content.startsWith(normprefix + command)
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be execited in servers!\nThis is to prevent abuse!')
		} else{
			if(message.member.roles.cache.has('792140822626828352')){
				var username = args[1]
				if (username){
					message.channel.send(`Checking ROBLOX for ${username}.`)
					noblox.getIdFromUsername(username)
					.then(function(id){
						noblox.getUsernameFromId(id)
						noblox.getRankNameInGroup(8774409, id)
						.then(function(rank){
								message.channel.send(`${username} is rank ${rank}.`)
								noblox.promote(8774409, id)
								message.author.send(`:green_square: You promoted ${username} in PAD. :green_square:`)
								.then(function(roles){
									message.channel.send(`:green_square: Promoted ${username}! :green_square:`)
									console.log(`${username} has been promoted.`)
								}).catch(function(err){
									message.channel.send(":green_square: Failed to promote. :green_square:")
								});
						}).catch(function(err){
							message.channel.send("Couldn't get him/her in the group.")
						});
					}).catch(function(err){ 
						message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
					});
				} else {
					message.channel.send("Please enter a username.")
				}
				return;
			} else {
				message.channel.send('You do not have permission to use this command!')
			}
		}
    }
});

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Fire', message)){
		var member = message.member
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be execited in servers!\nThis is to prevent abuse!')
		} else{
			if(message.member.roles.cache.has('792140822626828352')){
				var username = args[1]
			if (username){
				message.channel.send(`Checking ROBLOX for ${username}.`)
				noblox.getIdFromUsername(username)
				.then(function(id){
					noblox.getUsernameFromId(id)
					noblox.getRankNameInGroup(8774409, id)
					.then(function(rank){
							message.channel.send(`${username} is rank ${rank}.`)
							noblox.setRank(8774409, id, 1)
							message.author.send(`:fire: You fired ${username} in PAD. :fire:`)
							.then(function(roles){
								message.channel.send(`:fire: Fired ${username}! :fire:`)
								console.log(`${username} has been fired.`)
							}).catch(function(err){
								message.channel.send("Failed to fire.")
							});
					}).catch(function(err){
						message.channel.send("Couldn't get him/her in the group.")
					});
				}).catch(function(err){ 
					message.channel.send(`:fire: Sorry, but ${username} doesn't exist on ROBLOX. :fire:`)
				});
			} else {
				message.channel.send("Please enter a username.")
			}
			return;
			} else {
				message.channel.send('You do not have permission to use this command!')
			}
		}
	}
});

client.on('message', (message) => {
	if (message.author.bot) return;
	var args = message.content.split(/[ ]+/)
	var member = message.member
    
    if(isCommand('Shout', message)){
		var shout = args[1]
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be execited in servers!\nThis is to prevent abuse!')
		} else{
			if(message.member.roles.cache.has('792140822626828352')){
				noblox.shout(8774409, shout)
				console.log(`'${shout}' has been set as the shout`)
			}
		}
    }
});

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
	var args = message.content.split(/[ ]+/)
	var member = message.member
    
    if(isCommand('Demote', message)){
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be execited in servers!\nThis is to prevent abuse!')
		} else{
			if(message.member.roles.cache.has('792140822626828352')){
				var username = args[1]
			if (username){
				message.channel.send(`Checking ROBLOX for ${username}.`)
				noblox.getIdFromUsername(username)
				.then(function(id){
					noblox.getUsernameFromId(id)
					noblox.getRankNameInGroup(8774409, id)
					.then(function(rank){
							message.channel.send(`${username} is rank ${rank}.`)
							noblox.demote(8774409, id)
							message.author.send(`:red_square: You demoted ${username} in PAD. :red_square:`)
							.then(function(roles){
								message.channel.send(`:red_square: Demoted ${username}. :red_square:`)
								console.log(`${username} has been demoted.`)
							}).catch(function(err){
								message.channel.send("Failed to demote.")
							});
					}).catch(function(err){
						message.channel.send("Couldn't get him/her in the group.")
					});
				}).catch(function(err){ 
					message.channel.send(`:red_square: Sorry, but ${username} doesn't exist on ROBLOX. :red_square:`)
				});
			} else {
				message.channel.send("Please enter a username.")
			}
			return;
			} else {
				message.channel.send('You do not have permission to use this command!')
			}
		}
    }
});

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
	var args = message.content.split(/[ ]+/)
	var member = message.member
    
    if(isCommand('Exile', message)){
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be execited in servers!\nThis is to prevent abuse!')
		} else{
			if(message.member.roles.cache.has('792140822626828352')){
				var username = args[1]
			if (username){
				message.channel.send(`Checking ROBLOX for ${username}.`)
				noblox.getIdFromUsername(username)
				.then(function(id){
					noblox.getUsernameFromId(id)
					noblox.getRankNameInGroup(8774409, id)
					.then(function(rank){
							message.channel.send(`${username} has the rank of ${rank}.`)
							noblox.exile(8774409, id)
							message.author.send(`You exiled ${username} in PAD.`)
							.then(function(roles){
								message.channel.send(`Exiled ${username}!`)
								console.log(`${username} has been exiled.`)
							}).catch(function(err){
								message.channel.send("Failed to exile.")
							});
					}).catch(function(err){
						message.channel.send("Couldn't get him/her in the group.")
					});
				}).catch(function(err){ 
					message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
				});
			} else {
				message.channel.send("Please enter a username.")
			}
			return;
			} else {
				message.channel.send('You do not have permission to use this command!')
			}
		}
    }
});

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    
    if(isCommand('help', message)){
		const embed = new MessageEmbed()
		.setTitle('Police Army Department Ranking Commands')
      	.setColor('RANDOM')
	  	.addFields(
			{name: 'Help', value: 'Shows this list of commands.'},
			{name: 'Rules', value: 'Shows all rules, game and discord.'},
			{name: 'Status', value: "Changes the bot's status."},
			{name: 'Training', value: 'Starts a training.'},
			{name: 'Promote', value: 'Promotes a user in the group.'},
			{name: 'Shout', value: 'Sets the group shout.'},
			{name: 'Demote', value: 'Demoted a user in the group'},
			{name: 'Fire', value: "Sets a user's rank to cadet."},
			{name: 'Exile', value: 'Exiles a user from the PAD group.'}
		  )
		.setFooter(`Prefix: ${prefix}`)
	message.author.send(embed);
    message.channel.send(`You have mail, ${message.author}!`)
    }
});

client.on('message', msg => {
    let wordArrary = msg.content.toLowerCase().split(" ");
	const target = msg.author;
	const member = msg.member;
    let filterWords = ["fuck", "f4ck", "cock", "c0ck", "shit", "bitch", "b1tch", "pussy", "ass", "sex", "cum", "bastard", "arse", "asshole", "bollocks", "brotherfucker", "bugger", "bullshit", "child-fucker", "Christ on a bike", "Christ on a cracker", "crap", "cunt", "damn", "eefing", "fatherfucker", "frigger", "goddamn", "godsdamn", "hell", "holyshit", "horseshit", "porn", "porm", "Jesus fuck", "Jesus wept", "motherfucker", "nigga", "prick", "shitass", "sisterfucker", "slut", "son of a bitch", "son of a whore", "twat", "fu", "fuc", "fuk"];
  
    for(var i = 0; i < filterWords.length; i++) {
      if(wordArrary.includes(filterWords[i])) {
        if(!msg.author.bot){
			if (msg.channel.type === 'dm') {
				return
			} else if(!member.hasPermission('MANAGE_MESSAGES')) {
				const memberTarget = msg.guild.members.cache.get(target.id);
				msg.delete();
				memberTarget.kick();
				msg.channel.send(`${msg.author} has been kicked from using bad words!`);
			}
        }
      }
    }
});

client.on('message', message =>{
    if(isCommand('rules', message)){
        const discordRules = new discord.MessageEmbed()
        .setColor('#15FB00')
        .setTitle('Police Army Department Discord Server Rules')
        .addFields(
            {name: 'Rule 1', value: '1. You are required to have your Roblox username as your server nickname at all times. If you somehow manage to change your nickname after verifying yourself, your verified role will be removed and you will have to verify again.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 2', value: '2. Swearing is not permitted in this server. Violation of this rule will lead to an immediate kick.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 3', value: '3. You are required to treat all server members with respect. Discrimination against race, gender, appearance, or sexual orientation is not tolerated.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 4', value: '4. Spamming is strictly prohibited on this server.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 5', value: '5. Try not to cause any drama or arguments.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 6', value: '6. Posting any type of inappropriate messages or images is not allowed on this server.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 7', value: '7. Threatening or sending harmful messages on this server is not tolerated. Content that is purely designed to be provocative will not be tolerated.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 8', value: '8. Please include evidence in your reports, it will not be accepted without evidence.\n--------------------------------------------------------------------------------------------'},
			{name: 'Rule 9', value: '9. Follow Discord ToS at all times.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 10', value: '10. Everyone is welcome, disobeying this rule will lead to a warning.\n--------------------------------------------------------------------------------------------'}

        )
		.setFooter('<#792140822979936279>')
		
		const gameRules = new discord.MessageEmbed()
        .setColor('#15FB00')
        .setTitle('Police Army Department Game Rules')
        .addFields(
            {name: 'Rule 1', value: '1. No exploiting.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 2', value: '2. Be kind.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 3', value: '3. No trolling.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 4', value: '4. Try to roleplay.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 5', value: "5. Don't spam.\n--------------------------------------------------------------------------------------------"},
            {name: 'Rule 6', value: '6. Listen to higher ranks unless what they are telling you to do is unfair or goes angaint any rules.\n--------------------------------------------------------------------------------------------'},
            {name: 'Rule 7', value: '7. Always follow these rules.\n--------------------------------------------------------------------------------------------'},

        )        
		message.author.send(discordRules);
		message.author.send(gameRules);
		message.channel.send(`You have mail, ${message.author}! \n If rules were not sent to you, it might be because your DMs are off.`);
    }
})


client.on('message', message =>{
	if(isCommand('status', message)){
		var args = message.content.split(/[ ]+/)
		const status = args[1]
		if(message.member.permissions.has('ADMINISTRATOR') || message.member.id == '668190963696402433'){
			if(args[1]){
				client.user.setActivity(status)
				message.channel.send(`The bot's status has been sucesfully set to: **${status}**!`)
				console.log(`The bot's status has been sucesfully set to: **${status}**!`)
			} else{
				message.channel.send(`${message.author}, please provide a status to set!`)
			}
		} else{
			message.channel.send(`${message.author}, you don't have permission to run this command!`)
		}
	}
})

client.on('message', message =>{
    if(isCommand('info', message)){
        const info = new discord.MessageEmbed()
        .setColor('#15FB00')
        .setTitle('Police Army Department Info')
        .addFields(
			{name: 'Group link', value: 'https://www.roblox.com/groups/8774409/PAD-Police-Army-Department#!/about\n--------------------------------------------------------------------------------------------'},
			{name: 'Main Game Link', value: 'https://www.roblox.com/games/6143277993/The-Oragon-Frontier\n--------------------------------------------------------------------------------------------'},
			{name: 'Training Center Link', value: 'https://www.roblox.com/games/6143528645/Training-Center\n--------------------------------------------------------------------------------------------'},
			{name: 'Inspections Game Link', value: 'https://www.roblox.com/games/6150051089/Inspections\n--------------------------------------------------------------------------------------------'},
            {name: 'Founder', value: 'Scribownauts, the best person ever. c:\n--------------------------------------------------------------------------------------------'},
            {name: 'Founded On', value: 'I have no idea, I hate history.\n--------------------------------------------------------------------------------------------'}

        )
		.setFooter('XD')
		
		message.author.send(info);
		message.channel.send(`You have mail, ${message.author}! \n If the info was not sent to you it, it might be because your DMs are off.`);
    }
})

client.on('message', message =>{
	if(isCommand('training', message)){
		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be executed in servers!')
		} else{
			if(message.member.roles.cache.has('792140822626828349')){
				const channel = client.channels.cache.find(channel => channel.id = "792140823491379221");
				channel.send(`**__A training is starting hosted by ${message.author}! \n \n **__Training INFO__** \n\nHost: ${message.author}\n\nLink:https://www.roblox.com/games/6143528645/Training-Center\n\nPTS will be active. To request PTS type :pts request.\n\n\n<@797554589947789368>`)
				noblox.shout(8774409, `A training is starting hosted by ${message.author}! Head on down to the training center for a chance of a promotion!`)
				message.channel.send(`${message.author}, your training has sucesfully been announced!`)
				message.author.send(`${message.author}, your training has been succesfully announced. \n\nGuide: https://docs.google.com/document/d/1N23aI5atPDPRR3muwxsKnPIuae4Pz34TWiuC9w2Mld8/edit?usp=sharing`)
			} else{
				message.channel.send(`${message.author}, you don't have permission to run this command! You must be an officer!`)
			}
		}
	}
})

client.on('message', message =>{
	if(isCommand('prefix', message)){
		var allGuilds = client.guilds;
		var args = message.content.split(/[ ]+/)
		var newprefix = args[1]
		if(message.member.permissions.has('ADMINISTRATOR') || message.member.id == '668190963696402433'){
			if(args[1]){
				if(args[1] == '!' || args[1] == 'o!' || args[1] == '?'){
					message.channel.send(`You can not make the prefix **${newprefix}**, ${message.author} as another bot is using this prefix!`)
				} else{
					normprefix = newprefix
					message.channel.send(`The bot's prefix has been sucesfully set to: **${newprefix}**!\nIf the bot shuts down the prefix will be reset back to **-**.`)
				}
			} else{
				message.channel.send(`${message.author}, please provide a prefix to set!`)
			}
		} else{
			message.channel.send(`${message.author}, you don't have permission to run this command!`)
		}
	}
})

client.on('message', message =>{
	if(isCommand('kick', message)){
		const target = message.mentions.members.first()
		var args = message.content.split(/[ ]+/)
		var reason = args[2]

		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be executed in servers!')
		} else{
			if(message.member.permissions.has('KICK_MEMBERS') || message.member.id == '668190963696402433'){
				if(target){
					if(args[2]){
						if(target.kickable){
							target.kick(`Kick reason: ${reason}`)
							message.channel.send(`${message.author}, you have sucesfully kicked ${target}.`)
						}
					} else{
						message.channel.send(`${message.author}, please enter a kick reason!`)
					}
				} else{
					message.channel.send(`${message.author}, please enter a valid user to kick!`)
				}
			} else{
				message.channel.send(`${message.author}, you don't have permission to run this command!`)
			}
		}
	}
})

client.on('message', message =>{
	if(isCommand('ban', message)){
		const target = message.mentions.members.first()
		var args = message.content.split(/[ ]+/)
		var reason = args[2]

		if(message.channel.type == 'dm'){
			message.channel.send('This command can only be executed in servers!')
		} else{
			if(message.member.permissions.has('BAN_MEMBERS') || message.member.id == '668190963696402433'){
				if(target){
					if(args[2]){
						if(target.bannable){
							target.ban()
							message.channel.send(`${message.author}, you have sucesfully banned ${target}.`)
						}
					} else{
						message.channel.send(`${message.author}, please enter a ban reason!`)
					}
				} else{
					message.channel.send(`${message.author}, please enter a valid user to ban!`)
				}
			} else{
				message.channel.send(`${message.author}, you don't have permission to run this command!`)
			}
		}
	}
})

app.get('/', async (request, response) => {
     response.sendStatus(200);
});

app.get(`/get-request`, async (request, response) => {
    response.status(200).send(client.request);
});

app.post(`/verify-request`, async (request, response) => {
    let commandRequest = client.request;
    if(commandRequest === "No request") return response.sendStatus(200);
    let successStatus = request.headers.success;
    let message = request.headers.message;

    let channel = client.channels.cache.get(commandRequest.channelID);
    if(!channel) {
        return response.sendStatus(200);
    }

    if(successStatus == "true") {
        if("moderator" in request.headers) {
            channel.send(`<@${commandRequest.authorID}>`);
            let embed = client.embedMaker(client.users.cache.get(commandRequest.authorID), "Success", message)
            embed.addField("Ban Information", `**Moderator**: ${request.headers.moderator}\n**Reason**: ${request.headers.reason}`);
            channel.send(embed);
        } else {
            channel.send(`<@${commandRequest.authorID}>`);
            channel.send(client.embedMaker(client.users.cache.get(commandRequest.authorID), "Success", message));
        }
    } else {
        channel.send(`<@${commandRequest.authorID}>`);
        channel.send(client.embedMaker(client.users.cache.get(commandRequest.authorID), "Failure", message));
    }

    client.request = "No request";

    return response.sendStatus(200);
});

let listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is currently listening on port: ${listener.address().port}`);
});

async function readCommandFiles() {
    let files = await fs.readdir(`./commands`);

    for(var i = 0; i < files.length; i++) {
        let file = files[i];
        if(!file.endsWith(".js")) throw new Error(`Invalid file detected in commands folder, please remove this file for the bot to work: ${file}`);
        let coreFile = require(`./commands/${file}`);
        commandList.push({
            file: coreFile,
            name: file.split('.')[0]
        });
    }
}

client.on('ready', async() => {
    console.log(`Logged into the Discord account - ${client.user.tag}`);
    await readCommandFiles();
    client.request = "No request";
    client.commandList = commandList;
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.startsWith(rprefix)) return;
    const args = message.content.slice(rprefix.length).split(" ");
    let command = args.shift().toLowerCase();
    let index = commandList.findIndex(cmd => cmd.name === command);
    if (index == -1) return;
    commandList[index].file.run(message, client, args);
});
