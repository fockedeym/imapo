from PIL import Image
import cv2
import numpy as np
from ast import literal_eval

def morpho(file,kernel,operation):
    kernel=np.array(literal_eval(kernel), np.uint8)
    im=np.array(Image.open(file))
    if operation=="erosion":
        imMorph=cv2.erode(src=im,kernel=kernel)
    elif operation=="dilation":
        imMorph=cv2.dilate(src=im,kernel=kernel)
    elif operation=="closing":
        imMorph=cv2.morphologyEx(src=im,kernel=kernel,op=cv2.MORPH_CLOSE)
    elif operation=="opening":
        imMorph=cv2.morphologyEx(src=im,kernel=kernel,op=cv2.MORPH_OPEN)
    else:
        imMorph=im

    return Image.fromarray(np.asarray(imMorph,np.uint8))
