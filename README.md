# SeekOut Scraper

<h2>How To Install This SeekOut Scraping Tool</h2>
<ol>
	<li>Install and setup Database MySQL Server</li>
	<li>Install Node JS Version >= v18.9.0</li>
	<li>Install NPM Version >= 8.19.2 </li>
	<li>
		Run these commands inside root of project<br>
		<pre><code>npm install</code></pre>
		<pre><code>npm install -g npx</code></pre>
	</li>
	<li>Go to folder <b>config</b></li>
	<li>
		Rename or copy file <strong>config.json.example</strong> provide name as <strong>config.json</strong>, Setup and adjust database configuration depending on your local setup<br>
<pre><code>{
    "development": {
        "username": "xyind",
        "password": "xyind12345",
        "database": "node",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "xyind",
        "password": "xyind12345",
        "database": "node",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "xyind",
        "password": "xyind12345",
        "database": "node",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
</code></pre>
	</li>
	<li>
		Rename or copy file <strong>.env.example</strong> provide name as <strong>.env</strong>
	</li>
</ol>
