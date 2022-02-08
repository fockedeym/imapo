from PIL import Image
import cv2
import numpy as np
from ast import literal_eval

def filter(file,filter):
    filter=np.array(literal_eval(filter))
    im=Image.open(file)
    img=np.array(im)
    #If the image has a transparency component dont apply the filter on it
    if len(img.shape) > 2:
        if img.shape[2]==4:
            img=img[:,:,:3]

    img=cv2.filter2D(src=img, ddepth=-1, kernel=filter)

    return Image.fromarray(np.asarray(img,np.uint8))
