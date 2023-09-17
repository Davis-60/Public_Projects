import tkinter as tk
from tkinter import scrolledtext

#importing my recursive scrape module
import RecursiveScrape


#This button function will run my test
def button_click():
    label.config(text="Working on it......")
    #Makes sure that the text updates before the scrape is run
    root.update_idletasks() 

    #get the values from the textboxes
    RecursiveScrape.recursiveScrape(urlEntry.get(), keyWordEntry.get(), 0 ,RecursiveScrape.visitedURL)
    # Insert the new results
    text_widget.insert(tk.END, RecursiveScrape.giveReportString())

    label.config(text="All done!")

#Root window and top label
root = tk.Tk()
root.title("Wiki Scraper")
root.configure(background= "gray")

label = tk.Label(root, text="Wikipedia Recursive Scraper", font=("Times New Roman", 30))
label.pack(pady= 10)

#EntryBoxes for URL and keyWord
urlEntry = tk.Entry(root, font=("Times New Roman", 18))
urlEntry.insert(0, "Enter URL")
urlEntry.pack(pady=5)

keyWordEntry = tk.Entry(root,font= ("Times New Roman", 18))
keyWordEntry.insert(0, "Enter Keyword")
keyWordEntry.pack(pady=5)


button = tk.Button(root, text="Run Scrape", font= ("Times New Roman", 14), command=button_click)
button.pack(pady= 20)


# Text widget for my output
text_widget = scrolledtext.ScrolledText(root, wrap=tk.WORD, font = ("Times New Roman", 14))
text_widget.pack(fill=tk.BOTH, expand=True)

root.mainloop()