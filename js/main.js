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
    background: rgb(222,222,222);
    font-size: 16px;
}

#code {
    font-family: Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif; 
    border: 1px solid grey;
    padding: 16px;
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

#code {
    transform: rotate(360deg);
}

/* 
 * 不整那些花里胡哨的 

 * 我来介绍一下我自己

 * 首先需要一张白纸
*/

#code {
  position: fixed;
  left: 0;
  width: 50%;
  height: 100%;
}
`

var resultAdd = `
#paper {
  position: fixed;
  right: 0;
  width: 50%;
  height: 100%;
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
}

/* 接下来把 Markdown 变成 HTML */

/* 接下来给 HTML 加样式 */
`

var md = `


## 自我介绍

我叫盛光晟

1995年2月18日 出生
东华大学 毕业
自学前端 半年
希望应聘前端岗位

## 技能介绍

熟悉原生JS、CSS、Vue、Node.JS、AJAX

## 项目介绍

1、 无缝苹果轮播
2、 太阳光画板
3、 在线多模块简历

## 自我介绍

E-Mail: singlesaul@163.com;
        singlesaulwork@gmail.com
Mobile: 17621908460
Wechat: 17621908460

`

writeCode('', result, () => {
  createPaper(() => {
    writeCode(result, resultAdd, () => {
      writeMarkdown(md)
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
  }, 10)
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

function writeMarkdown(markdown) {
  let domContent = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domContent.innerHTML = markdown.substring(0, n)
    domContent.scrollTop = domContent.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
    }
  }, 10)
}