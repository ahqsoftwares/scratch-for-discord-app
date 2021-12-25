import * as Blockly from "blockly";
const blockName = "author_ahq_embed";
const ahqcolor = ['#3366ff', '#6600cc', '#33cc00', '#ff6666'];
function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
        return list.splice(x, 1)[0];
    } else {
        return list[x];
    }
}
const blockData = {
    "message0": "Set author %1 image %2 %3 Embed %4",
    "args0": [
        {
            "type": "input_value",
            "name": "Label",
            "check": ["String"]
        },
        {
            "type": "input_value",
            "name": "image",
            "check": ["String"]
        },
        {
            "type": "input_space"
        },
        {
            "type": "input_value",
            "name": "button name",
            "check": "String"
        },
    ],
    "colour":  (listsGetRandomItem(ahqcolor, false)),
    "previousStatement": null,
    "nextStatement": null,
};

Blockly.Blocks[blockName] = {
    init: function() {
        this.jsonInit(blockData);
    }
};
Blockly.JavaScript[blockName] = function(block) {
    let extra = "";
    const name = (Blockly.JavaScript.valueToCode(block, "button name", Blockly.JavaScript.ORDER_NONE) || "embed");
    const finaln = name.replace("'", "").replace("'", "");
    const statementsThen = Blockly.JavaScript.valueToCode(block, "Label", Blockly.JavaScript.ORDER_NONE);
    const ahq = Blockly.JavaScript.valueToCode(block, "image", Blockly.JavaScript.ORDER_NONE) || null;
    if (ahq !== null) {
        extra = `, ${ahq}`
    }
    const code = `${finaln}.setAuthor(${statementsThen}${extra});`;
    return code;
};