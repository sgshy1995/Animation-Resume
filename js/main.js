var result = `
/*
 * 您好，我是盛光晟
 * 我将以动画的形式来介绍我自己

 * 只用文字太枯燥无味
 * 我就用代码吧

 * 首先准备一些样式
*/

* {
    transition: all 1s;
}

html {
    background: #e8e8ef;
    font-size: 14px;
}

/* 调整一下字体 */

#code {
    font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif; 
    border: 1px solid grey;
    padding: 16px;
    margin-top: 20px;
}

/* 我需要一些代码高亮 */

.token.comment {
    color: slategray;
}
.token.selector {
    color: #690;
}
.token.punctuation {
    color: #999;
}
.token.property {
    color: #905;
}
.token.function, .token.class-name {
    color: #DD4A68;
}

/* 来一点3D效果 */

html{
  perspective: 1000px;
}
#code {
  position: fixed; 
  left: 0; 
  top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}


/* 不整那些花里胡哨的 */  

#code {
  position: fixed;
  left: 0;
  width: 50%;
}

/* 首先来一张白纸准备写点东西 */
`

var resultAdd = `
#paper {
  position: fixed;
  right: 0;
  width: 50%;
  height: 100vh;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

#paper .content {
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* 我来介绍一下我自己 */
`

var md = `


## 盛光晟
----------

1995年2月出生，毕业于东华大学
目前自学前端半年，希望应聘前端岗位

## 技能介绍
----------

熟悉原生JS、CSS、Vue、Node.JS、AJAX

## 我的链接
----------

* ***Github***： https://github.com/sgshy1995
* ***博客***： https://segmentfault.com/u/nanwuliuxing/articles
* ***个人网站***： http://106.14.255.91/

## 联系方式
----------

#### E-Mail: 
singlesaul@163.com;
singlesaulwork@gmail.com

#### Mobile/Wechat: 
17621908460

### 如果喜欢我的项目，希望联系或关注我
`

var resultAdd1 = `
#paper .content{
  color: #3f3d41;
}

/* 噢，这是MarkDown格式，让我们来渲染成 HTML (By Marked.js) */
`

var resultAdd2 = `
/* 美化一下 HTML 吧 */

#paper .content h2{
  color: #262821;
}

#paper .content h3{
  color: #ddd;
  background: grey;
  text-align: center;
  padding: 5px;
  width: 80%;
  margin: 0 auto;
  border-radius: 5px;
  transform: scale(1.1);
}

#paper .content a{
  text-decoration: none;
  color: orchid;
}

#paper .content ul li{
  list-style: circle;
  margin-left: 20px;
}

/* Y(^o^)Y好了，如果你对我的项目感兴趣，一定要Call我哦！ */
`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, resultAdd, () => {
      writeMarkdown(md, () => {
        writeCode(result + resultAdd, resultAdd1, () => {
          makeToHTML(() => {
            writeCode(result+resultAdd+resultAdd1,resultAdd2)
          })
        })
      })
    })
  })
})

function writeCode(preCode, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(preCode + code.substring(0, n), Prism.languages.css, 'css')
    styleTag.innerHTML = preCode + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}

function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}

function writeMarkdown(markdown,fn) {
  let domContent = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domContent.innerHTML = markdown.substring(0, n)
    domContent.scrollTop = domContent.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn.call()
    }
  }, 50)
}

function makeToHTML(fn) {
  var preMDHTML = document.getElementsByClassName('content')
  var preMD = preMDHTML[0].innerHTML
  let domContent = document.querySelector('#paper>.content')
  domContent.innerHTML = marked(preMD)
  domContent.scrollTop = domContent.scrollHeight
  fn.call()
}