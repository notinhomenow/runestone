import json
import time
import serial


def parse_data(in_data: str):
    list_string = in_data.split()
    if len(list_string) != 3:
        return None, None
    humid = float(list_string[0])
    temp = float(list_string[2])
    return humid, temp


def ard_connection():
    ar_signal = ArSignal.get_instance()
    print("Start")
    port = "COM4"  # This will be different for various devices and on windows it will probably be a COM port.
    bluetooth = serial.Serial(port, 9600, timeout=1)  # Start communications with the bluetooth unit
    print("Connected")
    # bluetooth.flushInput() #This gives the bluetooth a little kick
    bluetooth.write(b"data test")
    while True:
        input_data = bluetooth.readline()  # This reads the incoming data. In this particular example it will be the "Hello from Blue" line
        data = str(input_data.decode())
        (humid, temp) = parse_data(data)
        # if humid is None or temp is None:
        #     time.sleep(1)
        #     continue
        ar_signal.set_temp(temp)
        ar_signal.set_humid(humid)
        ar_signal.get_json()
        time.sleep(1)  # A pause between bursts
    bluetooth.close()  # Otherwise the connection will remain open until a timeout which ties up the /dev/thingamabob
    print("Done")


class ArSignal:
    arSignal = None

    def __init__(self):
        self.temp = 0
        self.humid = 0

    @staticmethod
    def get_instance():
        if ArSignal.arSignal is None:
            ArSignal.arSignal = ArSignal()
        return ArSignal.arSignal

    @staticmethod
    def clear_instance():
        ArSignal.arSignal = None

    def set_temp(self, temp):
        self.temp = temp
        return self.temp

    def set_humid(self, humid):
        self.humid = humid
        return self.humid

    def get_temp(self):
        return self.temp

    def get_humid(self):
        return self.humid

    def get_json(self):
        json_data = dict()
        json_data['humid'] = self.humid
        json_data['temp'] = self.temp
        json_string = json.dumps(json_data)
        print(json_string)
        return json_string

#
# ard_connection()
#
