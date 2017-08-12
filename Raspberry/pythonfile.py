import time, sys
import RPi.GPIO as GPIO
from firebase import firebase

#MQ-3 sensor detection-------------------------------------------------------------

GPIO.setmode(GPIO.BOARD)
GPIO.setup(35, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)


def action(pin):
    print('Sensor detected action!')
    return


GPIO.add_event_detect(35, GPIO.RISING)
GPIO.add_event_callback(35, action)

try:
    while True:
        print('alive')
        time.sleep(0.5)
except KeyboardInterrupt:
    GPIO.cleanup()
    sys.exit()
	
#Send data to firebase DB--------------------------------------------------------------------------------------------
def sendtocloud():

    date = time.strftime("%d-%m-%Y-%H:%M:%S")
    firebase = firebase.FirebaseApplication('https://driverproject-4e877.firebaseio.com/', None)

    #result1 = firebase.post('/user',{'Driver2':{'smoke':'1'}})
    result2 = firebase.put('Driver4/Smoke','Date:'+date,'positive')


#get frm firebase-----------------------------------------------------------------------------------------------------
def getfromcloud():

    firebase = firebase.FirebaseApplication('https://driverproject-4e877.firebaseio.com/', None)
    result = firebase.get('Driver1', None)
    print (result)
