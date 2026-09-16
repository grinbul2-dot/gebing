import re
with open('game.js', 'r') as f:
    text = f.read()

replacement = """ targetPosition(i){if(this.type===1){const cx = 350 + (i+1)*(820/(this.options.length+1));const cy = 110 + Math.sin(this.t * 1.5 + i * 3) * 45;const hoverX = Math.cos(this.t * 1.2 + i * 2) * 60;return {x: cx + hoverX, y: cy};}const w=255; const startX=600+(3-this.options.length)*(w/2); return{x:startX+i*w,y:140-(game.index%3)*12};}"""

pattern = r" targetPosition\(i\)\{.*?\}(?=\s*cardPos\(i\))"
text = re.sub(pattern, replacement, text, flags=re.DOTALL)

with open('game.js', 'w') as f:
    f.write(text)
