const data = JSON.parse(require('fs').readFileSync('data.json', 'utf8')).beequips;
// format:
/*
    {
      "name": "",
      "type": "",
      "buffs": "",
      "debuffs": "",
      "ability": "",
      "bonuses": ""
    },
 */
// instructions: split buffs, debuffs, ability, bonuses by comma. remove type
// some fields might not exist, so check for that.

const beequips = data.map((beequip) => {
    const { name, type, buffs, debuffs, ability, bonuses } = beequip;
    return {
        name,
        buffs: buffs ? buffs.split(',').map((buff) => buff.trim()) : [],
        debuffs: debuffs ? debuffs.split(',').map((debuff) => debuff.trim()) : [],
        ability: ability ? ability.split(',').map((ability) => ability.trim()) : [],
        bonuses: bonuses ? bonuses.split(',').map((bonus) => bonus.trim()) : [],
    };
});

/* format:
    {
      "name": "",
        "buffs": [],
        "debuffs": [],
        "ability": [],
        "bonuses": []
      "image": ""
    },
 */
const finalBeequipData = {};

beequips.forEach((beequip) => {
    const imagePath = `assets/beequips/${beequip.name}.png`;
    if (!require('fs').existsSync(__dirname + '/../../../public/' + imagePath)) {
        console.log(`Missing image for ${beequip.name}`);
        return;
    }
    finalBeequipData[beequip.name] = {
        buffs: beequip.buffs,
        debuffs: beequip.debuffs,
        ability: beequip.ability,
        bonuses: beequip.bonuses,
        image: imagePath
    };
})

require('fs').writeFileSync('finalBeequipData.json', JSON.stringify(finalBeequipData, null, 2));
