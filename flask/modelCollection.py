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
        image = tf.image.resize(image, (self.image_size, self.image_size))
        return tf.cast(image, tf.float32) / 255.0
    def infer(self, image=None):
        image=np.asarray(Image.open(image)).astype(np.float32)
        if len(image.shape)==2: #Gray image
            image= np.expand_dims(image,axis=-1)
            print(image.shape)
            image= np.repeat(image,3,axis=-1)

        w, h, d = image.shape
        if(d==4):
            aComponent=image[:,:,3:]
            image=image[:,:,:3]
        else:
            aComponent=255*np.ones((w,h,1))
        tensor_image = tf.convert_to_tensor(image, dtype=tf.float32)
        tensor_image = self.preprocess(tensor_image)
        shape = tensor_image.shape
        tensor_image = tf.reshape(tensor_image,[1, shape[0],shape[1], shape[2]])

        y= self.model.predict(tensor_image)[0]
        y=  tf.image.resize(y, (w, h))


        y=  np.repeat(y,4,axis=-1)
        image=np.concatenate((image,aComponent),axis=-1)
        masked_image = np.asarray(image * y,np.uint8)

        return Image.fromarray(masked_image)
