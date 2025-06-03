console.warn(" Main.js loaded");

import * as server from "@minecraft/server"
import * as ui from "@minecraft/server-ui"

const world = server.world


world.afterEvents.playerBreakBlock.subscribe(e => {
    console.warn("Block destory");
});

// admin command 

world.beforeEvents.chatSend.subscribe((chatmsg) => {
    const player = chatmsg.sender
    const msg = chatmsg.message


    // cek admin bukan
    // if (!player.hasTag("Admin")) {
    //     chatmsg.cancel = true
    //     player.sendMessage("You dont Admin")
    //     return;
    // }

    // admin command

    //spesial abilites admin
    if (msg == "!tes") {
        player.runCommand("function gmc")
    }

    if (msg === "!fly") {
        chatmsg.cancel = true;

        if (player.hasTag("Admin")) {
            const abilities = player.getComponent("minecraft:abilities");

            if (abilities) {
                const canFly = abilities.getBoolean("mayfly");
                abilities.setBoolean("mayfly", !canFly);
                player.sendMessage(`§aFly ${!canFly ? "enabled" : "disabled"}`);
            } else {
                player.sendMessage("§cAbilities component not found. Make sure you enabled GameTest Framework and Beta APIs.");
            }

        } else {
            player.sendMessage("§cOnly Admins can use this command.");
        }
    }

});

// admin menu
world.afterEvents.itemUse.subscribe(e => {
    let player = e.source

    if (e.itemStack.typeId == "minecraft:cookie") {
        if (!player.hasTag("Admin")) return;
        let from1 = new ui.ActionFormData()
            .title("Admin Menu")
            .button("Creative")
            .button("Survival")
            .show(e.source)
        from1.then(ev => {
            let selection = ev.selection
            if (selection == 0) {
                player.runCommand(
                    "gamemode c"
                )
            } else if (selection == 1) {
                player.runCommand(
                    "gamemode s"
                )
            }
        })
    };
});