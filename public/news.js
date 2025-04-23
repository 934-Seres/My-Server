document.addEventListener("DOMContentLoaded", function () {
    const sources = {
      bloomberg: "https://news.google.com/rss/search?q=when:24h+allinurl:bloomberg.com&hl=en-US&gl=US&ceid=US:en",
      ft: "https://www.ft.com/?format=rss",
      reuters: "https://www.reutersagency.com/feed/?best-topics=business-finance",     
      ebr: "https://ethiopianbusinessreview.net/category/daily-news", // Replace with the generated RSS feed URL from RSS.app
      nbe:"https://www.newbusinessethiopia.com/",
      af:"https://www.addisfortune.news/",
      md:"https://www.medicaldaily.com/"      
    };
  
    Object.keys(sources).forEach(id => {
      const header = document.querySelector(`#${id} h2`);
      const container = document.querySelector(`#${id} .news-articles`);
      let loaded = false;
  
      header.addEventListener("click", () => {
        if (container.style.display === "none" || container.style.display === "") {
          container.style.display = "block";
  
          if (!loaded) {
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(sources[id])}`)
              .then(res => res.json())
              .then(data => {
                data.items.slice(0, 5).forEach(item => {
                  const article = document.createElement("article");
                  article.innerHTML = `
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.pubDate}</p>
                    <p>${item.description}</p>
                  `;
                  container.appendChild(article);
                });
                loaded = true;
              })
              .catch(err => {
                container.innerHTML = `<p style="color:red;">Failed to load news.</p>`;
                console.error(`Error loading ${id} feed:`, err);
              });
          }
        } else {
          container.style.display = "none";
        }
      });
    });
  });
  