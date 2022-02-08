import tensorflow as tf
from tensorflow.keras.utils import CustomObjectScope
from metrics import dice_loss, dice_coef, iou
from PIL import Image
import numpy as np
import os
class ModelCollection:
    def __init__(self,path):
        self.humanSeg = HumanSeg(path)

class HumanSeg:
    #source: https://github.com/nikhilroxtomar/Human-Image-Segmentation-with-DeepLabV3Plus-in-TensorFlow
    def __init__(self,path):
        self.saved_path = os.path.join(path,'models/humanSeg/model.h5')
        with CustomObjectScope({'iou': iou, 'dice_coef': dice_coef, 'dice_loss': dice_loss}):
            self.model = tf.keras.models.load_model(self.saved_path)
        self.image_size = 512

    def preprocess(self, image):
        image=np.asarray(Image.open(image)).astype(np.float32)
        if len(image.shape)==2: #Gray image
            image= np.expand_dims(image,axis=-1)
            image= np.repeat(image,3,axis=-1)
        w, h, d = image.shape
        if(d==4): #RGBA
            image=image[:,:,:3]
        tensor_image = tf.convert_to_tensor(image, dtype=tf.float32)
        tensor_image = tf.image.resize(tensor_image, (self.image_size, self.image_size))/255
        tensor_image = tf.expand_dims(tensor_image,axis=0)
        return (w,h,tensor_image,image)

    def infer(self, image=None):
        (w,h,tensor_image,image) = self.preprocess(image)
        y = self.model.predict(tensor_image)[0]
        y =  tf.image.resize(y, (w, h))
        y =  np.repeat(y,4,axis=-1)
        aComponent=255*np.ones((w,h,1))
        image=np.concatenate((image,aComponent),axis=-1)
        masked_image = np.asarray(image * y,np.uint8)
        return Image.fromarray(masked_image)
