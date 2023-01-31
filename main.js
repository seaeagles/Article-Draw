// https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty
// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
// beststories
// newstories


const topp = document.querySelector('#top')
const best = document.querySelector('#best')
const fresh = document.querySelector('#new')
const stories = document.querySelector('#stories')

const getElement = string => document.querySelector(`#${string}`)

topp.addEventListener('click', e => {
    const f = fetchStories('top')
    f.then(data => {
        renderIntoDomNode(templateData(data), stories)
    })
})
best.addEventListener('click', e => {
    fetchStories('best').then(data => {
        renderIntoDomNode(templateData(data), stories)
    })
})
fresh.addEventListener('click', e => {
    fetchStories('new').then(data => {
      renderIntoDomNode(templateData(data), stories)
    })
  })

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

function templateData (data) {
    console.log('new data', data)
    // loop through data
    const list = data.map(story => {
      return `
        <li class='item-id' id="${story.id}">
          <a href="${story.url}">
            ${story.title}
          </a> 
          - <span>${story.by}</span>
        </li>
        `
    }).join('')
    // create a string of HTML template string literals
    const ul = `<ul class='ids'>${list}</ul>`
    return ul
}

function renderIntoDomNode(string, parent) {
    parent.innerHTML = string
}