from PIL import Image
import cv2
import numpy as np

def resize(file,resizeType,x,y):
    im = Image.open(file)
    img=np.array(im, np.uint8)
    dim = (img.shape[1],img.shape[0])
    if resizeType == "pixel":
        dim = (int(x),int(y))
    elif resizeType == "percent":
        width = int(img.shape[1] * x / 100)
        height = int(img.shape[0] * y / 100)
        dim = (width, height)
    else:
        pass
    img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    return 	Image.fromarray(img)
