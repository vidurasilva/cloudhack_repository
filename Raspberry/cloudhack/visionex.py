import io
from google.cloud import vision


#Google vision API --------------------------------------- 

vision_client = vision.Client()
#file name
file_name = 'mark.jpg'


with io.open(file_name,'rb') as image_file:
	content = image_file.read()
	image = vision_client.image(content=content)

labels = image.detect_labels()

for label in labels:
	print(label.description)