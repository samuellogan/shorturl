This is a basic URL shortner written in Java using the Spring.js framework.

## Limitations
It should be noted that the project in it's current state has a couple of limitations including 
#### Finite number of URLs
As each URL consists of an 8 digit string, there are a finite number of URLs. This could be solved by allowing for larger, varying lengths of strings, at the cost of both added complexity and less concise URLs. As the purpose of this project was more a fun weekend thing, this limitation was ignored.

#### Use of memory-based database
The URLs are stored in a h2database, which stores everything within the systems memory. As such, when the program is restarted, all URLs are forgotten. To resolve this, a more robust database such as SQLite should have been used, however wasn't as a result of time constraints.
