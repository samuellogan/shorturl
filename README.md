This is a basic URL shortner written in Java using the Spring.js framework.

<img width="1199" alt="Screenshot 2024-03-16 at 20 37 38" src="https://github.com/samuellogan/shorturl/assets/42814104/8d9e179f-2fb0-4b18-a3e4-325cfef44103">

## Limitations
It should be noted that the project in it's current state has a couple of limitations including 
#### Finite number of URLs
As each URL consists of an 8 digit string, there are a finite number of URLs. This could be solved by allowing for larger, varying lengths of strings, at the cost of both added complexity and less concise URLs. As the purpose of this project was more a fun weekend thing, this limitation was ignored.

#### Use of memory-based database
The URLs are stored in a h2database, which stores everything within the systems memory. As such, when the program is restarted, all URLs are forgotten. To resolve this, a more robust database such as SQLite should have been used, however wasn't as a result of time constraints.

Both of these limitations will likely be addressed in the future, and I will likely look into moving the webpage to a more modern framework rather than using traditional CSS+HTML

## Notes
A unique aspect of utilizing HTTP's 301 (MOVED_PERMANENTLY) response is that browsers often cache this redirection. Consequently, when a user accesses the same shortcode again, the browser bypasses contacting the webserver until the cached redirection expires. This caching mechanism tends to track views on a per-user rather than a per-visit basis. However, this isn't entirely reliable as different browsers, private browsing sessions, cache clearing, or simply waiting for the cache to expire can lead to the same link registering as a new visit. To counteract this and ensure every visit is counted, one could implement Cache-Control: max-age=3600 or Cache-Control: no-cache, which forces the browser to refresh the cache more frequently or disregard caching altogether.

