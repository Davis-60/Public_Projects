from collections import deque
import requests
from bs4 import BeautifulSoup

#I will need a wikiPage object to store the info for each page I visit
class wikiPage:
    def __init__(self, url, linksAway, path):
        self.url = url
        self.linksAway = linksAway
        self.path = path

#This function will create the final text once a match is found
def generateReport(urlMatch: wikiPage, targetTerm:str, soup: BeautifulSoup):
        report = "\nFound!\n" + "\nURL: "+ str(urlMatch.url) +"\nPath: " + " -> ".join(urlMatch.path) +"\nLinks Away: " + str(urlMatch.linksAway)
        # Find all text elements in the current text that contain the targetTerm
        text_elements = soup.find_all(string=lambda text: text and targetTerm in text)
        # Finding the line containing the match for the final report
        for text_element in text_elements:
            lines = text_element.split('\n')
            for line in lines:
                if targetTerm in line:
                    report += "\nLine with match:\n" + line.strip() +"\n"
        #Return the report sting so I can use it in the GUI
        return report


def qScrape(startignUrl: str, targetTerm: str):
    #I need to keep track of all visited URLs
    visitedURL = set()
    #Store the report as a string (only 1 for this scrape method)
    firstPage = wikiPage(startignUrl, 0, [startignUrl])
    #I will store the pages in a queue and add the first page to it
    pageQueue = deque()
    pageQueue.append(firstPage)

    #Continue until the queue is empty or a match is found
    while(len(pageQueue)> 0):
        currPage = pageQueue.popleft()
        # Sending an HTTP GET request to the current URL
        response = requests.get(currPage.url)
        # Checking that the request was successful (status code 200)
        if response.status_code != 200:
            print('Failed to retrieve the page, Error Code:', response.status_code)

        # Parsing the HTML content of the page with beautiful soup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Search for the target term within the text
        if targetTerm in soup.get_text():
            finalReport = generateReport(urlMatch= currPage ,targetTerm= targetTerm, soup= soup)
            print(finalReport)
            return finalReport

        # If I dont find a match, I'll add all linked articles to the back of the queue
        else:
            visitedURL.add(currPage.url)
            print("Checked: " + currPage.url)
            print("Current layer: " , currPage.linksAway)
            # Start by grabbing anchor tags (<a>)
            newLinkTags = soup.find_all('a', href=True)
            if newLinkTags:
                for tag in newLinkTags:
                    link = tag.get("href")
                    # Checking for a valid wikipedia link
                    if link and link.startswith('/wiki/'):
                        #Add all linked articles to the back of the queue
                        full_link = 'https://en.wikipedia.org' + link
                        if full_link not in visitedURL:
                            #Making my new page object for the linked page
                            newPath = currPage.path.copy()
                            newPath.append(full_link)
                            linkedPage = wikiPage(full_link, currPage.linksAway +1, newPath)
                            pageQueue.append(linkedPage)
                        else:
                            continue
    
    #If I break out of the while loop without having found a match
    print("No luck")

  

#Test
# qScrape('https://en.wikipedia.org/wiki/Michael_Scott_(The_Office)', 'trailer park')

