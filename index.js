//GRAPHICS PART 331 LINES---------------------------------------------------------------------------------


const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
var H = window.innerHeight
var W = H
canvas.width = H
canvas.height = H
var OFFSET_X = canvas.getBoundingClientRect().x
var RADIUS = H / 40
var count = 1
var RENUMBERING = false

window.addEventListener('resize',()=>{
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = H
    canvas.height = H
    RADIUS = H/40
    OFFSET_X = canvas.getBoundingClientRect().x
    c.clearRect(0,0,W,H)
    drawTree()
})


class Node{
    constructor(x,y,val){
        this.left = null
        this.right = null
        this.x = x
        this.y = y
        this.val = val
        this.parent = null
    }

    maxDetpth(){
        if(this.left == null && this.right == null)
           return 1
        if (this.left == null)
            return 1 + this.right.maxDetpth()
        else if(this.right == null)
            return 1 + this.left.maxDetpth()
        else
            return 1  + Math.max(this.left.maxDetpth(), this.right.maxDetpth())    


    }
    
    setRight(n){
        this.right = n
        n.parent = this
    }

    setLeft(n){
        this.left = n
        n.parent = this
    }


    draw(){
        c.beginPath()
        c.fillStyle = "yellow"
        c.arc(this.x, this.y, RADIUS, 0, Math.PI * 2)
        c.fill()
        c.closePath()
        const fz = RADIUS * 3 / 4
        c.font = fz.toString() + "px Aerial"
        c.fillStyle = "red"
        c.textAlign = "center";
        c.fillText(this.val.toString(), this.x, this.y + fz/3)
    }

    isHorizontalClash(anotherNode){
        const s1 = this.x - RADIUS
        const s2 = this.x + RADIUS
        const k1 = anotherNode.x - RADIUS 
        const k2 = anotherNode.x + RADIUS
        
        return s1 > k1 && s1 < k2 || s2 > k1 && s2 < k2 || s1 == k1 || s2 == k2
    }

    commonAncestor(b){
        const a = this
        let ap = a.parent
        let bp = b.parent
        while(ap != bp){
            ap = ap.parent
            bp = bp.parent
        }
        return ap
    }

    moveLst(amount){
        if(this.left == null)
            return
        const q = [this.left] 
        while(q.length > 0){
            const p = q.pop()
            p.x += amount
            if(p.left != null)
                q.push(p.left)
            if(p.right != null)
                q.push(p.right)    
        }
    }

    moveRst(amount){
        if(this.right == null)
            return
        const q = [this.right] 
        while(q.length > 0){
            const p = q.pop()
            p.x += amount
            if(p.left != null)
                q.push(p.left)
            if(p.right != null)
                q.push(p.right)    
        }
    }

    toString(){
        return this.val
    }

    moveSubtree(dir){
        switch (dir) {
            case 'up':
                this.y -= 10
                break;
            case 'down':
                this.y += 10
                break
            case 'left':
                this.x -=10
                break
            case 'right':
                this.x += 10
                break           
        }
        if(this.left != null)
        this.left.moveSubtree(dir)
        if(this.right != null)
        this.right.moveSubtree(dir)
    }


}

var root = new Node(W/2, H*10/100, 1)
root.draw()



function drawTree(){  
    treePositioningForDrawing()
    let s = [root]
    while(s.length > 0){
        const p = s.pop()
        p.draw()
        if(p.left != null){
            c.beginPath();
            c.moveTo(p.x, p.y+ RADIUS);
            c.lineTo(p.left.x, p.left.y - RADIUS);
            c.stroke(); 

            s.push(p.left)
        }
        if(p.right != null){
            c.beginPath();
            c.moveTo(p.x, p.y+ RADIUS);
            c.lineTo(p.right.x, p.right.y - RADIUS);
            c.stroke(); 

            s.push(p.right) 
        }   
    }
}



canvas.addEventListener("click", ({clientX,clientY, button})=>{
    let clicked = null
    clientX = clientX - OFFSET_X
    const s = [root]
    while(s.length > 0){
        const l = s.length
        let b = false
        for (let i = 0; i < l; i++) {
            const curr = s.shift()
            if (curr.x - RADIUS < clientX && clientX < curr.x + RADIUS && clientY > curr.y - RADIUS && clientY < curr.y + RADIUS ){
                clicked = curr
                b = true
                break
            }
            if(curr.left != null)
                s.push(curr.left)
            if(curr.right != null)
                s.push(curr.right)    
        }
        if(b)
            break
    }
    if(clicked == null)
        return

    if(RENUMBERING){
        clicked.val = ++count
        c.clearRect(0,0,W,H)
        drawTree()
        return
    }    


    if(clicked.left != null && clicked.right != null)
        return 
    
    
    if(clicked.right == null && clicked.left == null)
        clicked.setLeft(new Node(clicked.x, clicked.y, ++count))
    else if(clicked.right == null){
        clicked.setRight(new Node(clicked.x, clicked.y, ++count))
    }
    
    c.clearRect(0,0, canvas.width, canvas.height)
    drawTree()
    })


