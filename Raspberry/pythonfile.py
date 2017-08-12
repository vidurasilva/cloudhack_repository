import time
import picamera


#Send data to firebase DB--------------------------------------------
def sendtocloud():
    from firebase import firebase
    date = time.strftime("%d-%m-%Y-%H:%M:%S")
    firebase = firebase.FirebaseApplication('https://driverproject-4e877.firebaseio.com/', None)

    #result1 = firebase.post('/user',{'Driver2':{'smoke':'1'}})
    result2 = firebase.put('Driver4/Smoke','Date:'+date,'positive')
    setsmoke()
    

#Get data frm firebase DB--------------------------------------------
def getfromcloud():
    from firebase import firebase
    firebase = firebase.FirebaseApplication('https://driverproject-4e877.firebaseio.com/', None)
    result = firebase.get('Driver1', None)
    print (result)

#Use picamera-------------------------------------------------------
def takephoto(): 
    print("Camera ready!")
    with picamera.PiCamera() as camera:
        camera.resolution = (1280,720)
        camera.capture("/home/pi/Desktop/cookie/newimage.jpg")
    print("picture taken")

#Send data to firebase DB--------------------------------------------
def setsmoke():
    from firebase import firebase
    firebase = firebase.FirebaseApplication('https://driverproject-4e877.firebaseio.com/', None)
    result = firebase.put('Driver1/Status','Smokestatus','yes')
    takephoto()
    
    
#----------------------------------------------------------------------------

def smokesensor():
    import time, sys
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(35, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
 
    def action(pin):
        print('Sensor detected action!')
        sendtocloud() #---Send to cloud
        return
 
    GPIO.add_event_detect(35, GPIO.RISING)
    GPIO.add_event_callback(35, action)
 
    try:
        while True:
            print('Active')
            time.sleep(0.5)
    except KeyboardInterrupt:
        GPIO.cleanup()
        sys.exit()

        
def pir():
    import RPi.GPIO as GPIO
    import time

    GPIO.setmode(GPIO.BCM)

    GPIO.setup(23, GPIO.IN) #PIR
    #GPIO.setup(24, GPIO.OUT) #BUzzer

    try:
        time.sleep(2) # to stabilize sensor
        while True:
            if GPIO.input(23):
                #GPIO.output(24, True)
                #time.sleep(0.5) #Buzzer turns on for 0.5 sec
                #GPIO.output(24, False)
                print("Motion Detected...")
                time.sleep(5) #to avoid multiple detection
            time.sleep(0.1) #loop delay, should be less than detection delay

    except:
        GPIO.cleanup()


def main():

    smokesensor()
    getfromcloud()

if __name__ == "__main__":
    main()
