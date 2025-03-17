import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

# Base URL for the website
BASE_URL = "https://sjcetpalai.ac.in/"

# Set to keep track of visited URLs to avoid duplicates
visited_urls = set()

def scrape_page(url):
    """Scrape content from a single page."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch {url}: {e}")
        return None

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract text content
    page_text = []
    for tag in soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
        content = tag.get_text(strip=True)
        if content:
            page_text.append(content)

    # Extract and follow links
    links = []
    for a_tag in soup.find_all('a', href=True):
        link = urljoin(url, a_tag['href'])
        if BASE_URL in link and link not in visited_urls:
            links.append(link)
            visited_urls.add(link)

    # Save content to a text file
    save_content(url, page_text)
    
    return links

def save_content(url, content):
    """Save scraped content to a file."""
    filename = "sjcet_scraped_content.txt"
    with open(filename, "a", encoding="utf-8") as file:
        file.write(f"\n\nURL: {url}\n")
        file.write("\n".join(content))
        file.write("\n" + "="*80 + "\n")

def crawl_website(url):
    """Crawl the website recursively to scrape content from all linked pages."""
    urls_to_visit = [url]

    while urls_to_visit:
        current_url = urls_to_visit.pop(0)
        if current_url in visited_urls:
            continue
        
        print(f"Scraping: {current_url}")
        visited_urls.add(current_url)

        links = scrape_page(current_url)
        if links:
            urls_to_visit.extend(links)

        # Add a short delay to avoid overwhelming the server
        time.sleep(1)

# Start scraping
if __name__ == "__main__":
    crawl_website(BASE_URL)
    print(f"\n✅ Scraping complete! Data saved in 'sjcet_scraped_content.txt'.")
