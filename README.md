# Campus Works Portal
Portal for campus works, upcoming E-Cell project.

Under construction. To contribute please reach out to one of the team members first.

Uses React and Django. SPA.


## Testing locally
Prerequisites: `Python` and `Node (with npm and nvm)` installed

[Using node v10.15.0 (npm v6.4.1)]

Assumption: You're using proper package management with virtual environments where necessary

1. Fork and clone the repository. For solely local testing, just cloning will do.
2. `cd` into the cloned repo and install python dependencies, and setup migrations
```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
```
3. Install npm dependencies
```
cd tfront
npm install
```
4. Open two terminals at repository root for running the server.
5. On the first, run
```
python manage.py runserver
```
to start the backend server. Direct API calls can be made to `localhost:8000`
6. On the second terminal run
```
cd tfront
npm run start
```
Navigate to `localhost:3000` to run the app.


## Contribution guideline

### Git Workflow

https://musescore.org/en/handbook/developers-handbook/finding-your-way-around/git-workflow

#### Summary

1. Fork on GitHub (click Fork button) (if you don't have master access)
2. Clone to computer, preferably use SSH URL (`git clone git@github.com:<you>/CWorks.git`)
3. Don't forget to cd into your repo: (`cd CWorks/`)
4. Set up remote upstream (`git remote add upstream git@github.com:IIIT-ECell/CWorks.git`) (for forks)
5. Create a branch for new issue (`git checkout -b 404-new-feature`)
6. Develop on issue branch. [Time passes, the main MuseScore repository accumulates new commits]
7. Commit changes to your local issue branch. (`git add . ; git commit -m 'commit message'`)
8. Fetch upstream (`git fetch upstream`) (for those with master access, fetch origin)
9. Update local master (`git checkout master; git merge upstream/master`)
10. Rebase issue branch (`git checkout 404-new-feature; git rebase master`)
11. Repeat steps 6-11 until dev is complete
12. Push branch to GitHub (`git push origin 404-new-feature`)
13. Start your browser, go to your GitHub repo, switch to "404-new-feature" branch and press the [Pull Request] button

After having made a Pull Request don't pull/merge anymore, it'll mess up the commit history. If you (have to) rebase, use 'push --force' (`git push --force`) to send it up to your GitHub repository, this will update the PR too. Be careful not to do this while the core team is working on merging in your PR.
