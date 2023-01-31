// https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
// beststories
// newstories


const topp = document.querySelector('#top')
const best = document.querySelector('#best')
const fresh = document.querySelector('#new')
const stories = document.querySelector('#stories')

console.log('top', topp)
topp.addEventListener('click', e => fetchStories('topstories'))
best.addEventListener('click', e => fetchStories('beststories'))
fresh.addEventListener('click', e => fetchStories('newstories'))

async function fetchStories (path) {
    const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/${path}stories.json?print=pretty`
        )
    const data = await response.json()
    const promisesArray = await data.slice(0, 15).map(id => fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        ).then(resp => resp.json()))

    const storiesArray = await Promise.all(promisesArray)
    console.log('stories', stories)
    return storiesArray
}

function renderToDOM (data) {
    // loop through data
    // create a string of HTML template string literals
    // stories.innerHTML = template string
}