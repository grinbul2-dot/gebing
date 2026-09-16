import re
with open('game.js', 'r') as f:
    text = f.read()

replacement = "targetPosition(i){if(this.type===1){const cx=350+(i+1)*(820/(this.options.length+1));const cy=110+Math.sin(this.t*1.5+i*3)*45;const hoverX=Math.cos(this.t*1.2+i*2)*60;return {x:cx+hoverX, y:cy};}const w=255; const startX=600+(3-this.options.length)*(w/2); return{x:startX+i*w,y:140-(game.index%3)*12};}"

# Because the regex earlier was matching something else or failing, let's just find "targetPosition(i){" and replace the block manually.
start = text.find("targetPosition(i){")
if start != -1:
    end = text.find("cardPos(i){", start)
    if end != -1:
        text = text[:start] + replacement + "\n " + text[end:]

with open('game.js', 'w') as f:
    f.write(text)
