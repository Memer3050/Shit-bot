

const { Client, Intents, Message, MessageEmbed, TextChannel, DataResolver, Collection} = require('discord.js');
const { read, } = require('fs');
const fs = require('fs');
const queue = new Map();
const express = require('express');
const { port } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({intents : [Intents.FLAGS.GUILD_MESSAGES , Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS]});
client.slowdown = new Collection();
const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let log = fs.createWriteStream('test.log', {
    flags: 'a'
})

var token = null;


client.once('ready', () => {
    client.user.setStatus('idle');
    client.user.setActivity(":)");
    console.log("Bot started :)")
    log.write("Bot Started :)")
    fs.readFile('token.txt', `utf-8`, (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    token = data;

})
})




try {
    const data = fs.readFileSync('token.txt', 'utf8')
    client.login(data)
  } catch (err) {
    console.error(err)
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function mssleep(a) {
    for (let i = 0; i < seconds; i++) {
        await sleep(i * 1000);
    }
    console.log('Done');
}

let seconds = 3;
const prefix = ',';


// Turn bot off (destroy), then turn it back on
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Restarting..')
    .then(msg => client.destroy())
    .then(() => client.login(token));
}

client.on('message', message => {

    if (message.author.id == "714410484446658570") {
        console.log("lewis detected (cringe)")
        message.delete();
        return;
    }


    process.on('uncaughtException', err => {
        message.channel.send('There was an uncaught error :warning:, Restarting, **Etc 1 - 3 seconds**', err);
        mssleep(1500)
        resetBot(message.channel)
        });

    process.on('TypeError', err => {
        message.channel.send('TypeError **Oh shit**', err);
        mssleep(1500)
        resetBot(message.channel)
    })
        
    let randoshit = ["ratio","l bozo","cringe"]
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let mins = date_ob.getMinutes();
    const content = hours + ":" + mins + " " + 
    message.content + " (" + message.author.username + ")" + " (" + message.channel.name + ")" + `\n`

    log.write(content);

    const id = message.channel.id;
    const att = client.slowdown.get(id)
    const ratio = 3;
    const timeSpace = 5;
    if (att) {
        att.msgCount++;
        const currentTime = Date.now();
        const timePassed = (currentTime - att.time) / 1000;
        let currentid;
        if (att.msgCount >= ratio && att.msgCount / timePassed >= ratio) {
            message.channel.setRateLimitPerUser(5, "stop it")
            message.delete()
            message.channel.send("This is why we cant have nice things")
        }

        if (timePassed >= timeSpace) {
            att.time = currentTime;
            att.msgCount = 0;
        }

    } else {
        client.slowdown.set(id, {
            time: Date.now(),
            msgCount: 1
        });
        message.channel.setRateLimitPerUser(0,"ok")
    }



    if (message.content == "ping"){message.channel.send("pong")}

    if (!message.content.startsWith(prefix)) return;
  
    const args = message.content.trim().split(/ +/g);
    const cmd = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

    if (cmd === "norole") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            const target = message.mentions.users.first();
            let membertarget = message.guild.members.cache.get(target.id);
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}  // 100 LINES LETS GOOOO
            if(target){
                targetrole = message.guild.roles.cache.find(role => role.name === ``)

                
                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                    return;
                }

                membertarget.roles.set([targetrole]);
                message.channel.send(`${membertarget} was norolled`);
            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No Norole for you :)")
        }

    }

    else if (cmd === "kick") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message)
            messager.roles.set([targetrole]);message.channel.send("Shut")
            const target = message.mentions.users.first();
            if(target){

                let membertarget = message.guild.members.cache.get(target.id);
                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                }
                if (message.author.id == "714410484446658570")
                {
                    return;
                }

                membertarget.kick();
                message.channel.send(`${membertarget} was kick`);
            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No kick for you :)")
        }

    }
    else if (cmd === "slowdown") {
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            message.channel.setRateLimitPerUser(args[1], `Admin command by ${message.author.username} with privilage of ${message.author.role}`)
            message.delete();
            message.channel.send(`Rate limit / slowdown has been changed to ${args[1]} by ${message.author.username}`)

        }
        else {
            message.channel.send("stop trying")
        }
    }
    else if (cmd === "nobitches") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            const target = message.mentions.users.first();
            if(target){
                let targetrole = message.guild.roles.cache.find(role => role.name === `Member`)

                let membertarget = message.guild.members.cache.get(target.id);
                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                    return;
                }

                membertarget.roles.set([targetrole]);

                membertarget.timeout(30 * 60 * 1000, 'no bitches :)');
                message.channel.send(`${membertarget} lost all his bitches`);

            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No nobitches for you :)")
        }

    }
    else if (cmd === "kill") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            const target = message.mentions.users.first();
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            if(target){
                let targetrole = message.guild.roles.cache.find(role => role.name === `Member`)

                let membertarget = message.guild.members.cache.get(target.id);
                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                    return;
                }

                membertarget.roles.set([targetrole]);
                membertarget.ban(); // 200 lines convinently on ban
                
                
                target.send("Bruh you ded");
                message.author.send(`You just Banned ${target}`);
                message.channel.send(`${membertarget} is ded`);

            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No kill for you :)")
        }

    }
    else if (cmd === "bulkdel") {
        console.log(message.author.role);
        let args = message.content.substring(prefix.length).split(" ");
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            if (!args[1]) return message.reply('Error please mention second arg');
            if (args[2]) {
            for (var i = 0; i < args[2]; i++){
            message.channel.bulkDelete(args[1]);
            }
            return;
            }
            else {
                message.channel.bulkDelete(args[1]);
                return;
            }
        }
        else {
            message.channel.send("No delete for you ;)")
        }

    }
    else if (cmd === "ban") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            const target = message.mentions.users.first();
            
            if(target){

                let membertarget = message.guild.members.cache.get(target.id);
                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                    return;
                }

                membertarget.ban();
                message.channel.send(`${membertarget} was ban`);
            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No ban for you :)")
        }

    }
    else if (cmd === "timeout") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            const target = message.mentions.users.first();
            if(target){

                let membertarget = message.guild.members.cache.get(target.id);

                if (membertarget == "388815767254204430") {
                    message.channel.send("You bastard");
                    return;
                }

                membertarget.timeout(30000 * 60 * 1000, 'bad');
                message.channel.send(`${membertarget} was timed out`);
            }
            else {
                message.channel.send("Cant find that member!")
            }
        }
        else {
            message.channel.send("No timeout for you :)")
        }

    }
    else if (cmd === "elizabeth") {
        console.log(message.author.role);
            let targetrole = message.guild.roles.cache.find(role => role.name === `Woman`)
            let messager = message.guild.members.cache.get(message.author.id);
            if (message.author.id == "714410484446658570") {messager.roles.set([targetrole]);message.channel.send("Shut"); return}
            else {
                seconds = 3;
                async function lore() {
                    seconds = 3;
                    message.channel.send("I'm sorry to interrupt you, Elizabeth. If you still even remember that name.\n")
                    await mssleep(50000);

                    
                    message.channel.send("But I'm afraid you've been misinformed.\n")
                    await mssleep(50000);

                    
                    
                    message.channel.send("You have all been called here. Into a labyrinth of sounds and smells, misdirection and misfortune.\n");
                    await mssleep(50000);

                    
                    
                    message.channel.send("A labyrinth with no exit. A maze with no prize. You don't even realize that you are trapped. Your lust of blood has driven you in endless circles. Chasing the cries of children in some unseen chamber, always seeming so near.\n");
                    await mssleep(50000);

                    
                    
                    message.channel.send("Yet somehow out of reach.\n");
                    await mssleep(50000);

                    
                    message.channel.send("But, you will never find them. None of you will.\n");
                    await mssleep(50000);

                    
                    message.channel.send("This is where your story ends.\n");
                    await mssleep(50000);
                    
                    message.channel.send("And to you, my brave volunteer, who somehow found this job listing not intended for you. Although, there was a way out planned for you, I have a feeling that's not what you want. I have a feeling that you are right where you want to be.\n");
                    await mssleep(50000);

                    
                    message.channel.send("I am remaining as well. I am nearby.\n");
                    await mssleep(50000);

                    
                    message.channel.send("This place will not be remembered and the memory of everything that started this, can finally begin to fade away. As the agony of every tragedy should.\n");
                    await mssleep(50000);

                    
                    message.channel.send("And to you monsters trapped in the corridors. Be still. And give up your spirits.\n");
                    await mssleep(50000);

                    
                    message.channel.send("They don't belong to you.\n");
                    await mssleep(50000);

                    
                    message.channel.send("As for most of you, I believe there is peace and perhaps, warm, waiting for you after the smoke clears.\n");
                    await mssleep(50000);

                    
                    message.channel.send("Although, for one of you, the darkest pit of Hell has opened to swallow you whole. So, don't keep the Devil waiting, friend.\n");
                    await mssleep(50000);

                    
                    message.channel.send("My daughter, if you can hear me, I knew you would return as well. It's in your nature to protect the innocent. I'm sorry that on that day, the day you were shut out and left to die, no one was there to lift you up in their arms, the way you lifted others into yours.\n");
                    await mssleep(50000);

                    
                    message.channel.send("And then, what became of you, I should have known, you wouldn't be content to disappear. Not my daughter. I couldn't save you then.\n");
                    await mssleep(50000);

                    
                    message.channel.send(`So, let me save you now. It's time to rest, for you, and for those you have carried in your arms...\n`);
                    await mssleep(50000);

                    
                    message.channel.send("This ends.\n");
                    await mssleep(50000);

                    
                    message.channel.send("For all of us.\n");
                    await mssleep(50000);
                    await mssleep(50000);
                    await mssleep(50000);
                    
                    message.channel.send("End communication.\n");
                }
                async function funninewawait() {
                    await lore();
                }
                funninewawait();
            }
    }
    else if (cmd === "lock") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            message.channel.permissionOverwrites.edit(message.channel.guild.roles.everyone, { // 300 lines :)
                SEND_MESSAGES: false
            })
            message.channel.send("Locking Channel")
        }
        else {
            message.channel.send("No lock for you :)")
        }

    }
    else if (cmd === "unlock") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            let target = message.mentions.channels.first()
            target.permissionOverwrites.edit(target.guild.roles.everyone, {
                SEND_MESSAGES: true
            })
            target.send("Unlocked Channel")

        }
        else {
            message.channel.send("No unlock for you :)")
        }

    }
    else if (cmd === "cragg") {  
            message.send("\aa")
        
    }
    else if (cmd === "mute") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod") {
            const target = message.mentions.users.first();
            let targetrole = message.guild.roles.cache.find(role => role.name === `Muted`)
            let membertarget = message.guild.members.cache.get(target.id);
            if(target){
                membertarget.roles.set(targetrole.id);
                message.channel.send(`${target} Got Muted By ${message.author.name}`);
            }
            else {console.error(`Bruh ${target} ${targetrole} ${membertarget} ${message.author.name} `)}
        }
        else {
            message.channel.send("No mute for you :)")
        }
        
    }
    else if (cmd === "h-mod") {
        console.log(message.author.role);
        if (message.author.role = "Head Mod" || "H-mod" || "H-Mod" || message.author.id == "388815767254204430") {
            const target = message.mentions.users.first();
            let membertarget = message.guild.members.cache.get(target.id);
            let targetrole = message.guild.roles.cache.find(role => role.name === `Head Mod`)
            membertarget.roles.set([targetrole]);
        }
        else {
            message.channel.send("No mod for you :)")
        }
        
    }

});


client.on('message', message => {
    console.log(message.content + " (" + message.author.username + ")" + " (" + message.channel.name + ")");
    if (message.channel.name == "test") {
        let id = message.id;
        async function lewischeck() {
            if (message.author.id == "714410484446658570") {
                help();
                seconds = 1;
                fuckingsleep();
                return;
            }
        }
        async function help() {
            await message.channel.send(":warning: **Shut you mfing bitch hoe ass up** :warning:")
        }
        async function fuckingsleep() {
            await mssleep(1000);
            message.delete(id)
        }
        lewischeck();
        if (message.member.roles.cache.some(role => role.name === 'test')) {
            return;
        }
        else {
            help();
            seconds = 1;
            fuckingsleep();
            
        }
        if (message.author.id == "969330083061981195") {
            seconds = 3;
            let id = message.id;
            fuckingsleep();
        }
    }
})

