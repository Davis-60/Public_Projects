import tkinter as tk
from tkinter import END, scrolledtext
#importing my recursive scrape module
import qScrape

# Clearing the default text when the boxes are clicked
def clear_entry(event):
    if event.widget.get() in ("Enter URL", "Enter Keyword"):
        event.widget.delete(0, tk.END)

#This button function will run my test
def button_click():
        #Checking that the boxes are with non default values
    if urlEntry.get()!= "Enter URL" and keyWordEntry.get() != "Enter Keyword":
        text_widget.delete(1.0,END)
        label.config(text="Working on it......")
        #Makes sure that the text updates before the scrape is run
        root.update_idletasks() 

        #Running my scrape and addint the returned report to the text box
        text_widget.insert(tk.END, qScrape.qScrape(urlEntry.get(), keyWordEntry.get()))
        label.config(text="All done!")


#Root window and top label
root = tk.Tk()
root.title("Queue Scraper")
root.configure(background= "gray")

label = tk.Label(root, text="Wikipedia Queue Scraper", font=("Times New Roman", 30))
label.pack(pady= 10)

#EntryBoxes for URL and keyWord
urlEntry = tk.Entry(root, font=("Times New Roman", 18))
urlEntry.insert(0, "Enter URL")
urlEntry.pack(pady=5)
urlEntry.bind("<FocusIn>", clear_entry)


keyWordEntry = tk.Entry(root,font= ("Times New Roman", 18))
keyWordEntry.insert(0, "Enter Keyword")
keyWordEntry.pack(pady=5)
keyWordEntry.bind("<FocusIn>", clear_entry)



button = tk.Button(root, text="Run Scrape", font= ("Times New Roman", 14), command=button_click)
button.pack(pady= 20)


# Text widget for my output
text_widget = scrolledtext.ScrolledText(root, wrap=tk.WORD, font = ("Times New Roman", 14))
text_widget.pack(fill=tk.BOTH, expand=True)

root.mainloop()