function treePositioningForDrawing(){ 

    function ithColumn(i){
        let q = [root]
        let x = i
        while(x > 0){
            x-=1;
            let l = q.length
            for(let _i = 0; _i < l; _i+=1 ){
                const p = q.shift()
                if(p.left != null)
                    q.push(p.left)
                if(p.right != null)
                    q.push(p.right)    
            }
        }
        return q;
    }
    function horizontalAlign(i){
        const ithColum = ithColumn(i)
        for(let i =1; i < ithColum.length; i++){
            const curr = ithColum[i]
            const prev = ithColum[i-1]
            if(curr.isHorizontalClash(prev)){
                const CA = prev.commonAncestor(curr)
                CA.moveLst(-RADIUS * 3/2)
                CA.moveRst(RADIUS * 3/2)
                return
            }
        }
    }
    let d = root.maxDetpth()
    function vericalAlign(){
        s = [root]
        while (s.length > 0 ){
            const p = s.shift()
            if(p.left != null){
                p.left.y = p.y + 2.5 * RADIUS
                s.push(p.left)
            }
            if(p.right != null){
                p.right.y = p.y + 2.5 * RADIUS
                s.push(p.right)
            }
        }
    }
    vericalAlign()
    while(d > -1){
        d-=1
        for(let i = 0; i < 20; i += 1)
            horizontalAlign(d+1)
    }    
}






document.addEventListener('keydown', ({key})=>{
    switch (key) {
        case 'ArrowUp':
            root.moveSubtree('up')
            break;
        case 'ArrowDown':
            root.moveSubtree('down')
            break;  
        case 'ArrowLeft':
            root.moveSubtree('left')
            break;
        case 'ArrowRight':
            root.moveSubtree('right')
            break;      

    
    }
    c.clearRect(0,0,W,H)
    drawTree()
})




document.addEventListener('wheel', (e)=>{
    e.preventDefault()
    console.log(e.wheelDelta)
    console.log(e)
    if(e.wheelDelta <0){
        iterTree(n=>{
            if(n.left != null && n.right != null){
            n.moveLst(RADIUS)
            n.moveRst(-RADIUS)
            }   
        })
        RADIUS -= RADIUS / 10
    }
    else
    RADIUS += RADIUS / 10
    
    c.clearRect(0,0,W,H)
    drawTree()
            
})

function iterTree(f){
    s = [root]
    while(s.length > 0){
        const p = s.pop()
        f(p)
        if(p.left)
            s.push(p.left)
        if(p.right)
            s.push(p.right)    
    }
}


//LOGICS PART-------------------------------------------------------------------------------------
let rightSide = document.querySelector('#rightSide')
const renumberButton = document.querySelector('#renumButton')

//reseting-----------------------------------------------
const resetButton = document.querySelector('#resetButton')
resetButton.addEventListener('click', ()=>{
    if(RENUMBERING)
        return 
    root.left = null
    root.right = null
    count = 1
    root.val = 1
    rightSide.remove()
    c.clearRect(0,0,W,H)
    drawTree()
})

//calculating-------------------------------------------------
let pebblesTook = 1

function calculate(n, p){
    pebblesTook = Math.max(pebblesTook, p)
    if(n.left == null && n.right == null){
        return "set" + "(" + p+','+n.val.toString()+ ")"
    }
    if(n.right == null){
        let tmp = calculate(n.left,p)
        return tmp + '\n' + 'slide(' +p+','+ n.left.val+',' +n.val+')'
    }

    if(n.right.maxDetpth() > n.left.maxDetpth()){
        let r = calculate(n.right,p)
        let l = calculate(n.left,p+1)
        return r +'\n' + l + '\n' + 'slide('+p+','+n.left.val+',' + n.val+')' + '\n' + 'remove('+(p+1)+',' + n.right.val+')'
    }
    let l = calculate(n.left, p)
    let r = calculate(n.right,p+1)
    return l +'\n' + r + '\n' + 'slide('+p + ','+n.left.val+',' + n.val+')' + '\n' + 'remove('+(p+1)+','+n.right.val+')'
}
const main = document.querySelector('#main')
const calcButton = document.querySelector('#calcButton')
calcButton.addEventListener('click', ()=>{
    if(RENUMBERING){
        return
    }
    rightSide.remove()
    rightSide = document.createElement('div')
    rightSide.id = 'rightSide'
    main.append(rightSide)
    
    console.log(calculate(root, 1))
    const ans = calculate(root, 1)
    const split = ans.split('\n')
    for(s of split){
        rightSide.append(s)
        rightSide.append(document.createElement('br'))
    }
    rightSide.append('Pebbles Took: ' + pebblesTook)
    pebblesTook = 1
    
})

const p = document.querySelector('#renumberP')

renumberButton.addEventListener('click', ()=>{
    if(!RENUMBERING){
        count = 0
        RENUMBERING = true
        renumberButton.innerHTML = "Done"
        p.style.display = 'block'

    }else{
        RENUMBERING = false
        renumberButton.innerHTML = "Renumber"
        p.style.display = 'none'
    }
})













