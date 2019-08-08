var btns = document.getElementsByTagName('button')

function showResult(){
  document.getElementById('feathers-btn').classList.add('false', 'light')
  document.getElementById('steel-btn').classList.add('true', 'heavy') 
  document.getElementById('answer').classList.add('visible') 
}

for (i=0; i<btns.length; i++) {
  btns[i].addEventListener("click", showResult)
}

console.log(btns)

function progress(){
  document.getElementById('feathers-btn').classList.remove('false', 'light')
  document.getElementById('steel-btn') .classList.remove('true', 'heavy') 
  document.getElementById('answer').classList.remove('visible') 
}

document.getElementById('progress').addEventListener("click", progress)