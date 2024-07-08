import os
import pyperclip

files = [file for file in os.listdir("./assets/cards/") if file.endswith(".svg")]
print(files)
