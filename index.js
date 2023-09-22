import ical from 'ical-generator';
import http from 'node:http';
import url from 'url';
const port = 3000;

http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const { start, end, summary, description, location, url: eventUrl, name, uid } = queryObject;

    const calendar = ical({ name: name || 'Spectrum' });
    const startTime = new Date(start);
    const endTime = new Date(end);

    calendar.createEvent({
        start: startTime, //YYYY-MM-DDTHH:MM:SS+00:00
        end: endTime, //YYYY-MM-DDTHH:MM:SS+00:00
        summary: summary,
        description: description,
        location: location,
        url: eventUrl,
        uid: uid
    });

    calendar.serve(res);
})
    .listen(port, 'localhost', () => {
        console.log(`Server running at http://localhost:${port}/`);
    });