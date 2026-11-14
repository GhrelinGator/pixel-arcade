import sys
from PIL import Image
out, crop, names = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = []
for n in names:
    im = Image.open(f'shots/{n}.png'); im = im.crop((0, 0, im.width, min(im.height, crop)))
    ims.append(im.resize((im.width // 2, im.height // 2)))
w = sum(i.width for i in ims) + 12 * (len(ims) - 1); h = max(i.height for i in ims)
o = Image.new('RGB', (w, h), 'white'); x = 0
for i in ims: o.paste(i, (x, 0)); x += i.width + 12
o.save(f'shots/{out}.png')
