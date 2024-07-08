import os
import pyperclip


def get_file_array():
    files = [file for file in os.listdir("./assets/cards/") if file.endswith(".svg")]
    print(files)


def make_value_dict():
    arr = get_file_array()
