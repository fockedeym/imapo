# imapo
An angular website with flask API for image processing operations.


# Tech Stack
This project contains multiple technologies, using an **nginx** server the frontend returned was developped in **angular** and the api request made by the frontend are routed to a **wsgi/flask** server (in **python**) via a socket. The all application was integrated inside a **docker** image to make it easy to deploy. The image processing backend uses python libraries as **tensorflox**, **opencv** and **pillow**.

## Image processing operations
- Basic operations of image croping and resizing
- Extraction of xmp and exif metadata
- JPEG compression analysis, with error level analysis and compression quantization tables and sampling extraction
- Contrast enhancement via histogram stretching and equalization or bright level modification
- Multi-domain analysis of the image in the RGB, YUV and HSV domains
- Filtering/convolution with custom or standard kernels
- AI image processing, for the moment it only contains a CNN for human segmentations in photos

## Deployement
You can easily test this application if you have docker, you just have to:
- 1) Download the image here [here](https://drive.google.com/file/d/1IdPFGx0QeCUP2MhCmDfbvaIaGDkZzILa/view?usp=sharing)
- 2) Load the image in docker:
  ```console
  foo@bar:~$ docker load imapo.tar
  ```
- 3) Run it and link one of your port to the port 80 of the container:
  ```console
  foo@bar:~$ sudo docker run --rm -it -p <YOURPORT>:80 imapo
  ```
 - 4) Connect to the site in your browser via localhost:\<YOURPORT\>

 ## Project layout
 ![](README_assets/layout_example.png)
