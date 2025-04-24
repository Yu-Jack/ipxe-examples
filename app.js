const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 6665;


// Helper function to process template
function processTemplate(templatePath, version, ip) {
    const template = fs.readFileSync(templatePath, 'utf8');
    return template
        .replace(/\${ip}/g, ip)
        .replace(/\${port}/g, port)
        .replace(/\${version}/g, version);
}

// Dynamic ipxe-create endpoint
app.get('/ipxe-create', (req, res) => {
    const version = req.query.version;
    const ip = req.query.ip;
    
    if (!version || !ip) {
        return res.status(400).send('Both version and ip parameters are required');
    }

    const templatePath = path.join(__dirname, 'general', 'ipxe-create');
    const ipxeScript = processTemplate(templatePath, version, ip);

    res.set('Content-Type', 'text/plain');
    res.send(ipxeScript);
});

// Dynamic ipxe-join endpoint
app.get('/ipxe-join', (req, res) => {
    const version = req.query.version;
    const ip = req.query.ip;
    
    if (!version || !ip) {
        return res.status(400).send('Both version and ip parameters are required');
    }

    const templatePath = path.join(__dirname, 'general', 'ipxe-join');
    const ipxeScript = processTemplate(templatePath, version, ip);

    res.set('Content-Type', 'text/plain');
    res.send(ipxeScript);
});

// Serve static files from the general folder
app.use(express.static(path.join(__dirname, 'general')));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
