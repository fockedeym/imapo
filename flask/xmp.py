import os
from PIL import Image
import ast
import xml.etree.ElementTree as etree

def xmp(file):
    img = Image.open(file)
    return img.getxmp()
    # d= file.read()
    # xmp_start = d.find(b'<x:xmpmeta')
    # xmp_end = d.find(b'</x:xmpmeta')
    # xmp_str = d[xmp_start:xmp_end+12]
    # xmp= etree.fromstring(xmp_str)
    # return etree.tostring(xmp, encoding='utf8').decode('utf8')
#xmp(os.path.join(os.getcwd(),'flask',"images",'meta.jpg'))
