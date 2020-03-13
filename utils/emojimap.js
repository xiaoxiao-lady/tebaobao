// let emojiBaseUrl = `http://yx-web.nosdn.127.net/webdoc/h5/emoji`
let emojiBaseUrl = `../../static/images/img/face`
const iconEmojiDelete = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAk1BMVEUAAADAwMC3t7e/v7/Gxsa/v7+/v7/AwMC/v7+/v7+/v7++vr7CwsK/v7+/v7+/v7++vr6/v7+/v7+/v7+/v7+/v7/AwMCbm5u/v7+/v7+/v7+/v7/AwMC/v7+/v7+/v7+/v7+/v7+/v7++vr7AwMC9vb2/v7+/v7/CwsLAwMDHx8fExMTIyMjLy8vJycnKysrPz8+3r5/kAAAAKHRSTlMA8Q39A/vcIwf34B0P1uNJIuzPjHFqFwVFmls4J761rMiFoVJ6XTNYKpTiKQAAAylJREFUeF7tmEl3ozAQhNt0ywYM3rfETuJMltEC2P//1w3IVg555olmHjfVlcMnAVUtFfgVFBQUFBQUFBREXAAR8BVnEUNZzF8YwTYdsZQ/Pcc8CsGmNEpyZMoqn/MYzxoFomIIhTDFujtjD3OlEFEyVENqzHUN1HUfx0QiKjliKJEVIorioxuF4LQ0AkW53mddf7Asmh5eNaLQeUfGLtUN4w8wtbaULlshiFZVw3gF7g8Jr4UQ5ZMfQkAvl5pRnWO+teYGhT53YMBbWTP0OAMCrqaJQjmLwKunhmGWkx4MiEZSyZEPQvDeMGRy7MOAbCTRCyHYFqqx+Rxi6KHIC7FhYrCW/gKCQSAuTBRWGwaDCSE4CmmNDtRhJhFxIS5M2o1uweQZmw7iC5N2o58O9EMhyDabjAdxYdJudIINytXiTiGY5tfrKuJBXJjo8a6FsUiMuIynQDfGuEqScgvEgLgwaTU6wVEJFEVDsYxCoOBBXJjI5LvdIOeyoaRTiGGaNowqZ7wuFybYYnT3vlJ928t9H3o2AeoOIdhUHqNbykzb9R/y6jfDDyH40g3jYo3uo6CUEh2jM4TgYE8mv4z+kJIWeFORToDn+FUhEI1/ohNMxtIy5NgyGJBspBDlMvKnYtzMV1SIxo6CYXeiZG69P8g3mbhvIqrGlQyIG1Xi8ukobYzb32UkOu93hrihi6i3QB5G48aD9aKl8B2vlPyAvYehZyc4WZqjMLMLFR5aKdHN5+kC4nvClGcA4Kdwe0ISbMs7g35yTB6B+swTs1wAtUCSpLBZcnt3lTBJTew1GXX+eGrVj69X5/OGkhu5Aeo54y+rGOjh489Py3drmn//z2nlBR5TPKcV5rnr7SEF9nvGuct3HW2uMVzxz8KifAcaDOICRhVboMEg7kiB5m/f+4nyQ34CRtmAGWAnLmD637V2I2Vn7I+8AXPiF0sHiWjyGDrf43W663WPv7wBdW8kqlXUp5Eonn9BfAGTRYxuZX7vVmJGSyQQTcJpiUxLS+QJGKW4fRfavovX3Clmc6f1mtlBXuSQHaSjLAdoU4fvhYdvuIOCgoKCgoL+AXU1fW2kbFGNAAAAAElFTkSuQmCC'
let albumArr = []
let emojiList = {
  "emoji": {
    "face[微笑]": { file: "0.gif" },
    "face[嘻嘻]": { file: "1.gif" },
    "face[哈哈]": { file: "2.gif" },
    "face[可爱]": { file: "3.gif" },
    "face[可怜]": { file: "4.gif" },
    "face[挖鼻]": { file: "5.gif" },
    "face[吃惊]": { file: "6.gif" },
    "face[害羞]": { file: "7.gif" },
    "face[挤眼]": { file: "8.gif" },
    "face[闭嘴]": { file: "9.gif" },
    "face[鄙视]": { file: "10.gif" },
    "face[爱你]": { file: "11.gif" },
    "face[泪]": { file: "12.gif" },
    "face[偷笑]": { file: "13.gif" },
    "face[亲亲]": { file: "14.gif" },
    "face[生病]": { file: "15.gif" },
    "face[太开心]": { file: "16.gif" },
    "face[白眼]": { file: "17.gif" },
    "face[右哼哼]": { file: "18.gif" },
    "face[左哼哼]": { file: "19.gif" },
    "face[嘘]": { file: "20.gif" },
    "face[衰]": { file: "21.gif" },
    "face[委屈]": { file: "22.gif" },
    "face[吐]": { file: "23.gif" },
    "face[哈欠]": { file: "24.gif" },
    "face[抱抱]": { file: "25.gif" },
    "face[怒]": { file: "26.gif" },
    "face[疑问]": { file: "27.gif" },
    "face[馋嘴]": { file: "28.gif" },
    "face[拜拜]": { file: "29.gif" },
    "face[思考]": { file: "30.gif" },
    "face[汗]": { file: "31.gif" },
    "face[困]": { file: "32.gif" },
    "face[睡]": { file: "33.gif" },
    "face[钱]": { file: "34.gif" },
    "face[失望]": { file: "35.gif" },
    "face[酷]": { file: "36.gif" },
    "face[色]": { file: "37.gif" },
    "face[哼]": { file: "38.gif" },
    "face[鼓掌]": { file: "39.gif" },
    "face[晕]": { file: "40.gif" },
    "face[悲伤]": { file: "41.gif" },
    "face[抓狂]": { file: "42.gif" },
    "face[黑线]": { file: "43.gif" },
    "face[阴险]": { file: "44.gif" },
    "face[怒骂]": { file: "45.gif" },
    "face[互粉]": { file: "46.gif" },
    "face[心]": { file: "47.gif" },
    "face[伤心]": { file: "48.gif" },
    "face[猪头]": { file: "49.gif" },
    "face[熊猫]": { file: "50.gif" },
    "face[兔子]": { file: "51.gif" },
    "face[ok]": { file: "52.gif" },
    "face[耶]": { file: "53.gif" },
    "face[good]": { file: "54.gif" },
    "face[NO]": { file: "55.gif" },
    "face[赞]": { file: "56.gif" },
    "face[来]": { file: "57.gif" },
    "face[弱]": { file: "58.gif" },
    "face[草泥马]": { file: "59.gif" },
    "face[神马]": { file: "60.gif" },
    "face[囧]": { file: "61.gif" },
    "face[浮云]": { file: "62.gif" },
    "face[给力]": { file: "63.gif" },
    "face[围观]": { file: "64.gif" },
    "face[威武]": { file: "65.gif" },
    "face[奥特曼]": { file: "66.gif" },
    "face[礼物]": { file: "67.gif" },
    "face[钟]": { file: "68.gif" },
    "face[话筒]": { file: "69.gif" },
    "face[蜡烛]": { file: "70.gif" },
    "face[蛋糕]": { file: "71.gif" }
  }
}

