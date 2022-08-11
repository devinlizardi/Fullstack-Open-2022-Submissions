### Part 2 Phonebook Exercises

#### phonebook
- [x] 2.6
- [x] 2.7
- [x] 2.8
- [x] 2.9*
- [x] 2.10
- [x] 2.11

- [x] 2.15
- [x] 2.16
- [x] 2.17
- [ ] 2.18*

### Development Notes
#### 2.9*
Setting up the state objects wasn't too hard a challenge, but passing the filter state to the necessary component and using it to filter the array was tricky. There might be a better way to use the filter input, I was a little concerned that String#filter only creates a shallow copy, but it seems to work just fine (for now).

#### 2.11
Really enjoyed setting up a JSON-server even though it's super simple. I ran into a bunch of npm warnings that required auditing with npm but on googling seemed to be pretty normal and wouldn't impact the project at this phase (or any, really). Was satisfying to see things work!

#### 2.15
There's something extremely satisfying watching a json file update on my harddrive while only communicating with it through my browser.

#### 2.17
Felt great about this one, I knew where to add the button because my component structure was already robust enough, all I needed was to pass some props around. The one issue that tripped me up was when the user added a new person and then tried to immediately delete them, the server was returning a 404. Realized that the person objects stored in my state array didn't save the person's id from the server, so it was a quick fix and good to go.