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

    if (msg == "!tes") {
        player.runCommand("say testing")
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