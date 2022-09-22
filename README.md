# SeekOut Scraper

<h2>How To Install</h2>
<ol>
    <li>Install and setup Database MySQL Server</li>
    <li>Install Node JS Version >= v18.9.0</li>
    <li>Install NPM Version >= 8.19.2 </li>
    <li>
        Run these commands inside root of project<br>
        <pre><code>npm install</code></pre>
        <pre><code>npm install -g npx</code></pre>
    </li>
    <li>
        Rename or copy file <strong>.env.example</strong> provide name as <strong>.env</strong>, Setup database configuration depending on your local setup<br>
        <pre><code>DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE="YOUR DATABASE NAME"
DB_USERNAME="YOUR DATABASE USERNAME"
DB_PASSWORD="YOUR DATABASE PASSWORD"</code></pre>
    </li>
    <li>
        Run this command for running database migration<br>
        <pre><code>npx sequelize-cli db:migrate</code></pre>
    </li>
</ol>

<h2>Terminal Commands</h2>
<ol>
    <li>
        Login to the dashboard of seekout with this command.
        <pre><code>node index seekout-login</code></pre>
        <p>After logged in and success, just type <b>CTRL + C<b> to stop terminal session.</b>
        <p>Video : https://www.loom.com/share/add5211fc87d4becb56fffc1366ee10a</p>
    </li>
    <li>
        Find and get your URL id projec, example *b4950535-1548-4fd4-8706-5740d2fb055e*, it would be look like this
        <pre><code>node index seekout-get b4950535-1548-4fd4-8706-5740d2fb055e 1 10</code></pre>
        <p><b>NOTES:</b></p>
        - <b>1</b> is a page number<br>
        - <b>10</b> is a size of page you want to scrape<br><br>
        Video : https://www.loom.com/share/0e93c7206476403f9e5a506f37d457dc<br><br>
    </li>
    <li>
        To export the data use this command<br>
        <pre><code>node index seekout-export</code></pre>
        Video : https://www.loom.com/share/c053e68cefe34b02807af5336c857348<br><br>
    </li>
</ol>
