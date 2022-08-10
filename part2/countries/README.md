### Part 2 Countries Exercises

#### countries
- [x] 2.12*
- [x] 2.13*
- [ ] 2.14*

### Development Notes
#### 2.12*
This challenge was especially useful on my ability to parse simple object data from an external API. I used Object#values to treat the languages object like an array, and I"m realizing I don't have many tricks to solve this problem with confidence. Going to work on the extra challenges to get more practice working with JSON objects.

#### 2.13*
I started this question with a bit of a misunderstanding, I thought that each "show" button would render the country display alongside the names of each country matching the given search term. This proved to be a much more involved task, where I created a state object in a child-component and realized I'd have to refactor significantly in order to maintain this approach. I then reread the question and realized by manually updating the filter to match the name it would take the user to that country's view.

It would be a good challenge to refactor and deconstruct the Array#map process so I can properly maintain state, but I feel it'd be a better use of my time to move on with the questions and find this practice elsewhere.