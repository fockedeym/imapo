from PIL import Image

def xmp(file):
    img = Image.open(file)
    return img.getxmp()
