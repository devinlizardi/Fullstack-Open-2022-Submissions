# Blog List Development Process
Completed all exercises up to 4.5

*Note:* Skipped 4.6 & 4.7, all exercises otherwise are complete.

I want to learn Lodash because it seems extremely useful for iterating over arrays and objects, something that can be so confusing and slow in Javascript. Going to go back to these questions once I've completed the rest of this part, just want to focus on the testing material at the moment.

## Part 4.b
Establishing work for each exercise
- [x] Refactor backend to async/await
- [x] Refactor backend tests to async/await
- [x] 4.8: Test GET request, verify `n` blog posts
- [x] 4.9*: Test _id_, use Jest's `toBeDefined` and restructure backend to pass
- [x] 4.10: Test POST request, `n + 1` blog posts, content of new post is saved to db
- [x] 4.11*: Test if _likes_ is missing default is 0
- [x] 4.12*: Test new blogs verifies _title_ and _url_ properties are present, if missing response should be _400 Bad Request_

Update and delete features
- [x] 4.13: Deleting a blog / testing deletion
- [x] 4.14: Update information of a blog / testing updating likes

## Part 4.d
Establishing work for final exercises in this part
- [x] 4.15: POST route for creating users
- [ ] 4.16*: Username and password format restrictions / tests
- [x] 4.17: Each blog contains info on the creator of that blog using `populate`
- [x] 4.18: Token-based auth
- [x] 4.19: Adding new blogs is only possible if token is valid
- [x] 4.20*: Refactor taking the token to a middleware
- [ ] 4.21*: Blogs can only be deleted by the user who created it
- [ ] 4.22*: Create `userExtractor` middleware like `tokenExtractor`
- [ ] 4.23*: Update tests for adding a new blog and unauthorized POST requests 

## Part 4 Final Thoughts
I enjoyed learning backend testing and development more than I thought, but for the sake of keeping up progress and spending my time pursuing a career in this field I've decided to leave the untouched questions untouched. I'm also more interested in front-end development anyways, so I'm thinking of putting my energy there when I start it.

Also want to make sure this project is in good shape as I am already using it for reference when it comes to personal projects I'm not starting, so I appreciate how this course has inspired me already.