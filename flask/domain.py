from PIL import Image
import os
import io
import cv2
import numpy as np
import matplotlib.pyplot as plt

def domain(file):
    im = Image.open(file)
    img=np.array(im, np.uint8)
    if(len(img.shape)==2):
        img=np.stack((img,)*3, axis=-1)
    print(img.shape)
    imgr=np.zeros(img.shape, np.uint8)
    imgg=np.zeros(img.shape, np.uint8)
    imgb=np.zeros(img.shape, np.uint8)

    imgr[:,:,0]=img[:,:,0]
    imgg[:,:,1]=img[:,:,1]
    imgb[:,:,2]=img[:,:,2]
    if(img.shape[2]==4):
        imgr[:,:,3]=img[:,:,3]
        imgg[:,:,3]=img[:,:,3]
        imgb[:,:,3]=img[:,:,3]


    imghsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)
    imgh = getImageWithColormap(imghsv[:,:,0],"hsv")
    imgs = getImageWithColormap(imghsv[:,:,1],"gray")
    imgValue = getImageWithColormap(imghsv[:,:,2],"gray")

    imgyuv = cv2.cvtColor(img, cv2.COLOR_RGB2YUV)

    imgy = getImageWithColormap(imgyuv[:,:,0],"gray")
    imgu = getImageWithColormap(imgyuv[:,:,1],"Blues")
    imgv = getImageWithColormap(imgyuv[:,:,2],"Reds")





    return 	(Image.fromarray(imgr),Image.fromarray(imgg),Image.fromarray(imgb), \
    imgh,imgs,imgValue, \
    imgy,imgu,imgv)

def getImageWithColormap(img, cmap):
    plt.figure()
    plt.set_cmap(cmap)
    img_plt=plt.imshow(img)
    plt.colorbar(img_plt,orientation='horizontal')
    plt.axis('off')
    img_buf = io.BytesIO()
    plt.savefig(img_buf, format='png')
    im = Image.open(img_buf)
    return im

#domain(os.path.join(os.getcwd(),'flask','images','ronaldo.png'))
