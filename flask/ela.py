from PIL import Image,ImageChops,ImageEnhance
import os
import cv2
import numpy as np
from io import BytesIO
import matplotlib.pyplot as plt
def ela(file,quality,scale):
    imgOrig = Image.open(file)
    imgOrig = imgOrig.convert('RGB')
    imgIO = BytesIO()
    imgOrig.save(imgIO, 'JPEG', quality=quality)
    imgComp = Image.open(imgIO)



    ela_im = ImageChops.difference(imgOrig, imgComp)

    ela_im = ImageEnhance.Brightness(ela_im).enhance(scale)

    return 	ela_im

def elaRange(file):
    retval=[]
    for i in range(0,101):
        elaIm=np.array(ela(file,i,1))
        val=np.sum(elaIm)
        retval.append(val)
    return 	retval
