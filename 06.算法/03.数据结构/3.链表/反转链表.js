
let linkList = {
    val: 1, 
    next: {
        val: 2, 
        next: {
            val: 3, 
            next: null
        }
    }
}

function reverseList(head) {
    let prev = null;
    let cur = head;
    while(cur) {
        let next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next
    }
    return prev
}

console.log(1111, reverseList(linkList))