for (let emoji in emojiList) {
  let emojiItem = emojiList[emoji]
  for (let key in emojiItem) {
    let item = emojiItem[key]
    // item.img = `${emojiBaseUrl}/${emoji}/${item.file}`
    item.img = `${emojiBaseUrl}/${item.file}`
  }
}

emojiList['ajmd'] = {}
emojiList['xxy'] = {}
emojiList['lt'] = {}

for (let i = 1; i <= 48; i++) {
  let key = 'ajmd0' + (i >= 10 ? i : '0' + i)
  emojiList['ajmd'][key] = { file: key + '.png' }
}
for (let i = 1; i <= 40; i++) {
  let key = 'xxy0' + (i >= 10 ? i : '0' + i)
  emojiList['xxy'][key] = { file: key + '.png' }
}
for (let i = 1; i <= 20; i++) {
  let key = 'lt0' + (i >= 10 ? i : '0' + i)
  emojiList['lt'][key] = { file: key + '.png' }
}

// 内容
for (let emoji in emojiList) {
  let emojiItem = emojiList[emoji]
  for (let key in emojiItem) {
    let item = emojiItem[key]
    item.img = `${emojiBaseUrl}/${emoji}/${item.file}`
  }
  // 封面
  albumArr.push({
    album: emoji,
    img: emojiItem[Object.keys(emojiItem)[0]]['img']
  })
}
// 添加删除按钮
emojiList['emoji']['[删除]'] = {}
emojiList['emoji']['[删除]']['img'] = iconEmojiDelete

export default {
  emojiList,
  albumArr
}