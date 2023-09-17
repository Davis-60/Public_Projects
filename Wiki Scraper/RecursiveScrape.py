import requests
from bs4 import BeautifulSoup

maxLayers = 1

visitedURL = set()

#By storing my report in a dictionary I can organize it by the number of layers down a URL is
reports = {}



def recursiveScrape(url: str, targetTerm: str, layers: int, visitedURL):
    # Sending an HTTP GET request to the current URL
    response = requests.get(url)

    # Outer if/else checks that the request was successful (status code 200)
    if response.status_code == 200:
        # Parsing the HTML content of the page
        soup = BeautifulSoup(response.text, 'html.parser')

        # Here, we are searching for a term within the text of the page
        if targetTerm in soup.get_text():
            print("\nURL: ", url)
            print("Layer:", layers)
            print("Found:", targetTerm +"\n")
            visitedURL.add(url)
            currReport = "\nURL: "+ str(url)

            # Find all text elements in the current text that contain the targetTerm
            text_elements = soup.find_all(text=lambda text: text and targetTerm in text)

            # Finding the line containing the match for the final report
            for text_element in text_elements:
                lines = text_element.split('\n')
                for line in lines:
                    if targetTerm in line:
                        # Print the line containing the match and add it to the report
                        print("Line with match:")
                        print(line.strip()) 
                        print("\n")

                        currReport += "\nLine with match:\n" + line.strip() +"\n"

            reports[layers] =  reports.get(layers,"") + currReport
            return

        # If no match is found, recursively search the links in the current article
        else:
            visitedURL.add(url)
            print("Checked: " + url)
            print("Current layer: " , layers)
            # Start by grabbing anchor tags (<a>)
            newLinkTags = soup.find_all('a', href=True)
            if newLinkTags:
                for tag in newLinkTags:
                    link = tag.get("href")
                    # Checking for a valid wikipedia link
                    if link and link.startswith('/wiki/'):
                        # Recursion!!!!
                        full_link = 'https://en.wikipedia.org' + link
                        if layers < maxLayers  and full_link not in visitedURL:
                            recursiveScrape(full_link, targetTerm, layers +1, visitedURL)
                        else:
                            continue
            else:
                print("End of the line :(")

    # Catch for if the request fails
    else:
        print('Failed to retrieve the page :( ---- Error Code:', response.status_code)


#Printing the final Report
def giveReport():
    print("\nFinal Report\n")
    for layer,report in reports.items():
        print("Layer : ", layer)
        print(reports[layer])
        print("\n")

def giveReportString():
    report = ""
    report +="\nFinal Report\n"
    for layer in reports.keys():
        report +="Layer : " + str(layer)
        report += reports[layer]
        report +="\n" 
    return report



# Test Run
#recursiveScrape('https://en.wikipedia.org/wiki/Michael_Scott_(The_Office)', ' death ', 0, visitedURL)
#GiveReport()


