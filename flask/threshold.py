from PIL import Image
import numpy as np

def threshold(file,rstart,gstart,bstart,rend,gend,bend):
    im=Image.open(file)
    imnp=np.array(im)
    imr=imnp[:,:,0]
    if(len(imnp.shape)==3):
        imr=np.where(np.logical_and(imnp[:,:,0]>=rstart,imnp[:,:,0]<=rend),1,0)
        img=np.where(np.logical_and(imnp[:,:,1]>=gstart, imnp[:,:,1] <=gend),1,0)
        imb=np.where(np.logical_and(imnp[:,:,2]>=bstart, imnp[:,:,2] <=bend),1,0)
        imth=255*imr*img*imb
    else:
        imth=imnp
    return Image.fromarray(np.uint8(imth), 'L')
